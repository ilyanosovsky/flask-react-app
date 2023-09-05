import React, { useState, useEffect } from 'react';
import { Container, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function AddU() {
    const [organizations, setOrganizations] = useState([]);
    const [users, setUsers] = useState([]);
    const [newOrgName, setNewOrgName] = useState('');
    const [selectedOrgId, setSelectedOrgId] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        // Fetch organizations and users when the component mounts
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get('/organizations');
                setOrganizations(response.data.organizations);
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data.users);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchOrganizations();
        fetchUsers();
    }, []);

    const handleAddUserToOrganization = async () => {
        try {
            if (selectedOrgId && selectedUserId) {
                const response = await axios.post(`/organizations/${selectedOrgId}/add_user`, {
                    email: users.find(user => user.id === selectedUserId).email,
                });
                setUsers([...users, response.data.user]);
                setSelectedOrgId(null); // Reset selected organization
                setSelectedUserId(null); // Reset selected user
            }
        } catch (error) {
            console.error('Error adding user to organization:', error);
        }
    };

    return (
        <Container sx={{ display:"flex", flexDirection:"row-reverse", padding: "1rem 0rem"}}>

                {/* Dropdown for selecting user */}
                <Select
                    label="Select User"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    variant="outlined"
                    style={{ marginTop: '10px' }}
                >
                    <MenuItem value=''>Select User</MenuItem>
                    {users.length > 0 && users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.email}
                        </MenuItem>
                        ))}
                </Select>

                <Button variant="contained" onClick={handleAddUserToOrganization}>
                    Add User to Organization
                </Button>
        </Container>
    );
}

export default AddU;