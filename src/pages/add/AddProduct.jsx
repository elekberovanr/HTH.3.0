import { useState } from 'react';
import API from '../../services/api';
import { useNavigate } from 'react-router';
import styles from './AddProduct.module.css';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      if (image) formData.append('image', image);

      await API.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      alert('Məhsul əlavə olundu!');
      navigate('/profile');
    } catch (err) {
      alert(err.response?.data?.error || 'Xəta baş verdi');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Məhsul Əlavə Et</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Başlıq"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          accept="image/*"
        />
        <button type="submit">Əlavə et</button>
      </form>
    </div>
  );
}

export default AddProduct;
