import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../../../components/product/ProductCard';
import styles from './Products.module.css';

const Products = () => {
  const allProducts = useSelector((state) => state.products.items); // redux-dan
  const searchTerm = useSelector((state) => state.filters.searchTerm.toLowerCase());
  const selectedCategory = useSelector((state) => state.filters.selectedCategory);

  const filtered = allProducts.filter((product) => {
    const title = (product.title || '').toLowerCase();
    const desc = (product.description || '').toLowerCase();
    const matchSearch = title.includes(searchTerm) || desc.includes(searchTerm);

    const matchCategory = selectedCategory
      ? product.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      : true;

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
