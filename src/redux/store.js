import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import productReducer from './reducers/productSlice';
import categoryReducer from './reducers/categorySlice';
import filterReducer from './reducers/filterSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    categories: categoryReducer,
    filters: filterReducer,
  },
});

export default store;
