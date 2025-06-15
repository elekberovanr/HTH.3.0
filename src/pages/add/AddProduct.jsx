import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createProduct } from '../../redux/reducers/productSlice';
import styles from './AddProduct.module.css';

function AddProduct() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (image) formData.append('image', image);
    await dispatch(createProduct(formData));
    navigate('/profile');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Başlıq" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Təsvir" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Kateqoriya" value={category} onChange={(e) => setCategory(e.target.value)} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit">Əlavə et</button>
      </form>
    </div>
  );
}
export default AddProduct;
