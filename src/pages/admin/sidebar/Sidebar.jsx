import React from 'react';
import styles from './Sidebar.module.css';
import { NavLink } from 'react-router';
import {
  MdDashboard, MdPeople, MdCategory, MdOutlineLogout,
  MdShoppingCart, MdPayment, MdNotifications
} from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>HTH Admin</h2>
      <nav className={styles.nav}>
        <NavLink to="/admin/dashboard" activeClassName={styles.active}>
          <MdDashboard /> Dashboard
        </NavLink>
        <NavLink to="/admin/users" activeClassName={styles.active}>
          <MdPeople /> Users
        </NavLink>
        <NavLink to="/admin/products" activeClassName={styles.active}>
          <MdShoppingCart /> Products
        </NavLink>
        <NavLink to="/admin/categories" activeClassName={styles.active}>
          <MdCategory /> Categories
        </NavLink>
        <NavLink to="/admin/payments" activeClassName={styles.active}>
          <MdPayment /> Payments
        </NavLink>
        <NavLink to="/admin/notifications" activeClassName={styles.active}>
          <MdNotifications /> Notifications
        </NavLink>
        <NavLink to="/logout" activeClassName={styles.active}>
          <MdOutlineLogout /> Logout
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
