import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Register.module.css';
import API from '../../services/api';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      alert('Qeydiyyat uğurludur!');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Xəta baş verdi');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Qeydiyyat</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="İstifadəçi adı" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Şifrə" onChange={handleChange} required />
        <button type="submit">Qeydiyyatdan keç</button>
      </form>
    </div>
  );
}

export default Register;
