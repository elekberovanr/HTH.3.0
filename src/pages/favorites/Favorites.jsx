import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../../services/api';
import styles from './Favorites.module.css';
import ProductCard from '../../components/product/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res);
    } catch (err) {
      console.error('Favoritləri yükləmə xətası:', err.message);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFavorite(productId);
      setFavorites(prev => prev.filter(fav => fav.product._id !== productId));
    } catch (err) {
      console.error('Silinmə xətası:', err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Favorit Məhsullar</h2>
      {favorites.length === 0 ? (
        <p>Heç bir məhsulu sevimli etməmisiniz.</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map(fav => (
            <div key={fav._id} className={styles.cardWrapper}>
              <ProductCard product={fav.product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
