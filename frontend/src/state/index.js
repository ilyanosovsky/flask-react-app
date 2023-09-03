import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
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
    },
});

export const { setMode, setLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;