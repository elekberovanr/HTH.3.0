import React, { useState } from 'react';
import styles from './AdminSupportPage.module.css';
import SupportUserList from './supportUserList/SupportUserList';
import SupportChat from './supportChat/SupportChat';
import { FaArrowLeft } from 'react-icons/fa';

const AdminSupportPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const isMobile = window.innerWidth <= 768;

  return (
    <div className={styles.container}>
      <div className={`${styles.sidebar} ${selectedUser && isMobile ? styles.hide : ''}`}>
        <SupportUserList onSelectUser={setSelectedUser} selectedUser={selectedUser} />
      </div>

      <div className={`${styles.chatArea} ${!selectedUser && isMobile ? styles.hide : ''}`}>
        {selectedUser ? (
          <div>
            {isMobile && (
              <button className={styles.backButton} onClick={() => setSelectedUser(null)}>
                <FaArrowLeft /> Geri
              </button>
            )}
            <SupportChat user={selectedUser} />
          </div>
        ) : (
          <div className={styles.placeholder}>İstifadəçi seçin</div>
        )}
      </div>
    </div>
  );
};

export default AdminSupportPage;
