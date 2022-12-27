import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AuthService from '../../services/authService';

const initialState = {
  user: null,
  authToken: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (values) => {
    const result = await AuthService.login(values);
    return result.data;
  },

);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
