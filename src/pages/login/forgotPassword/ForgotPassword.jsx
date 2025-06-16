import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5555/api/auth/forgot-password', { email });
      // Email-i yönləndirmə zamanı ötürmək üçün localStorage-da saxlayırıq (və ya context, state ilə ötürə bilərik)
      localStorage.setItem('resetEmail', email);
      navigate('/reset-password');
    } catch (err) {
      setError(err.response?.data?.error || 'Kod göndərilə bilmədi');
    }
  };

  return (
    <div>
      <h2>Şifrəni Unutmusan?</h2>
      <form onSubmit={handleSendCode}>
        <input
          type="email"
          placeholder="Emaili daxil edin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Kod Göndər</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
