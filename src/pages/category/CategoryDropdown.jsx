import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CategoryDropdown.module.css';
import { fetchCategories } from '../../redux/reducers/categorySlice';
import { setSelectedCategory } from '../../redux/reducers/filterSlice';
import { useNavigate } from 'react-router-dom';

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: categories, loading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleClick = (name) => {
    dispatch(setSelectedCategory(name));
    navigate('/search');
  };

  return (
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
  );
};

export default CategoryDropdown;
