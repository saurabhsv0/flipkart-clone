import { createSlice } from '@reduxjs/toolkit';

// Mock auth. Swap login() for an Axios call to /auth/login when the backend exists.
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null }, // { phone, name }
  reducers: {
    login(state, { payload }) { state.user = payload; },
    logout(state) { state.user = null; },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
