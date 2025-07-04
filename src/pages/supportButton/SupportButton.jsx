import React from 'react';
import { FaComments } from 'react-icons/fa';
import styles from './SupportButton.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SupportButton = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const notifications = useSelector((state) => state.chat.notifications || {});
  const unreadCount = Object.values(notifications).reduce((sum, val) => sum + val, 0);

  const handleClick = () => {
    if (user?.isAdmin) {
      navigate('/admin/support');
    } else {
      navigate('/support');
    }
  };

  if (!user) return null;

  return (
    <button className={styles.supportButton} onClick={handleClick}>
      <FaComments />
      {unreadCount > 0 && (
        <span className={styles.badge}>{unreadCount > 99 ? '99+' : unreadCount}</span>
      )}
    </button>
  );
};

export default SupportButton;
