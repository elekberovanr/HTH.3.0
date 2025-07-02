
import React from 'react';
import { Routes, Route } from 'react-router';
import AdminLayout from '../pages/admin/adminLayout/AdminLayout';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import AddCategory from '../pages/admin/category/AddCategory';
import UsersList from '../pages/admin/users/UsersList';
import AdminProducts from '../pages/admin/products/AdminProducts';
import AdminSupportPage from '../pages/admin/supportChat/AdminSupportPage';
import RequireAuth from '../components/auth/RequireAuth';
import LogoutConfirmModal from '../pages/admin/logOutConfirmModal/LogoutConfirmModal';

const AdminRouter = () => (
  <Routes>
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<RequireAuth adminOnly={true}><Dashboard /></RequireAuth>} />
      <Route path="categories" element={<RequireAuth adminOnly={true}><AddCategory /></RequireAuth>} />
      <Route path="users" element={<RequireAuth adminOnly={true}><UsersList /></RequireAuth>} />
      <Route path="products" element={<RequireAuth adminOnly={true}><AdminProducts /></RequireAuth>} />
      <Route path="support" element={<RequireAuth adminOnly={true}><AdminSupportPage /></RequireAuth>} />
      <Route path="logout" element={<RequireAuth adminOnly={true}><LogoutConfirmModal /></RequireAuth>} />
    </Route>
  </Routes>
);

export default AdminRouter;
