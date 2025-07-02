import React, { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import styles from './LikeButton.module.css';
import { getFavorites, addFavorite, removeFavorite } from '../../services/api';
import { useSelector } from 'react-redux';

const LikeButton = ({ productId }) => {
  const user = useSelector((state) => state.user.user);
  const [isFavorited, setIsFavorited] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !productId) return;
      try {
        const res = await getFavorites();
        const exists = res.some(f => f.product?._id === productId);
        setIsFavorited(exists);
      } catch (err) {
        console.error('Favorite fetch error:', err);
      }
    };
    fetchFavorites();
  }, [productId, user]);

  const handleClick = async () => {
    if (!user) return;

    try {
      if (isFavorited) {
        await removeFavorite(productId);
        setIsFavorited(false);
      } else {
        await addFavorite(productId);
        setIsFavorited(true);
        setAnimate(true);
        setTimeout(() => setAnimate(false), 500); // animation duration
      }
    } catch (err) {
      console.error('Favorite toggle error:', err);
    }
  };

  return (
    <button className={`${styles.heartBtn} ${animate ? styles.animate : ''}`} onClick={handleClick}>
      {isFavorited ? <FaHeart className={styles.filled} /> : <FaRegHeart />}
    </button>
  );
};

export default LikeButton;
