import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router'; 
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import AddProduct from '../pages/add/AddProduct';
import Profile from '../pages/profile/Profile';
import ProfileEdit from '../pages/profile/profileEdit/ProfileEdit';
import EditProduct from '../pages/profile/editProduct/EditProduct';
import UserProfile from '../pages/user/UserProfile';
import ChatLayout from '../pages/chat/ChatLayout'; 
import ForgotPassword from '../pages/login/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/login/resetPassword/ResetPassword';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
          <Route path="profile/edit/:id" element={<EditProduct />} />
          <Route path="user/:id" element={<UserProfile />} />
          <Route path="chat/:id?" element={<ChatLayout />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
