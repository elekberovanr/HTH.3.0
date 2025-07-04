import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../../redux/reducers/productSlice';
import ProductCard from '../../../components/product/ProductCard';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import styles from './Products.module.css';

const Products = () => {
  const dispatch = useDispatch();
  const { loading, items: products, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ color: 'red', textAlign: 'center' }}>Error: {error}</p>;
  if (!products || products.length === 0) return <p style={{ textAlign: 'center' }}>No products found.</p>;

  return (
    <div className={styles.all}>
      <div className={styles.gridContainer}>
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>

  );
};

export default Products;
