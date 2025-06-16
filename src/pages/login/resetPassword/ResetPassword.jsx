import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Emaili localStorage-dan oxu
  useEffect(() => {
    const savedEmail = localStorage.getItem('resetEmail');
    if (savedEmail) setEmail(savedEmail);
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/api/auth/reset-password', {
        email,
        code,
        newPassword,
      });
      alert('Şifrə uğurla yeniləndi!');
      localStorage.removeItem('resetEmail');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Yenilənmə zamanı xəta baş verdi');
    }
  };

  return (
    <div>
      <h2>Şifrəni Yenilə</h2>
      <form onSubmit={handleReset}>
        <input type="email" value={email} disabled />
        <input
          type="text"
          placeholder="Kod"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Yeni şifrə"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Yenilə</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
