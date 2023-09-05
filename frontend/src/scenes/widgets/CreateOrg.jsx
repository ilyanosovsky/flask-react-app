import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOrganization, getOrganizations } from 'api/api';
import { updateOrganizations } from 'state';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  useTheme,
  Typography,
} from '@mui/material';
import WidgetWrapper from 'components/WidgetWrapper';

const CreateOrg = () => {
  const dispatch = useDispatch();
  const [orgName, setOrgName] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const { palette } = useTheme();
  const dark = palette.neutral.dark;

  const handleCreateOrg = async () => {
    try {
      await createOrganization(orgName); // Call the API to create an organization
      setSnackbarMessage('Organization created successfully'); // Show a Snackbar with a success message
      setSnackbarOpen(true);
      setOrgName(''); // Clear the input field
      const organizations = await getOrganizations(); // Update the list of organizations
      // Dispatch an action to update the organization list in your Redux store
      dispatch(updateOrganizations(organizations));
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <WidgetWrapper>
      <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              mb="0.5rem"
            >
              Create a New Organization
      </Typography>
      <TextField
        label="Organization Name"
        variant="outlined"
        fullWidth
        sx={{ marginBottom:"0.5rem" }} 
        value={orgName}
        onChange={(e) => setOrgName(e.target.value)}
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        sx={{ marginBottom:"1rem" }} 
        onClick={handleCreateOrg}
      >
        Create
      </Button>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
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
