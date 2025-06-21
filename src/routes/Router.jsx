import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Layout from '../layout/Layout';
import Home from '../pages/home/Home';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import AddProduct from '../pages/add/AddProduct';
import Profile from '../pages/profile/Profile';
import EditProduct from '../pages/profile/editProduct/EditProduct';
import UserProfile from '../pages/user/UserProfile';
import ChatLayout from '../pages/chat/ChatLayout';
import ForgotPassword from '../pages/login/forgotPassword/ForgotPassword';
import ResetPassword from '../pages/login/resetPassword/ResetPassword';
import EditProfile from '../pages/profile/profileEdit/EditProfile';
import AdminLayout from '../pages/admin/adminLayout/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';


const Router = () => {
  return (

    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="add" element={<AddProduct />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/edit/:id" element={<EditProduct />} />
        <Route path="user/:id" element={<UserProfile />} />
        <Route path="chat/:id?" element={<ChatLayout />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>

    </Routes>

  );
};

export default Router