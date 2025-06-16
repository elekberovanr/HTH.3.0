import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    birthday: '',
    gender: '',
    city: '',
    profileImage: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    setForm(prev => ({ ...prev, profileImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post('http://localhost:5555/api/auth/register', formData);
      alert('Qeydiyyat uğurla tamamlandı');
    } catch (err) {
      alert('Xəta baş verdi');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Ad" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Şifrə" onChange={handleChange} />
      <input type="date" name="birthday" onChange={handleChange} />
      <select name="gender" onChange={handleChange}>
        <option value="">Cins</option>
        <option value="male">Kişi</option>
        <option value="female">Qadın</option>
        <option value="none">None</option>
      </select>
      <input type="text" name="city" placeholder="Şəhər" onChange={handleChange} />
      <input type="file" name="profileImage" onChange={handleFile} />
      <button type="submit">Qeydiyyat</button>
    </form>
  );
};

export default Register;
