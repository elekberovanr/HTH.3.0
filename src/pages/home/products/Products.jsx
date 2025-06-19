import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../../components/product/ProductCard';
import styles from './Products.module.css';
import API from '../../../services/api';

const Products = () => {
  const [products, setProducts] = useState([]);

  const searchTerm = useSelector((state) => state.filters.searchTerm.toLowerCase());
  const selectedCategory = useSelector((state) => state.filters.selectedCategory);

  useEffect(() => {
    API.get('/products')
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.products || [];
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]);
      });
  }, []);

  const filtered = products.filter((product) => {
    const title = (product.title || '').toLowerCase();
    const desc = (product.description || '').toLowerCase();
    const matchSearch = title.includes(searchTerm) || desc.includes(searchTerm);
    const matchCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className={styles.gridContainer}>
      {filtered.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
