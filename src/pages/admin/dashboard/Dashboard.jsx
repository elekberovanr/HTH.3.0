import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import API from '../../../services/api'; // Axios instance
import { FaUser, FaBox, FaFolderOpen, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    categories: 0,
    income: 0,
    recentUsers: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get('/admin/stats');
         console.log('Gelen statistikalar:', res.data); 
        setStats(res.data);
      } catch (err) {
        console.error('Statistika yüklənmədi', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={styles.dashboard}>
      <h2>Admin Dashboard</h2>
      <div className={styles.cards}>
        <div className={styles.card}>
          <FaUser className={styles.icon} />
          <h3>{stats.users}</h3>
          <span>Users</span>
        </div>
        <div className={styles.card}>
          <FaBox className={styles.icon} />
          <h3>{stats.products}</h3>
          <span>Products</span>
        </div>
        <div className={styles.card}>
          <FaFolderOpen className={styles.icon} />
          <h3>{stats.categories}</h3>
          <span>Categories</span>
        </div>
        <div className={styles.card}>
          <FaDollarSign className={styles.icon} />
          <h3>${stats.income}</h3>
          <span>Support Income</span>
        </div>
      </div>

      <div className={styles.recentUsers}>
        <h3>Recent Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Registered</th>
            </tr>
          </thead>
          <tbody>
            {stats.recentUsers.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
