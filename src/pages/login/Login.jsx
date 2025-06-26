import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../../services/api';
import { useDispatch } from 'react-redux';
import { setToken, fetchMe } from '../../redux/reducers/userSlice';
import { FiMail, FiLock } from 'react-icons/fi';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      const token = res.data.token;
      const user = res.data.user;

      dispatch(setToken(token));
      await dispatch(fetchMe()).unwrap();

      if (user.isAdmin) {
        navigate('/admin/dashboard');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      alert('Giriş alınmadı');
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
              placeholder="Şifrə"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button}>Daxil ol</button>

          <p className={styles.linkText}>
            <Link to="/forgot-password">Şifrəni unutmusunuz?</Link>
          </p>
          <p className={styles.linkText}>
            Hesabınız yoxdur? <Link to="/register">Qeydiyyat</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
