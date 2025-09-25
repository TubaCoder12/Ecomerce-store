import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    Logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { login, Logout } = AuthSlice.actions;
export default AuthSlice.reducer;
