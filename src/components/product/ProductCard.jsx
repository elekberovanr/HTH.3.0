import React from 'react';
import styles from './ProductCard.module.css';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    return (
        <div className={styles.card}>
            {/* Məhsul şəkli */}
            {product.image && (
                <img
                    className={styles.productImage}
                    src={`http://localhost:5555/uploads/${product.image}`}
                    alt={product.title}
                />
            )}

            {/* Məhsul başlığı və təsviri */}
            <div className={styles.details}>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
            </div>

            {/* Göndərən istifadəçi */}
            {product.user && (
                <div className={styles.userInfo}>
                    <Link to={`/user/${product.user._id}`} className={styles.link}>
                        <img
                            className={styles.profileImage}
                            src={`http://localhost:5555/uploads/${product.user.profileImage}`}
                            alt={product.user.username}
                        />
                        <span>{product.user.username}</span>
                    </Link>
                </div>
            )}

        </div>
    );
};

export default ProductCard;
