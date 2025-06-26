import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CategoryDropdown.module.css';
import { BiCategory } from 'react-icons/bi';
import { fetchCategories } from '../../../../redux/reducers/categorySlice';
import { setSelectedCategory } from '../../../../redux/reducers/filterSlice';
import { fetchProductsByCategory, fetchProducts } from '../../../../redux/reducers/productSlice';

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const { list: categories, loading, error } = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClick = (name) => {
    dispatch(setSelectedCategory(name));
    if (name) {
      dispatch(fetchProductsByCategory(name));
    } else {
      dispatch(fetchProducts());
    }
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta baş verdi: {error}</p>;

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.label}><BiCategory /> Categories</div>
      <div className={styles.dropdown}>
        <div className={styles.item} onClick={() => handleClick('')}>All</div>
        {categories.map((cat) => (
          <div
            key={cat._id}
            className={styles.item}
            onClick={() => handleClick(cat.name)}
          >
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryDropdown;
