// src/pages/admin/users/UsersList.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../../services/api';
import styles from './UsersList.module.css';
import { FiEdit3, FiTrash2, FiSave } from 'react-icons/fi';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({ username: '', email: '', password: '' });

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('İstifadəçilər yüklənmədi');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditData({ username: user.username || '', email: user.email || '', password: '' });
  };

  const handleSave = async () => {
    try {
      await axios.put(`/users/${editUserId}`, editData);
      setEditUserId(null);
      setEditData({ username: '', email: '', password: '' });
      fetchUsers();
    } catch (err) {
      alert('Dəyişikliklər yadda saxlanmadı');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('İstifadəçi silinsin?')) return;
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      alert('İstifadəçi silinmədi');
    }
  };

  return (
    <div className={styles.container}>
      <h2>İstifadəçilər</h2>
      <ul className={styles.table}>
        <li className={styles.headerRow}>
          <span>Ad</span>
          <span>Email</span>
          <span>Şifrə</span>
          <span>Əməliyyatlar</span>
        </li>
        {users.map((user) => (
          <li key={user._id} className={styles.row}>
            {editUserId === user._id ? (
              <>
                <input
                  type="text"
                  value={editData.username}
                  onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                />
                <input
                  type="password"
                  placeholder="Yeni şifrə"
                  value={editData.password}
                  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                />
                <span className={styles.actions}>
                  <button onClick={handleSave}><FiSave /></button>
                </span>
              </>
            ) : (
              <>
                <span>{user.username}</span>
                <span>{user.email}</span>
                <span>••••••</span>
                <span className={styles.actions}>
                  <button onClick={() => handleEdit(user)}><FiEdit3 /></button>
                  <button onClick={() => handleDelete(user._id)}><FiTrash2 /></button>
                </span>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
