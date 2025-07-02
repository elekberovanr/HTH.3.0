import React from 'react';
import styles from './Delete.module.css';

const Delete = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Delete Product</h3>
        <p className={styles.text}>Are you sure you want to delete this product?</p>
        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>Cancel</button>
          <button className={styles.confirm} onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
