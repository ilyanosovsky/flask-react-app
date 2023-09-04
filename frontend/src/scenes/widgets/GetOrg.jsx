import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrganizations,
  getOrganization,
  addUserToOrganization,
  removeUserFromOrganization,
  getUsersForOrganization
} from 'api/api';
import WidgetWrapper from 'components/WidgetWrapper';
import {
  Select,
  MenuItem,
  Typography,
  Button,
  Snackbar,
  Alert
} from '@mui/material';
import { updateOrganizations } from 'state';

const GetOrg = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations);
  const [users, setUsers] = useState([]);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [orgDetails, setOrgDetails] = useState(null);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState('');
  const [selectedUserToRemove, setSelectedUserToRemove] = useState('');
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

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
      const loadOrgDetails = async () => {
        try {
          const org = await getOrganization(selectedOrgId);
          setOrgDetails(org);
        } catch (error) {
          console.error('Error loading organization details:', error);
        }
      };

      const loadUsers = async () => {
        try {
          const usersResponse = await getUsersForOrganization(selectedOrgId);
          setUsers(usersResponse.users);
        } catch (error) {
          console.error('Error loading users:', error);
        }
      };

      loadOrgDetails();
      loadUsers();
    } else {
      setOrgDetails(null);
      setUsers([]);
    }
  }, [selectedOrgId]);

  const handleAddUser = async () => {
    try {
      await addUserToOrganization(selectedOrgId, selectedUserToAdd);
      setSelectedUserToAdd("");
      setSnackbarMessage('User added successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding user to organization:', error);
    }
  };

  const handleRemoveUser = async () => {
    try {
      await removeUserFromOrganization(selectedOrgId, selectedUserToRemove);
      setSelectedUserToRemove("");
      setSnackbarMessage('User removed successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error removing user from organization:', error);
    }
  };

  return (
    <WidgetWrapper>
      <Typography variant="h5">Select an Organization</Typography>
      <Select
        value={selectedOrgId}
        onChange={(e) => setSelectedOrgId(e.target.value)}
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
          <Typography variant="h5">Organization Details</Typography>
          <Typography>ID: {orgDetails.id}</Typography>
          <Typography>Name: {orgDetails.name}</Typography>

          <Typography variant="h5">Users in Organization</Typography>
          {/* <Box border={1} p={2} mb={2}>
            {users.length > 0 ? (
              users.map((user) => (
                <div key={user.id}>{user.email}</div>
              ))
            ) : (
              <Typography>No users available.</Typography>
            )}
          </Box> */}

          <Typography variant="h5">Add User to Organization</Typography>
          <Select
            value={selectedUserToAdd}
            onChange={(e) => setSelectedUserToAdd(e.target.value)}
            fullWidth
          >
            <MenuItem value={null}>Select a user to add</MenuItem>
            {/* {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email}
              </MenuItem>
            ))} */}
          </Select>
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Add User
          </Button>

          <Typography variant="h5">Remove User from Organization</Typography>
          <Select
            value={selectedUserToRemove}
            onChange={(e) => setSelectedUserToRemove(e.target.value)}
            fullWidth
          >
            <MenuItem value={null}>Select a user to remove</MenuItem>
            {/* {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>
                {user.email}
              </MenuItem>
            ))} */}
          </Select>
          <Button variant="contained" color="secondary" onClick={handleRemoveUser}>
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