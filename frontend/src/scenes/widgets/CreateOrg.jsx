import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrganization, getOrganizations } from 'api/api';
import { updateOrganizations } from 'state';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';

const CreateOrg = () => {
  const dispatch = useDispatch();
  const [orgName, setOrgName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleCreateOrg = async () => {
    try {
      // Call the API to create an organization
      await createOrganization(orgName);

      // Show a Snackbar with a success message
      setSnackbarMessage('Organization created successfully');
      setSnackbarOpen(true);

      // Clear the input field
      setOrgName('');

      // Update the list of organizations
      const organizations = await getOrganizations();
      // Dispatch an action to update the organization list in your Redux store
      dispatch(updateOrganizations(organizations));
    } catch (error) {
      console.error('Error creating organization:', error);
      // Handle error scenarios here, if needed
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <WidgetWrapper>
      <h2>Create a New Organization</h2>
      <TextField
        label="Organization Name"
        variant="outlined"
        fullWidth
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateOrg}
      >
        Create
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </WidgetWrapper>
  );
};

export default CreateOrg;
