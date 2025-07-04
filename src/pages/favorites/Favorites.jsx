import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, removeFromFavorites } from '../../redux/reducers/favoriteSlice';
import styles from './Favorites.module.css';
import ProductCard from '../../components/product/ProductCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';


const Favorites = () => {
  const dispatch = useDispatch();
  const { items: favorites, loading, error } = useSelector(state => state.favorites);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromFavorites(productId));
  };

  const filteredFavorites = favorites
    .filter(fav => fav.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()));

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

      {loading ? (
        <div className={styles.loadingWrapper}>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <p className={styles.error}>Failed to load: {error}</p>
      ) : filteredFavorites.length === 0 ? (
        <p className={styles.empty}>You haven't favorited any product yet.</p>
      ) : (
        <div className={styles.grid}>
          {filteredFavorites.map((fav) => (
            <div key={fav.product._id} className={styles.cardWrapper}>
              <ProductCard product={fav.product} onRemove={() => handleRemove(fav.product._id)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
