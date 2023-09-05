import { createSlice } from "@reduxjs/toolkit";
import { getUsersForOrganization } from 'api/api';

const initialState = {
  mode: "light",
  user: null,
  token: null,
  organizations: [],
  usersInOrganization: [],
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      //theme: Dark/Light mode
      setMode: (state) => {
        state.mode = state.mode === "light" ? "dark" : "light";
      },
      //Login
      setLogin: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
      },
      //logOut
      setLogout: (state) => {
        state.user = null;
        state.token = null;
      },
      updateOrganizations: (state, action) => {
        state.organizations = action.payload;
      },
      // Define the action to update users in the organization
      updateUsersInOrganization: async (state, action) => {
        try {
          // Fetch the updated users' data for the organization from the server
          const updatedUsersData = await getUsersForOrganization(action.payload.orgId);

          // Update the users in the organization with the new data
          state.usersInOrganization = updatedUsersData;
        } catch (error) {
          console.error('Error updating users in organization:', error);
        }
      },
    },
});

export const { setMode, setLogin, setLogout, updateOrganizations, updateUsersInOrganization } = authSlice.actions;
export default authSlice.reducer;