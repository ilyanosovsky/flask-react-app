# Full Stack Developer Assignment

A full-stack web application built with Flask and React for managing organizations and users. This project includes user registration, organization management, and user assignments to organizations.

The app's technology stack comprises:
- Frontend: React and Material UI
- Backend: Flask
- Database: PostgreSQL
- Authentication System: JWT-based

## Table of Contents

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)
- [Backend and API](#backend-and-api)
- [Frontend](#frontend)
- [Authentication](#authentication)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)


## Overview

Flask-React-App is a web application designed to simplify organization and user management. It provides features such as user registration, organization creation, user assignments to organizations, and more. The project uses a Flask backend to handle API requests and a React frontend for the user interface.

![desk-dark](img/desk-dark.png)
![desk-light](img/desk-light.png)

![mob-light](img/mob-light.png) ![mob-dark](img/mob-dark.png)

## Project Structure

flask-react-app/
│
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   ├── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── ...
│
└── README.md

## Backend and API

The backend of the Flask-React-App serves as the server-side component responsible for handling HTTP requests, managing the PostgreSQL database, and serving data to the frontend. This section provides details on how to connect to the database, the technologies used, and an overview of the API endpoints.

### PostgreSQL Database

The backend of this project uses a PostgreSQL relational database to store and manage user and organization data. PostgreSQL is a powerful, open-source relational database system known for its reliability and performance. You can find the database connection information in the `app.py` file.

### Database Connection

To connect to the PostgreSQL database, make sure you have PostgreSQL installed and running. The database connection is configured in the `app.py` file. The application uses the [SQLAlchemy](https://www.sqlalchemy.org/) library to interact with the database. Here's an example of the database configuration:

```python
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost:5432/flask-db'

db = SQLAlchemy(app)

Replace 'postgresql://username:password@localhost:5432/flask-db' with your PostgreSQL connection details, including the username, password, host, port, and database name.



## Frontend

The frontend of the Flask-React-App is built using the popular JavaScript library [React](https://reactjs.org/). React allows for the development of dynamic and responsive user interfaces. This section provides an overview of the frontend architecture, the technologies used, and how to run the frontend application.

### Frontend Architecture

The frontend of this project follows a component-based architecture, where the user interface is divided into modular components that can be reused and combined to build complex views. Here are some key components used in the frontend:

- **Navbar**: The navigation bar component displayed at the top of the application. It provides navigation links and user authentication options.

- **LoginPage**: The login and registration page where users can sign in or create new accounts. It uses [Formik](https://formik.org/) for form handling and validation.

- **HomePage**: The main application page where users can create organizations, manage organizations, and view organization details. It includes widgets like CreateOrg, GetOrg, and AllOrgs.

- **Widgets**: These components provide specific functionality within the HomePage, such as creating organizations, managing users within organizations, and displaying a list of organizations and their details.

- **FlexBetween**: A custom utility component used for layout and positioning.

### Technologies Used

The frontend of the Flask-React-App utilizes various technologies and libraries to enhance the user experience and streamline development:

- **React**: The core JavaScript library for building user interfaces.
- **React Router**: Used for routing within the application, enabling navigation between different pages and components.
- **Material-UI**: A popular React UI framework that provides pre-designed components and styles for a consistent and visually appealing user interface.
- **Formik and Yup**: Libraries for building and validating forms, used in the login and registration forms.
- **Redux**: A state management library for managing application-wide state, including user authentication and organization data.
- **Axios**: A library for making HTTP requests to the backend API.



## Getting Started

### Prerequisites

Before running the project, make sure you have the following prerequisites:

- Python (>=3.7)
- Node.js (>=12)
- npm (Node Package Manager)
- Flask
- React

### Installation

To get started, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/your-username/flask-react-app.git
cd flask-react-app

### Running the Backend

Create a Virtual Environment (Optional): It's recommended to create a virtual environment to isolate your project dependencies. You can do this using the venv module that comes with Python. Open your terminal and run: python -m venv venv

Install Python dependencies:

pip install -r requirements.txt

Once the dependencies are installed, you can start the development server by running:

python app.py

### Running the Frontend

To run the frontend of the Flask-React-App locally, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org/) installed on your system.

2. Navigate to the `frontend` directory in your project folder using the terminal.

3. Install the required dependencies by running the following command:

   ```bash
   npm install
    

Once the dependencies are installed, you can start the development server by running:
    npm start
This will launch the development server, and your React application will be available in your web browser at http://localhost:3000.

## Usage

You can use this project to:

Register users and manage organizations.
Add users to organizations and remove them.
View a list of all organizations and their members.

## Contributing

If you would like to contribute to this project, please follow these guidelines:

- Open an issue to discuss proposed changes or improvements.
- Fork the repository and create a new branch for your feature or bug fix.
- Make your changes and ensure that tests (if any) pass.
- Create a pull request with a clear description of your changes.