import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Paper, useTheme } from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';
import {
  getOrganizations,
  getUsersForOrganization,
  addUserToOrganization, 
  removeUserFromOrganization, 
} from 'api/api';
import {
  updateOrganizations,
  updateUsersInOrganization,
} from 'state';

function AllOrgs() {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations);

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  // Load organizations when the component mounts
  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await getOrganizations();
        dispatch(updateOrganizations(orgs));
      } catch (error) {
        console.error('Error loading organizations:', error);
      }
    };

    loadOrganizations();
  }, [dispatch]);

  // Define a function to load users for a specific organization
  const loadUsersForOrganization = async (orgId) => {
    try {
      const usersResponse = await getUsersForOrganization(orgId);
      dispatch(updateUsersInOrganization(orgId, usersResponse));
    } catch (error) {
      console.error('Error loading users for organization:', error);
    }
  };

  // Define a function to handle adding a user to an organization
  const handleAddUserToOrganization = async (orgId, email) => {
    try {
      await addUserToOrganization(orgId, email);
      // After adding a user, reload the users for the organization
      loadUsersForOrganization(orgId);
    } catch (error) {
      console.error('Error adding user to organization:', error);
    }
  };

  // Define a function to handle removing a user from an organization
  const handleRemoveUserFromOrganization = async (orgId, email) => {
    try {
      await removeUserFromOrganization(orgId, email);
      // After removing a user, reload the users for the organization
      loadUsersForOrganization(orgId);
    } catch (error) {
      console.error('Error removing user from organization:', error);
    }
  };

  return (
    <WidgetWrapper>
      <Container>
      <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              mb="0.5rem"
            >
              Organizations
      </Typography>
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <Paper
              key={org.id}
              elevation={3}
              style={{ padding: '10px', margin: '10px 0' }}
            >
              <Typography variant="h4">{org.name}</Typography>
              <hr />
              {org.users.length > 0 ? (
                  org.users.map((user) => (
                    <Typography key={user.id}>{user.email}</Typography>
                  ))
              ) : (
                  <Typography>No users here</Typography>
              )}
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