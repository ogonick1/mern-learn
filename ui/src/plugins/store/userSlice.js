import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/authService';

const initialState = {
  authToken: null,
  login: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (values) => {
    const result = await AuthService.login(values);
    return result.data.authToken;
  },

);
export const registration = createAsyncThunk(
  'user/registration',
  async (values) => {
    const result = await AuthService.registration(values);
    return result.data.authToken;
  },

);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.login = false;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.authToken = action.payload;
      state.login = true;
    });
    builder.addCase(registration.fulfilled, (state, action) => {
      state.authToken = action.payload;
      state.login = true;
    });
  },
});
export const { logOut } = userSlice.actions;

export default userSlice.reducer;
