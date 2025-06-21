import React from 'react';
import { Link, Navigate, Outlet } from 'react-router';
import styles from './AdminLayout.module.css';
import { useSelector } from 'react-redux';

const AdminLayout = () => {

    const { user, loading } = useSelector((state) => state.user);

    if (loading) return <p>Yüklənir...</p>;
    if (!user || !user.isAdmin) return <Navigate to="/login" />;
    return (
        <div className={styles.container}>
            <aside className={styles.sidebar}>
                <h2>Admin</h2>
                <nav>
                    <Link to="/admin/dashboard">Dashboard</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/products">Products</Link>
                    <Link to="/admin/categories">Categories</Link>
                    <Link to="/admin/payments">Payments</Link>
                    <Link to="/admin/notifications">Notifications</Link>
                    <Link to="/login">Logout</Link>
                </nav>
            </aside>
            <main className={styles.content}>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
