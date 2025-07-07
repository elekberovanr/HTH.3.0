import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useDispatch } from 'react-redux';
import { setToken } from '../../redux/reducers/userSlice';
import { FiMail, FiLock } from 'react-icons/fi';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user } = res.data;

      // Token + user Redux və localStorage-a yazılır
      dispatch(setToken({ token, user }));

      // Yönləndirmə
      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      alert('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.icon} />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.icon} />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className={styles.linkText}>
            <Link to="/forgot-password">Forgot password?</Link>
          </p>
          <p className={styles.linkText}>
            Not registered yet? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
