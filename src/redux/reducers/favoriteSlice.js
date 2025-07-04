import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const fetchFavorites = createAsyncThunk('favorites/fetch', async () => {
  const res = await API.get('/favorites');
  return res.data.filter(fav => fav.product);
});

export const removeFromFavorites = createAsyncThunk(
  'favorites/remove',
  async (productId) => {
    await API.delete(`/favorites/${productId}`);
    return productId;
  }
);

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter(fav => fav.product?._id !== action.payload);
      });
  },
});

export default favoriteSlice.reducer;
