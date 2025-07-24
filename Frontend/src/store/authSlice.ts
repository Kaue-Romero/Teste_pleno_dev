import { createSlice } from '@reduxjs/toolkit';
import { login as LoginAction, register as RegisterAction } from '../utils/axiosInstance';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    token: null,
  },
  reducers: {
    register: (_state, action) => {
      RegisterAction(action.payload)
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    },
    login: (state, action) => {
      LoginAction(action.payload)
        .then((response) => {
          state.isLoggedIn = true;
          state.token = response.data.token;
          state.user = response.data.user;
        })
        .catch((error) => {
          console.error("Login failed:", error);
          state.isLoggedIn = false;
          state.token = null;
          state.user = null;
        });
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;
