import React, { useState } from 'react';
import axios from 'axios';
import styles from './ForgotPassword.module.css';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/api/auth/forgot-password', { email });
      localStorage.setItem('resetEmail', email);
      navigate('/reset-password');
    } catch (err) {
      setError(err.response?.data?.error || 'Kod göndərilə bilmədi');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h2 className={styles.title}>Forgot password?</h2>
        <form onSubmit={handleSendCode} className={styles.form}>
          <input
            type="email"
            placeholder="Emaili daxil edin"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Send code</button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
