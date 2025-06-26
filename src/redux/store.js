import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import productReducer from './reducers/productSlice';
import categoryReducer from './reducers/categorySlice';
import filterReducer from './reducers/filterSlice';
import favoriteReducer from './reducers/favoriteSlice';
import chatReducer from './reducers/chatSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    filters: filterReducer,
    favorites: favoriteReducer,
    chat: chatReducer,
  },
  
});

export default store;
