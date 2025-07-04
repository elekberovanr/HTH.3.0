import React from 'react';
import { FaComments } from 'react-icons/fa';
import styles from './SupportButton.module.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SupportButton = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const handleClick = () => {
    if (user?.isAdmin) {
      navigate('/admin/support');
    } else {
      navigate('/support');
    }
  };

  return (
    <button className={styles.supportButton} onClick={handleClick}>
      <FaComments />
    </button>
  );
};

export default SupportButton;
