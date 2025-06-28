import React, { useState } from 'react';
import styles from './AdminSupportPage.module.css';
import SupportUserList from './supportUserList/SupportUserList';
import SupportChat from './supportChat/SupportChat';

const AdminSupportPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SupportUserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>
      <div className={styles.chatArea}>
        {selectedUser ? (
          <SupportChat user={selectedUser} />
        ) : (
          <div className={styles.placeholder}>İstifadəçi seçin</div>
        )}
      </div>
    </div>
  );
};

export default AdminSupportPage;
