import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './CategoryDropdown.module.css';
import { fetchCategories } from '../../redux/reducers/categorySlice';
import { setSelectedCategory } from '../../redux/reducers/filterSlice';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';

const CategoryDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: categories } = useSelector((state) => state.categories);
  const selected = useSelector((state) => state.filters.selectedCategory);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleSelect = (name) => {
    dispatch(setSelectedCategory(name));
    navigate('/search');
    setOpen(false);
  };

  return (
    <div className={styles.dropdownContainer}>
      <div className={styles.dropdownHeader} onClick={() => setOpen(!open)}>
        {selected || 'All Categories'}
        <MdKeyboardArrowDown className={styles.icon} />
      </div>

      {open && (
        <div className={styles.dropdownList}>
          <div
            className={`${styles.item} ${!selected && styles.active}`}
            onClick={() => handleSelect('')}
          >
            All Categories
          </div>
          {categories.map((cat) => (
            <div
              key={cat._id}
              className={`${styles.item} ${selected === cat.name && styles.active}`}
              onClick={() => handleSelect(cat.name)}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryDropdown;
