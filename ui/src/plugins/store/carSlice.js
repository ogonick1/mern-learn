import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carBrands: null,
  loading: false,
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
});

export default carSlice.reducer;
