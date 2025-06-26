import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import styles from './EditProfile.module.css';
import { useNavigate } from 'react-router';

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    gender: '',
    birthday: '',
    profileImage: null,
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/auth/me');
        const user = res.data;

        setFormData({
          name: user.name || '',
          city: user.city || '',
          gender: user.gender || '',
          birthday: user.birthday ? user.birthday.slice(0, 10) : '',
          profileImage: null,
        });

        setPreview(user.profileImage ? `http://localhost:5555/uploads/${user.profileImage}` : null);
      } catch (err) {
        console.error('User fetch error:', err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, profileImage: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await API.put('/auth/me', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });


      navigate('/profile');
    } catch (err) {
      console.error('Profile update error:', err);
      alert('Profil yenilənmədi');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Profil Redaktəsi</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {preview && (
          <div className={styles.preview}>
            <img src={preview} alt="Profil şəkli" />
          </div>
        )}

        <input
          type="file"
          name="profileImage"
          accept="image/*"
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Adınız"
          required
        />

        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Şəhər"
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Cins seçin</option>
          <option value="male">Kişi</option>
          <option value="female">Qadın</option>
          <option value="other">Digər</option>
        </select>

        <input
          type="date"
          name="birthday"
          value={formData.birthday}
          onChange={handleChange}
        />

        <button type="submit" className={styles.button}>Yadda saxla</button>
      </form>
    </div>
  );
};

export default EditProfile;
