import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.notFound}>
      <h1>404</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <button onClick={() => navigate('/')}>Go Home</button>
    </div>
  );
};

export default NotFoundPage;
