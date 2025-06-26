import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/reducers/productSlice';
import styles from './AddProduct.module.css';
import { FaUpload, FaPlus, FaBox } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import API from '../../services/api';

const AddProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    images.forEach((img) => formData.append('image', img));

    try {
      await dispatch(createProduct(formData));
      navigate('/profile'); 
    } catch (err) {
      console.error('Add product error:', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2><FaPlus /> Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Product Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className={styles.uploadLabel}>
          <FaUpload /> Upload Images (max 10)
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImages([...e.target.files])}
          />
        </label>

        <div className={styles.preview}>
          {images.length > 0 && Array.from(images).map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className={styles.thumbnail}
            />
          ))}
        </div>

        <button type="submit" className={styles.button}>
          Share Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
