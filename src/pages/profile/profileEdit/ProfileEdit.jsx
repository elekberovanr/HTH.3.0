import { useState } from 'react';
import styles from './ProfileEdit.module.css';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/reducers/userSlice';
import API from '../../../services/api';

function ProfileEdit() {
  const user = useSelector((state) => state.user.user);
  const [form, setForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
    gender: user?.gender || '',
    birthday: user?.birthday?.slice(0, 10) || '',
    stylePreference: user?.stylePreference || '',
  });
  const [profileImage, setProfileImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }

      const res = await API.put('/auth/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      dispatch(setUser(res.data));
      alert('Profil yeniləndi');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Xəta baş verdi');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Profil Məlumatlarını Dəyiş</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" value={form.username} onChange={handleChange} placeholder="Ad" required />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input type="date" name="birthday" value={form.birthday} onChange={handleChange} />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="">Cins seçin</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
        <button type="submit">Yadda saxla</button>
      </form>
    </div>
  );
}

export default ProfileEdit;
