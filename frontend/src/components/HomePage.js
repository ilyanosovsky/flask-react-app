import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, TextField, Button, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function HomePage() {
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

    const handleCreateOrganization = async () => {
        try {
            const response = await axios.post('/organizations', {
                name: newOrgName,
            });
            setOrganizations([...organizations, response.data.organization]);
            setNewOrgName('');
        } catch (error) {
            console.error('Error creating organization:', error);
        }
    };

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
            <Container >
            <Typography variant="h4">Organizations</Typography>
                {organizations.length > 0 ? (
                    organizations.map((org) => (
                        <Paper key={org.id} elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
                            <Typography variant="h5">{org.name}</Typography>
                            {org.users.map((user) => (
                                <Typography key={user.id}>{user.email}</Typography>
                            ))}
                        </Paper>
                    ))
                ) : (
                    <Typography>No organizations available.</Typography>
                )}
            </Container>

            <Container>
                <TextField
                    label="Organization Name"
                    variant="outlined"
                    value={newOrgName}
                    onChange={(e) => setNewOrgName(e.target.value)}
                />
                <Button variant="contained" onClick={handleCreateOrganization}>
                    Create Organization
                </Button>

                <hr />

                {/* Dropdown for selecting organization */}
                <Select
                    label="Select Organization"
                    value={selectedOrgId}
                    onChange={(e) => setSelectedOrgId(e.target.value)}
                    variant="outlined"
                    style={{ marginTop: '10px' }}
                >
                    <MenuItem value="" disabled>
                        Select Organization
                    </MenuItem>
                    {organizations.map((org) => (
                        <MenuItem key={org.id} value={org.id}>
                            {org.name}
                        </MenuItem>
                    ))}
                </Select>

                {/* Dropdown for selecting user */}
                <Select
                    label="Select User"
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    variant="outlined"
                    style={{ marginTop: '10px' }}
                >
                    <MenuItem value={null}>Select User</MenuItem>
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.email}
                        </MenuItem>
                    ))}
                </Select>

                <Button variant="contained" onClick={handleAddUserToOrganization}>
                    Add User to Organization
                </Button>
            </Container>        

        </Container>
    );
}

export default HomePage;