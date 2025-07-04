import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from '../../redux/reducers/productSlice';
import styles from './AddProduct.module.css';
import { FaUpload, FaPlus, FaTimes } from 'react-icons/fa';
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

  const handleImageChange = (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length + images.length > 10) return;
    setImages([...images, ...selected]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

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

  const handleCancel = () => {
    navigate('/profile');
  };

  return (
    <div className={styles.productPage}>
      <div className={styles.left}>
        <label className={styles.imageUploadArea}>
          {images[0] ? (
            <img src={URL.createObjectURL(images[0])} alt="main" />
          ) : (
            <div className={styles.placeholder}>
              <FaUpload size={48} />
              <p>Upload Product Images</p>
            </div>
          )}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>

        <div className={styles.thumbnailRow}>
          {images.map((img, idx) => (
            <div key={idx} className={styles.thumbWrapper}>
              <img
                src={URL.createObjectURL(img)}
                alt={`thumb-${idx}`}
                className={styles.thumb}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeImage(idx)}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
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

          <div className={styles.buttons}>
            <button type="submit" className={styles.submitBtn}>Submit</button>
            <button type="button" onClick={handleCancel} className={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
