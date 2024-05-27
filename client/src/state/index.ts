import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Define the shape of the user
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar: string;
}

// Define the shape of the state
interface AuthState {
  mode: "light" | "dark";
  user: User | null;
  access_token: string | null;
  refresh_token: string | null;
}

const initialState: AuthState = {
  mode: "dark",
  user: null,
  access_token: null,
  refresh_token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCredentials: (
      state,
      action: PayloadAction<{
        user: User;
        access_token: string;
        refresh_token: string;
      }>
    ) => {
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
