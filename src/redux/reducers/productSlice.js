import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

// GET
export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await API.get('/products');
  return res.data;
});

// POST
export const createProduct = createAsyncThunk('products/create', async (formData) => {
  const res = await API.post('/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
});

// DELETE
export const deleteProduct = createAsyncThunk('products/delete', async (id) => {
  await API.delete(`/products/${id}`);
  return id;
});

// UPDATE
export const updateProduct = createAsyncThunk('products/update', async ({ id, data }) => {
  const res = await API.put(`/products/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  }
});

export default productSlice.reducer;
