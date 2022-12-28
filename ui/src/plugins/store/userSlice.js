import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import AuthService from '../../services/authService';

const initialState = {
  authToken: null,
  isAuth: false,
  loading: false,
};

export const login = createAsyncThunk(
  'user/login',
  async (values) => {
    const result = await AuthService.login(values);
    return result.authToken;
  },
);

export const registration = createAsyncThunk(
  'user/registration',
  async (values) => {
    const result = await AuthService.registration(values);
    return result.authToken;
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
      state.authToken = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(login.fulfilled, registration.fulfilled),
      (state, action) => {
        state.authToken = action.payload;
        state.isAuth = true;
      },
    );
    builder.addMatcher(
      isAnyOf(
        login.rejected,
        login.fulfilled,
        registration.rejected,
        registration.fulfilled,
      ),
      (state) => {
        state.loading = false;
      },
    );
    builder.addMatcher(
      isAnyOf(
        login.pending,
        registration.pending,
      ),
      (state) => {
        state.loading = true;
        state.isAuth = false;
        state.authToken = null;
      },
    );
  },
});
export const { logOut } = userSlice.actions;

export default userSlice.reducer;
