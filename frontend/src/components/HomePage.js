import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import axios from 'axios';

function HomePage() {
    const [organizations, setOrganizations] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch organizations and users when the component mounts
        const fetchOrganizations = async () => {
            try {
                const response = await axios.get('/organizations'); // Adjust the endpoint
                setOrganizations(response.data.organizations); // Make sure to access the 'organizations' key in the response data
            } catch (error) {
                console.error('Error fetching organizations:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log("Fetching users...");
                const response = await axios.get("/users", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Fetched users:", response.data.users);
                setUsers(response.data.users); // Set the users state with the fetched users
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchOrganizations();
        fetchUsers();
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Organizations</Typography>
            {organizations.map((org) => (
                <Paper key={org.id} elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
                    <Typography variant="h5">{org.name}</Typography>
                    {org.users.map((user) => (
                        <Typography key={user.id}>{user.email}</Typography>
                    ))}
                </Paper>
            ))}
            <Typography variant="h4">Users</Typography>
            {users.map((user) => (
                <Typography key={user.id}>{user.email}</Typography>
            ))}
        </Container>
    );
}

export default HomePage;