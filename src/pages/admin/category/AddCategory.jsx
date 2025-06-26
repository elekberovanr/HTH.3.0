// src/pages/admin/categories/AddCategory.jsx
import React, { useEffect, useState } from 'react';
import styles from './AddCategory.module.css';
import axios from '../../../services/api';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Kateqoriyalar yüklənə bilmədi');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setLoading(true);
    try {
      if (editId) {
        await axios.put(`/categories/${editId}`, { name });
      } else {
        await axios.post('/categories', { name });
      }
      setName('');
      setEditId(null);
      fetchCategories();
    } catch (err) {
      alert('Kateqoriya əməliyyati ugursuz oldu');
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Silinsin?')) return;
    try {
      await axios.delete(`/categories/${id}`);
      fetchCategories();
    } catch (err) {
      alert('Kateqoriya silinmədi');
    }
  };

  const startEdit = (cat) => {
    setName(cat.name);
    setEditId(cat._id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Kateqoriyalar</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Fastfood"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.addBtn} disabled={loading}>
          {editId ? 'Yadda saxla' : 'Əlavə et'}
        </button>
      </form>

      <div className={styles.tableWrapper}>
        <ul className={styles.table}>
          <li className={styles.headerRow}>
            <span className={styles.colTitle}>Kateqoriya</span>
            <span className={styles.colActions}></span>
          </li>
          {categories.map((cat) => (
            <li key={cat._id} className={styles.row}>
              <span>{cat.name}</span>
              <span className={styles.actions}>
                <button onClick={() => startEdit(cat)} className={styles.iconBtn}><FiEdit3 /></button>
                <button onClick={() => handleDelete(cat._id)} className={styles.iconBtn}><FiTrash2 /></button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddCategory;
