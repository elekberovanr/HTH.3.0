import React, { useEffect, useState } from 'react';
import styles from './ProductCard.module.css';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { addFavorite, removeFavorite, getFavorites } from '../../services/api';

const ProductCard = ({ product }) => {
  const user = useSelector(state => state.user.user);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user || !product?._id) return;
      try {
        const favorites = await getFavorites();
        const exists = favorites.some(f => f.product?._id === product._id);
        setIsFavorited(exists);
      } catch (err) {
        console.error('Favoritləri alma xətası:', err.message);
      }
    };
    checkFavorite();
  }, [product?._id, user]);

  const handleFavoriteClick = async () => {
    if (!user || !product?._id) return;
    try {
      if (isFavorited) {
        await removeFavorite(product._id);
        setIsFavorited(false);
      } else {
        try {
          await addFavorite(product._id);
          setIsFavorited(true);
        } catch (err) {
          if (err.response?.data?.message === 'Artıq favoritdə var') {
            setIsFavorited(true);
          } else {
            throw err;
          }
        }
      }
    } catch (err) {
      console.error('Favori xətası:', err.response?.data || err.message);
    }
  };

  if (!product) return null;

  return (
    <div className={styles.card}>
      <button className={styles.favoriteBtn} onClick={handleFavoriteClick}>
        {isFavorited ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>

      {product.user && (
        <Link to={`/user/${product.user._id}`} className={styles.userInfo}>
          {product.user.profileImage && (
            <img
              src={`http://localhost:5555/uploads/${product.user.profileImage}`}
              alt={product.user.name || 'User'}
              className={styles.profileImage}
            />
          )}
          <span className={styles.username}>
            {product.user.name || product.user.name || 'User'}
          </span>
        </Link>
      )}


      <div className={styles.imageWrapper}>
        <img
          src={`http://localhost:5555/uploads/${product.images?.[0]}`}
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
