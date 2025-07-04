import React, { useEffect, useState } from 'react';
import styles from './AdminSupportPage.module.css';
import SupportUserList from './supportUserList/SupportUserList';
import SupportChat from './supportChat/SupportChat';
import API from '../../../services/api';
import { FaArrowLeft } from 'react-icons/fa';

const AdminSupportPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/support/admin');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch support users:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleBack = () => {
    setSelectedUser(null);
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.left} ${selectedUser ? styles.hideOnMobile : ''}`}>
        <h4 className={styles.heading}>Support Users</h4>
        <SupportUserList
          users={users}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
      </div>

      <div className={`${styles.right} ${selectedUser ? styles.showOnMobile : ''}`}>
        {selectedUser ? (
          <SupportChat selectedUser={selectedUser} onBack={handleBack} />
        ) : (
          <div className={styles.emptyChat}>No user selected</div>
        )}
      </div>
    </div>
  );
};

export default AdminSupportPage;
