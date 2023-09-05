from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://ilyanosovsky:1235846Qq@localhost:5432/flask-db'
app.config['JWT_SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(128), nullable=False)
    organization_id = db.Column(db.Integer, db.ForeignKey('organization.id'), nullable=True)

# Define the Organization model
class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    users = db.relationship('User', backref='organization', lazy=True)


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print("data signUp ----> ", data)
    hashed_password = generate_password_hash(data['password'], method='sha256')
    new_user = User(email=data['email'], password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User created!"}), 201

@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    return response

@app.route('/signin', methods=['POST'])
def signin():
    data = request.get_json()
    print("data signIn ----> ", data)
    user = User.query.filter_by(email=data['email']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"message": "Invalid credentials!"}), 401
    access_token = create_access_token(identity=user.email)
    return jsonify({"access_token": access_token})

# Route to create organizations (requires authentication)
@app.route('/organizations', methods=['POST'])
# @jwt_required  # Requires the user to be authenticated
def create_organization():
    data = request.get_json()
    new_organization = Organization(name=data['name'])
    db.session.add(new_organization)
    db.session.commit()
    return jsonify({"message": "Organization created!"}), 201

# Route to add a user to an organization (requires authentication)
@app.route('/organizations/<org_id>/add_user', methods=['POST'])
# @jwt_required  # Requires the user to be authenticated
def add_user_to_organization(org_id):
    data = request.get_json()
    print(f"to add --> org_id: {org_id}, data: {data}") 
    user = User.query.filter_by(email=data['email']).first()
    organization = Organization.query.get(org_id)
    if user and organization:
        user.organization = organization
        db.session.commit()
        return jsonify({"message": "User added to organization!"}), 200
    return jsonify({"message": "User or organization not found!"}), 404

# Route to remove a user from an organization (requires authentication)
@app.route('/organizations/<org_id>/remove_user', methods=['POST'])
# @jwt_required  # Requires the user to be authenticated
def remove_user_from_organization(org_id):
    data = request.get_json()
    print(f"to remove --> org_id: {org_id}, data: {data}") 
    user = User.query.filter_by(email=data['email']).first()
    if user and user.organization_id == int(org_id):
        user.organization = None
        db.session.commit()
        return jsonify({"message": "User removed from organization properly!"}), 200
    return jsonify({"message": "User not found or not in the organization!"}), 404

# Route to list all organizations along with users
@app.route('/organizations', methods=['GET'])
# @jwt_required  # Requires the user to be authenticated
def get_organizations():
    organizations = Organization.query.all()
    organizations_with_users = [
        {
            "id": org.id,
            "name": org.name,
            "users": [{"id": user.id, "email": user.email} for user in org.users]
        }
        for org in organizations
    ]
    return jsonify({"organizations": organizations_with_users})

# Route to get specific organization details along with users
@app.route('/organizations/<org_id>', methods=['GET'])
# @jwt_required  # Requires the user to be authenticate
def get_organization(org_id):
    organization = Organization.query.get(org_id)
    if organization:
        organization_details = {
            "id": organization.id,
            "name": organization.name,
            "users": [{"id": user.id, "email": user.email} for user in organization.users]
        }
        return jsonify({"organization": organization_details})
    return jsonify({"message": "Organization not found!"}), 404


# All users
@app.route('/users', methods=['GET'])
# @jwt_required  # Requires the user to be authenticated
def get_users():
    try:
        print("Fetching users...")
        users = User.query.all()
        user_list = [{'id': user.id, 'email': user.email} for user in users]
        print("Fetched users:", users)
        return jsonify({"users": user_list}), 200
    
    except Exception as e:
        return jsonify({"message": "An error occurred"}), 500
    
# Route to get users who are not in any organization
@app.route('/users/not_in_organization', methods=['GET'])
# @jwt_required  # Requires the user to be authenticated
def get_users_not_in_organization():
    users = User.query.filter_by(organization_id=None).all()
    user_list = [{'id': user.id, 'email': user.email} for user in users]
    return jsonify({"users_not_in_organization": user_list})

@app.route('/users/<id>')
def get_user(id):
    user = User.query.filter_by(id=id).one()
    return {"user": user}

@app.route('/users/<id>', methods = ['DELETE'])
def delete_user(id):
    user = User.query.filter_by(id=id).one()
    db.session.delete(user)
    db.session.commit()
    return f'User (id: {id}) deleted!'

if __name__ == '__main__':
    app.run(port=8000, debug=True)