import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './Login.module.css';
import API from '../../services/api';
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/reducers/userSlice';


function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      const token = res.data.token;
  
      dispatch(setToken(token)); // Redux + localStorage
      const userRes = await API.get('/auth/me'); // Tokenlə istifadəçi məlumatı
      dispatch(setUser(userRes.data)); // Redux state-ə yaz
  
      alert('Daxil oldun!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Xəta baş verdi');
    }
  };
  

  return (
    <div className={styles.container}>
      <h2>Giriş</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Şifrə" onChange={handleChange} required />
        <button type="submit">Daxil ol</button>
      </form>
    </div>
  );
}

export default Login;
