import React, { useState } from 'react';
import styles from './ProductCard.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router';

const ProductCard = ({ product }) => {
    const [isFavorited, setIsFavorited] = useState(false);

    const handleFavoriteClick = () => {
        setIsFavorited(prev => !prev);
    };

    return (
        <div className={styles.card}>
            <button className={styles.favoriteBtn} onClick={handleFavoriteClick}>
                {isFavorited ? <FaHeart /> : <FaRegHeart />}
            </button>

            {product.user && (
                <Link to={`/user/${product.user._id}`} className={styles.userInfo}> <img
                    src={`http://localhost:5555/uploads/${product.user.profileImage}`}
                    alt={product.user.username}
                    className={styles.profileImage}
                />
                    <span className={styles.username}>{product.user.username}</span></Link>
            )}

            <div className={styles.imageWrapper}>
                <img
                    src={`http://localhost:5555/uploads/${product.image}`}
                    alt={product.title}
                    className={styles.productImage}
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.description}>
                    {product.description?.slice(0, 80)}...
                </p>

                <Link to={`/product/${product._id}`} className={styles.readMore}>
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;
