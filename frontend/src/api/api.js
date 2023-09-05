import axios from 'axios';

// Create an Axios instance without a base URL
const api = axios.create();


// Function to create an organization
export const createOrganization = async (name) => {
  try {
    const response = await api.post('/organizations', { name });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to get a list of organizations
export const getOrganizations = async () => {
  try {
    const response = await api.get('/organizations');
    return response.data.organizations;
  } catch (error) {
    throw error;
  }
};

// Function to get details of a specific organization
export const getOrganization = async (orgId) => {
  try {
    const response = await api.get(`/organizations/${orgId}`);
    return response.data.organization;
  } catch (error) {
    throw error;
  }
};

// Function to fetch users for the selected organization
export const getUsersForOrganization = async (orgId) => {
  try {
    const response = await getOrganization(orgId);
    return response.users;
  } catch (error) {
    throw error;
  }
};

// Function to get users who are not in any organization
export const getUsersNotInOrganization = async () => {
  try {
    const response = await api.get('/users/not_in_organization');
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a user to an organization
export const addUserToOrganization = async (orgId, email) => {
  try {
    const response = await api.post(`/organizations/${orgId}/add_user`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to remove a user from an organization
export const removeUserFromOrganization = async (orgId, email) => {
  try {
    const response = await api.post(`/organizations/${orgId}/remove_user`, { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};


export default api;
