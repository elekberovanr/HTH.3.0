import React, { useEffect, useState } from 'react';
import API from '../../../services/api';
import styles from './MyProducts.module.css';
import { Link, useNavigate } from 'react-router';
import { FiTrash2, FiEdit } from 'react-icons/fi';

const MyProducts = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await API.get('/products/my/products');
                setProducts(res.data || []);
            } catch (err) {
                console.error('Məhsullar alınmadı:', err);
            }
        };
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Bu məhsulu silmək istəyirsən?')) {
            try {
                await API.delete(`/products/${id}`);
                setProducts((prev) => prev.filter((p) => p._id !== id));
            } catch (err) {
                console.error('Silinmə xətası:', err);
            }
        }
    };

    const handleEdit = (id) => {
        navigate(`/product/edit/${id}`);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>Mənim Məhsullarım</h3>
            <div className={styles.grid}>
                {products.map((product) => (
                    <div key={product._id} className={styles.card}>
                        <img
                            src={`http://localhost:5555/uploads/${product.image}`}
                            alt={product.title}
                            className={styles.image}
                        />
                        <div className={styles.content}>
                            <h4>{product.title}</h4>
                            <p>{product.description?.slice(0, 50)}...</p>

                            <div className={styles.icons}>
                                <Link to={`/profile/edit/${product._id}`}>
                                    <FiEdit
                                        className={styles.editIcon}
                                        onClick={() => handleEdit(product._id)}
                                        title="Redaktə et"
                                    /></Link>
                                <FiTrash2
                                    className={styles.deleteIcon}
                                    onClick={() => handleDelete(product._id)}
                                    title="Sil"
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProducts;
