import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import API from '../../../services/api';
import styles from './EditProduct.module.css';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
  });
  const [preview, setPreview] = useState('');
  const [file, setFile] = useState(null);

  // ✅ Mehsulun məlumatlarını çək
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await API.get(`/products/${id}`);
        const data = res.data;
        setProduct({
          title: data.title,
          description: data.description,
          category: data.category,
        });
        setPreview(`http://localhost:5555/uploads/${data.image}`);
      } catch (err) {
        console.error('Product fetch error:', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', product.title);
      formData.append('description', product.description);
      formData.append('category', product.category);
      if (file) {
        formData.append('image', file);
      }

      await API.put(`/products/${id}`, formData);
      navigate('/profile'); // və ya istədiyin səhifəyə yönləndir
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Title"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className={styles.textarea}
          rows="4"
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          className={styles.input}
          placeholder="Category"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.fileInput}
        />

        {preview && <img src={preview} alt="Preview" className={styles.preview} />}

        <button type="submit" className={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
