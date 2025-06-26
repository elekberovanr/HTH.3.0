import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await API.get('/products');
  return res.data;
});

export const fetchProductsByCategory = createAsyncThunk('products/fetchByCategory', async (categoryId) => {
  const res = await API.get(`/products/category/${categoryId}`);
  return res.data;
});

const favoriteSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.items = action.payload;
      });
  },
});

export default favoriteSlice.reducer;
