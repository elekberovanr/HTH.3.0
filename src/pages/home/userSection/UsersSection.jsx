import React, { useEffect, useState } from 'react';
import styles from './UsersSection.module.css';
import API from '../../../services/api';
import { Link } from 'react-router-dom';

const UsersSection = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await API.get('/users/public');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to load users', err);
      }
    };
    loadUsers();
  }, []);

  return (
    <div className={styles.section}>
      <h2 className={styles.title}>Users</h2>
      <div className={styles.scrollContainer}>
        {users.map(user => (
          <div key={user._id} className={styles.card}>
            <img
              src={`http://localhost:5555/uploads/${user.profileImage || 'default-user.png'}`}
              alt={user.name}
              className={styles.avatar}
            />
            <h4 className={styles.name}>{user.username}</h4>
            <Link to={`/user/${user._id}`} className={styles.profileBtn}>
              See Profile
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
};

export default UsersSection;
