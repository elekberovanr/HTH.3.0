import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './SearchPage.module.css';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ProductCard from '../../components/product/ProductCard';
import SearchBar from '../../components/search/SearchBar';
import CategoryDropdown from '../category/CategoryDropdown';
import { fetchProducts } from '../../redux/reducers/productSlice';

const SearchPage = () => {
  const dispatch = useDispatch();
  const { items: allProducts, loading } = useSelector((state) => state.products);
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const selectedCategory = useSelector((state) => state.filters.selectedCategory);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let filtered = allProducts;

    if (selectedCategory) {
      filtered = filtered.filter(
        (p) => p.category?.name?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, allProducts]);

  return (
    <div className={styles.searchPage}>
      <h2 className={styles.title}>Search Results</h2>
      <div className={styles.controls}>
        <CategoryDropdown />
        <SearchBar />
      </div>

      {loading ? (
        <div className={styles.spinnerWrapper}>
          <LoadingSpinner />
        </div>
      ) : filteredProducts.length === 0 ? (
        <p className={styles.noResults}>No products found.</p>
      ) : (
        <div className={styles.grid}>
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
