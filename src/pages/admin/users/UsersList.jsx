import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import styles from './UsersList.module.css';
import { FiEdit3, FiTrash2, FiSave } from 'react-icons/fi';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editData, setEditData] = useState({ username: '', email: '', password: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch users');
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditUserId(user._id);
    setEditData({
      username: user.username || '',
      email: user.email || '',
      password: ''
    });
  };

  const handleSave = async () => {
    try {
      const updated = {};
      if (editData.username.trim()) updated.username = editData.username.trim();
      if (editData.email.trim()) updated.email = editData.email.trim();
      if (editData.password.trim()) updated.password = editData.password.trim();

      const res = await API.put(`/admin/update-user/${editUserId}`, updated);
      const data = res.data;

      setUsers(prev =>
        prev.map(user => user._id === editUserId ? { ...user, ...data } : user)
      );

      setEditUserId(null);
      setEditData({ username: '', email: '', password: '' });
    } catch (err) {
      alert('Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await API.delete(`/admin/delete-user/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>User Management</h2>
      <div className={styles.tableWrapper}>
        <div className={`${styles.row} ${styles.header}`}>
          <div>Profile</div>
          <div>Username</div>
          <div>Email</div>
          <div>Password</div>
          <div>Actions</div>
        </div>
        {users.map((user) => (
          <div className={styles.row} key={user._id}>
            {editUserId === user._id ? (
              <>
                <div>
                  {user.profileImage && (
                    <img
                      src={`http://localhost:5555/uploads/${user.profileImage}`}
                      alt="profile"
                      className={styles.avatar}
                    />
                  )}
                </div>
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
                  placeholder="New password"
                  value={editData.password}
                  onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                />
                <div className={styles.actions}>
                  <button onClick={handleSave}><FiSave /></button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {user.profileImage && (
                    <img
                      src={`http://localhost:5555/uploads/${user.profileImage}`}
                      alt="profile"
                      className={styles.avatar}
                    />
                  )}
                </div>
                <div>{user.username}</div>
                <div>{user.email}</div>
                <div>••••••</div>
                <div className={styles.actions}>
                  <button onClick={() => handleEdit(user)}><FiEdit3 /></button>
                  <button onClick={() => handleDelete(user._id)}><FiTrash2 /></button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
