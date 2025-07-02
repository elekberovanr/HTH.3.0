import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router';
import styles from './AdminLayout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../../../redux/reducers/userSlice';
import Sidebar from '../sidebar/Sidebar';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && !user) {
      dispatch(fetchMe());
    }
  }, [dispatch, user]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (!user || !user.isAdmin) return <Navigate to="/login" />;

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
