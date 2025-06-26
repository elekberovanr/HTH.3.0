// src/pages/admin/products/AdminProducts.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
} from '../../../redux/reducers/productSlice';
import axios from '../../../services/api';
import styles from './AdminProducts.module.css';
import { FiEdit3, FiTrash2, FiSave } from 'react-icons/fi';

const AdminProducts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [categories, setCategories] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: '', description: '', category: '' });
  const [filterEmail, setFilterEmail] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    fetchCategories();
  }, [dispatch]);

  const fetchCategories = async () => {
    const res = await axios.get('/categories');
    setCategories(res.data);
  };

  const handleDelete = (id) => {
    if (window.confirm("Məhsul silinsin?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setEditData({
      title: product.title,
      description: product.description,
      category: product.category?._id || product.category
    });
  };

  const handleSave = () => {
    dispatch(updateProduct({ id: editId, updatedData: editData }));
    setEditId(null);
    setEditData({ title: '', description: '', category: '' });
  };

  const filteredProducts = products.filter(p =>
    (!filterEmail || p.user?.email?.includes(filterEmail)) &&
    (!filterCategory || p.category === filterCategory || p.category?._id === filterCategory)
  );

  return (
    <div className={styles.container}>
      <h2>Admin - Məhsullar</h2>

      <div className={styles.filterBar}>
        <input
          type="text"
          placeholder="Email ilə axtar"
          value={filterEmail}
          onChange={(e) => setFilterEmail(e.target.value)}
        />
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="">Bütün kateqoriyalar</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Şəkil</th>
            <th>Başlıq</th>
            <th>Təsvir</th>
            <th>Email</th>
            <th>Kateqoriya</th>
            <th>Əməliyyatlar</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product._id}>
              <td>
                <img src={`http://localhost:5555/${product.image}`} alt="product" />
              </td>
              {editId === product._id ? (
                <>
                  <td>
                    <input
                      type="text"
                      value={editData.title}
                      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editData.description}
                      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                    />
                  </td>
                  <td>{product.user?.email || '-'}</td>
                  <td>
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                    >
                      <option value="">Seç</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                  </td>
                  <td className={styles.actions}>
                    <button onClick={handleSave}><FiSave /></button>
                  </td>
                </>
              ) : (
                <>
                  <td>{product.title}</td>
                  <td>{product.description}</td>
                  <td>{product.user?.email || '-'}</td>
                  <td>{product.category?.name || '-'}</td>
                  <td className={styles.actions}>
                    <button onClick={() => handleEdit(product)}><FiEdit3 /></button>
                    <button onClick={() => handleDelete(product._id)}><FiTrash2 /></button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
