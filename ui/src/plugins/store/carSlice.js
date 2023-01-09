import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CarBrandService from '../../services/carBrand.service';

export const search = createAsyncThunk(
  'cars/search',
  async (param) => {
    const result = await CarBrandService.search(param);
    return result.carBrands;
  },
);

const initialState = {
  carBrands: null,
  loading: false,
};

export const carSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(search.pending, (state) => { state.loading = true; });
    builder.addCase(search.fulfilled, (state, action) => {
      state.loading = false;
      state.carBrands = action.payload;
    });
  },
});

export default carSlice.reducer;
