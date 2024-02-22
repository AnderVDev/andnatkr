import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  user: null,
  access_token: null,
  refresh_token: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCredentials: (state, action) => {
      const { user, access_token, refresh_token } = action.payload;
      state.user = user;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    setLogout: (state) => {
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { setMode, setCredentials, setLogout } = authSlice.actions;
export default authSlice.reducer;
