import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrganizations,
  getOrganization,
  addUserToOrganization,
  removeUserFromOrganization,
} from 'api/api';
import WidgetWrapper from 'components/WidgetWrapper';
import {
  Select,
  MenuItem,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import { updateOrganizations } from 'state';

const GetOrg = () => {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations);
  const [selectedOrgId, setSelectedOrgId] = useState('');
  const [orgDetails, setOrgDetails] = useState(null);
  const [emailToAdd, setEmailToAdd] = useState('');
  const [emailToRemove, setEmailToRemove] = useState('');
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

  // Load organization details when the selectedOrgId changes
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

      loadOrgDetails();
    } else {
      // Clear orgDetails when no organization is selected
      setOrgDetails(null);
    }
  }, [selectedOrgId]);

  const handleAddUser = async () => {
    try {
      // Call the API to add a user to the selected organization
      await addUserToOrganization(selectedOrgId, emailToAdd);
      // Optionally, update the orgDetails state or dispatch actions
      // ...

      // Clear the input field
      setEmailToAdd('');
      // Show Snackbar with success message
      setSnackbarMessage('User added successfully');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error adding user to organization:', error);
    }
  };

  const handleRemoveUser = async () => {
    try {
      // Call the API to remove a user from the selected organization
      await removeUserFromOrganization(selectedOrgId, emailToRemove);
      // Optionally, update the orgDetails state or dispatch actions
      // ...

      // Clear the input field
      setEmailToRemove('');
      // Show Snackbar with success message
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

          <Typography variant="h5">Add User to Organization</Typography>
          <TextField
            label="User Email"
            variant="outlined"
            fullWidth
            value={emailToAdd}
            onChange={(e) => setEmailToAdd(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddUser}>
            Add User
          </Button>

          <Typography variant="h5">Remove User from Organization</Typography>
          <TextField
            label="User Email"
            variant="outlined"
            fullWidth
            value={emailToRemove}
            onChange={(e) => setEmailToRemove(e.target.value)}
          />
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