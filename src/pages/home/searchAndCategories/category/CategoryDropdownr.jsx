import React, { useEffect, useState } from 'react';
import styles from './CategoryDropdown.module.css';
import axios from 'axios';
import { BiCategory, BiCategoryAlt } from 'react-icons/bi';
import { MdCategory } from 'react-icons/md';

const CategoryDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories')
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.categories || []; // ⚠️ JSON quruluşuna uyğunlaşdırırıq
        setCategories(data);
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
      });
  }, []);

  const handleClick = (name) => {
    localStorage.setItem('selectedCategory', name);
    window.location.reload(); // (əgər istəsən) Products komponentini refresh etmək üçün
  };

  return (
    <div className={styles.dropdownWrapper}>
      <div className={styles.label}> <BiCategory/>Categories</div>
      <div className={styles.dropdown}>
        <div className={styles.item} onClick={() => handleClick('')}>
          All
        </div>
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
