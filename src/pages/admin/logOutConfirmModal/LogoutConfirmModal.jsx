
import React from 'react';
import styles from './LogoutConfirmModal.module.css';

const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Are you sure you want to log out?</h3>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirm}>Yes</button>
          <button onClick={onCancel} className={styles.cancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmModal;
