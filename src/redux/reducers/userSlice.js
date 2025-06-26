import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('accessToken') || null,
  loading: false,
  error: null,
};

export const fetchMe = createAsyncThunk('user/fetchMe', async (_, thunkAPI) => {
  try {
    const res = await API.get('/auth/me');
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue('İstifadəçi alınmadı');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('accessToken'); 
      localStorage.removeItem('user');
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('accessToken', action.payload); 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        localStorage.setItem('user', JSON.stringify(action.payload)); 
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { logout, setToken } = userSlice.actions;
export default userSlice.reducer;
