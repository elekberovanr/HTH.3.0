import React from 'react';
import styles from './LogoutConfirmModal.module.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LogoutConfirmModal = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Are you sure you want to logout?</h3>
        <div className={styles.buttons}>
          <button className={styles.yesBtn} onClick={handleLogout}>Yes, Logout</button>
          <button className={styles.noBtn} onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
