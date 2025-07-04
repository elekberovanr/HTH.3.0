import React, { useEffect, useState } from 'react';
import styles from './CategoriesSection.module.css';
import { fetchCategories } from '../../../services/api';
import { FaTags } from 'react-icons/fa';
import LoadingSpinner from '../../../components/common/LoadingSpinner';
import { useDispatch } from 'react-redux';
import { setSelectedCategory, setSearchTerm } from '../../../redux/reducers/filterSlice';
import { useNavigate } from 'react-router-dom';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchCategories();
        const valid = Array.isArray(data.categories) ? data.categories : data;
        setCategories(valid);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleClick = (categoryName) => {
    dispatch(setSelectedCategory(categoryName));
    dispatch(setSearchTerm('')); // Optional: boş axtarış
    navigate('/search');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className={styles.categoriesSection}>
      <h2 className={styles.heading}>Explore Categories</h2>
      <div className={styles.categoryList}>
        <button className={styles.card} onClick={() => handleClick('')}>
          <span className={styles.icon}><FaTags /></span>
          <span className={styles.name}>All</span>
        </button>
        {categories.map((cat) => (
          <button
            key={cat._id}
            className={styles.card}
            onClick={() => handleClick(cat.name)}
          >
            <span className={styles.icon}><FaTags /></span>
            <span className={styles.name}>{cat.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
