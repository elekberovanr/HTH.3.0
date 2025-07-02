import React, { useEffect, useState } from 'react';
import { getFavorites, removeFavorite } from '../../services/api';
import styles from './Favorites.module.css';
import ProductCard from '../../components/product/ProductCard';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await getFavorites();
      setFavorites(res);
    } catch (err) {
      console.error('Failed to load favorites:', err.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFavorite(productId);
      setFavorites(prev => prev.filter(fav => fav.product._id !== productId));
    } catch (err) {
      console.error('Failed to remove:', err.message);
    }
  };

  const filteredFavorites = favorites.filter(fav =>
    fav.product?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Favorites</h2>
        <span className={styles.counter}>{filteredFavorites.length} product(s)</span>
      </div>

      <input
        type="text"
        placeholder="Search by title..."
        className={styles.searchInput}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredFavorites.length === 0 ? (
        <p className={styles.empty}>You haven't favorited any product yet.</p>
      ) : (
        <div className={styles.grid}>
          {filteredFavorites.map((fav, idx) => (
            fav.product && (
              <div key={fav.product._id || idx} className={styles.cardWrapper}>
                <ProductCard product={fav.product} />
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
