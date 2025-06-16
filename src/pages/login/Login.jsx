import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, fetchMe } from '../../redux/reducers/userSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5555/api/auth/login', { email, password });
      const token = res.data.token;
      await dispatch(setToken(token));
      await dispatch(fetchMe()).unwrap();
      navigate('/profile');

    } catch (err) {
      alert('Giriş alınmadı');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Giriş</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Daxil ol</button>
      <p style={{ marginTop: '10px' }}>
        <Link to="/forgot-password">Şifrəni unutmusunuz?</Link>
      </p>
    </form>
  );
};

export default Login;
