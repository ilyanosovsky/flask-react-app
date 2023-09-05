import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrganizations,
  getOrganization,
  addUserToOrganization,
  removeUserFromOrganization,
  getUsersForOrganization,
  getUsersNotInOrganization
} from 'api/api';
import WidgetWrapper from 'components/WidgetWrapper';
import {
  Select,
  MenuItem,
  Typography,
  Button,
  Snackbar,
  Box,
  useTheme,
  Alert
} from '@mui/material';
import { updateOrganizations } from 'state';

const GetOrg = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations);
  const usersInOrganization = useSelector((state) => state.usersInOrganization);
  const [usersNotInOrg, setUsersNotInOrg] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [orgDetails, setOrgDetails] = useState(null);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState('');
  const [selectedUserToRemove, setSelectedUserToRemove] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [isLoading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  const loadOrgData = async (orgId) => {
    try {
      setLoading(true);
      setError(null);
      const org = await getOrganization(orgId);
      setOrgDetails(org);
      const usersResponse = await getUsersForOrganization(orgId);
      setUsers(usersResponse);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // Load users who are not in any organization when the component mounts
  useEffect(() => {
    const loadUsersNotInOrg = async () => {
        try {
        const response = await getUsersNotInOrganization();
        setUsersNotInOrg(response.users_not_in_organization);
        } catch (error) {
        console.error('Error loading users not in organization:', error);
        }
    };

    loadUsersNotInOrg();
    }, []);

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

  // Load organization details and users when the selectedOrgId changes
  useEffect(() => {
    if (selectedOrgId) {
      loadOrgData(selectedOrgId);
    } else {
      setOrgDetails(null);
      setUsers([]);
    }
  }, [selectedOrgId]);

  const handleAddUser = async () => {
    try {
      const userToAdd = usersNotInOrg.find((user) => user.id === selectedUserToAdd);
      if (userToAdd) {
        await addUserToOrganization(selectedOrgId, userToAdd.email);
        setSelectedUserToAdd("");
        setSnackbarMessage("User added successfully");
        setSnackbarOpen(true);
  
        // Fetch the updated list of users not in any organization and set it
        const updatedUsersNotInOrg = await getUsersNotInOrganization();
        setUsersNotInOrg(updatedUsersNotInOrg.users_not_in_organization);
  
        // Reload organization data after adding user
        loadOrgData(selectedOrgId);
      } else {
        console.error("User not found in the list of users.");
      }
    } catch (error) {
      console.error("Error adding user to organization:", error);
    }
  };
  

  const handleRemoveUser = async () => {
    try {
      // Convert selectedUserToRemove to the email of the user to be removed
      const userToRemove = users.find((user) => user.id === selectedUserToRemove);
      if (userToRemove) {
        await removeUserFromOrganization(selectedOrgId, userToRemove.email);
        setSelectedUserToRemove("");
        setSnackbarMessage("User removed successfully");
        setSnackbarOpen(true);
  
        // Fetch the updated list of users not in any organization and set it
        const updatedUsersNotInOrg = await getUsersNotInOrganization();
        setUsersNotInOrg(updatedUsersNotInOrg.users_not_in_organization);
  
        // Reload organization data after removing user
        loadOrgData(selectedOrgId);
      } else {
        console.error("User not found in the list of users.");
      }
    } catch (error) {
      console.error("Error removing user from organization:", error);
    }
  };  

    // Render loading state
    if (isLoading) {
    return <p>Loading...</p>;
    }

    // Render error state
    if (error) {
    return <p>Error: {error.message}</p>;
    }

  return (
    <WidgetWrapper>
          <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              mb="0.5rem"
            >
              Add Users to Organization
      </Typography>
      <Typography variant="h5" color={dark} mb="0.5rem">Select an Organization</Typography>
      <Select
        value={selectedOrgId}
        onChange={(e) => setSelectedOrgId(e.target.value)}
        mb="0.5rem"
        fullWidth
      >
        <MenuItem value="">Select an organization</MenuItem>
        {organizations.map((org) => (
          <MenuItem key={org.id} value={org.id}>
            {org.name}
          </MenuItem>
        ))}
      </Select>

      {orgDetails && (
        <div>
          <Typography variant="h5" mt="1rem">Organization Details</Typography>
          <Typography ml="1rem">ID: {orgDetails.id}</Typography>
          <Typography ml="1rem">Name: {orgDetails.name}</Typography>

          <Typography variant="h5" mt="1rem">Users in Organization</Typography>
          <Box border={1} p={2} mb={2} mt={1} borderColor={main}>
            {users.length > 0 ? (
                users.map((user) => (
                <div key={user.id}>{user.email}</div>
                ))
            ) : (
                <div>No users in organization</div>
            )}
          </Box>

          <Typography variant="h5" mb="0.5rem">Add User to Organization</Typography>
          <Select
            value={selectedUserToAdd}
            onChange={(e) => setSelectedUserToAdd(e.target.value)}
            sx={{ marginBottom:"0.5rem" }}
            fullWidth
          >
            <MenuItem value={null}>Select a user to add</MenuItem>
            {usersNotInOrg.length > 0 && (usersNotInOrg.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email}
              </MenuItem>)
            ))}
          </Select>
          <Button variant="contained" fullWidth color="primary" onClick={handleAddUser}>
            Add User
          </Button>

          <Typography variant="h5" mb="0.5rem" mt="1rem">Remove User from Organization</Typography>
          <Select
            value={selectedUserToRemove}
            onChange={(e) => setSelectedUserToRemove(e.target.value)}
            sx={{ marginBottom:"0.5rem" }} 
            fullWidth
          >
            <MenuItem value={null}>Select a user to remove</MenuItem>
            {users.length > 0 && (users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email}
              </MenuItem>)
            ))}
          </Select>
          <Button variant="contained" fullWidth mb="1rem" color="secondary" onClick={handleRemoveUser}>
            Remove User
          </Button>
        </div>
      )}

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </WidgetWrapper>
  );
};

export default GetOrg;