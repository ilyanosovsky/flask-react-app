import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import axios from 'axios';
import WidgetWrapper from 'components/WidgetWrapper';

function AllOrgs() {
    const [organizations, setOrganizations] = useState([]);
    const [users, setUsers] = useState([]);

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


    return (
        <WidgetWrapper>
            <Container >
            <Typography variant="h3">Organizations</Typography>
                {organizations.length > 0 ? (
                    organizations.map((org) => (
                        <Paper key={org.id} elevation={3} style={{ padding: '10px', margin: '10px 0' }}>
                            <Typography variant="h4">{org.name}</Typography>
                            <hr/>
                            {org.users.map((user) => (
                                <Typography key={user.id}>{user.email}</Typography>
                            ))}
                        </Paper>
                    ))
                ) : (
                    <Typography>No organizations available.</Typography>
                )}
            </Container>
        </WidgetWrapper>
    );
}

export default AllOrgs;