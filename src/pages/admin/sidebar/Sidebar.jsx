import React, { useState } from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router';
import {
  MdDashboard, MdPeople, MdCategory, MdOutlineLogout,
  MdShoppingCart, MdPayment, MdNotifications, MdSupportAgent, MdMenu
} from 'react-icons/md';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.hamburger} onClick={() => setOpen(!open)}>
        <MdMenu />
      </div>

      <div className={`${styles.sidebar} ${open ? styles.show : ''}`}>
        <h2 className={styles.logo}>HTH Admin</h2>
        <nav className={styles.nav}>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdDashboard /> Dashboard
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdPeople /> Users
          </NavLink>
          <NavLink to="/admin/support" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdSupportAgent /> Support
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdShoppingCart /> Products
          </NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdCategory /> Categories
          </NavLink>
          <NavLink to="/admin/payments" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdPayment /> Payments
          </NavLink>
          <NavLink to="/admin/notifications" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdNotifications /> Notifications
          </NavLink>
          <NavLink to="/admin/logout" className={({ isActive }) => isActive ? styles.active : ''}>
            <MdOutlineLogout /> Logout
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
