import React from 'react';
import { Container, Typography } from '@mui/material';

function HomePage() {
    const organizations = []; // Fetch organizations
    const users = []; // Fetch users

    return (
        <Container maxWidth="md">
            <Typography variant="h4">Organizations</Typography>
            {organizations.map((org) => (
                <Paper key={org.id} elevation={3}>
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