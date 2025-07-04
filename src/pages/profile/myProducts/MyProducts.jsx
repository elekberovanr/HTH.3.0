import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import styles from './MyProducts.module.css';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';
import { BiPencil } from 'react-icons/bi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Delete from '../../../components/delete/Delete';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../../components/common/LoadingSpinner';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await API.get('/products/my/products');
        setProducts(res.data || []);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const askDelete = (id) => {
    setToDeleteId(id);
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/products/${toDeleteId}`);
      setProducts((prev) => prev.filter((p) => p._id !== toDeleteId));
      toast.success('Product deleted successfully!', { autoClose: 2000 });
    } catch (err) {
      toast.error('Failed to delete the product.');
      console.error('Delete error:', err);
    } finally {
      setShowDialog(false);
      setToDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setToDeleteId(null);
  };

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`}>
      {loading ? (
        <div className={styles.spinnerWrapper}><LoadingSpinner /></div>
      ) : (
        <div className={styles.grid}>
          {products.length === 0 ? (
            <p className={styles.empty}>No product yet...</p>
          ) : (
            products.map((product) => (
              <div key={product._id} className={styles.card}>
                <img
                  src={`http://localhost:5555/uploads/${product.images?.[0] || product.image}`}
                  alt={product.title}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <span className={styles.productTitle}>{product.title}</span>
                  <p className={styles.desc}>{product.description?.slice(0, 60)}...</p>
                  <div className={styles.actions}>
                    <Link to={`/profile/edit/${product._id}`} className={styles.editBtn}>
                      <BiPencil /> Edit
                    </Link>
                    <Link to={`/product/${product._id}`} className={styles.editBtn}>
                      Read more..
                    </Link>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => askDelete(product._id)}
                      title="Delete product"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <Delete isOpen={showDialog} onConfirm={confirmDelete} onCancel={cancelDelete} />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default MyProducts;
