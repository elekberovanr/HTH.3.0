import React, { useState } from 'react';
import styles from './Register.module.css';
import { FiUser, FiMail, FiLock, FiCalendar, FiMapPin, FiImage } from 'react-icons/fi';
import { BsGenderAmbiguous } from 'react-icons/bs';
import API from '../../services/api';
import { useNavigate } from 'react-router';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
    city: '',
    profileImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({ ...prev, profileImage: e.target.files[0] }));
  };
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  for (const key in form) {
    if (form[key]) {
      formData.append(key, form[key]);
    }
  }

  try {
    await API.post('/auth/register', formData);
    alert('✅ Qeydiyyat uğurla tamamlandı');
    navigate('/login');
  } catch (err) {
    console.error('Xəta:', err.response?.data || err.message);
    alert('❌ Qeydiyyat zamanı xəta baş verdi');
  }
};


  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <FiUser className={styles.icon} />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <FiMail className={styles.icon} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.icon} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <FiCalendar className={styles.icon} />
            <input type="date" name="birthday" onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <BsGenderAmbiguous className={styles.icon} />
            <select name="gender" onChange={handleChange} required>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="none">None</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <FiMapPin className={styles.icon} />
            <input type="text" name="city" placeholder="City" onChange={handleChange} required />
          </div>

          <div className={styles.inputGroup}>
            <FiImage className={styles.icon} />
            <input type="file" name="profileImage" onChange={handleFile} accept="image/*" />
          </div>

          <button type="submit" className={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
