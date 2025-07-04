import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../redux/reducers/filterSlice';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';
import { FiSearch } from 'react-icons/fi';

const SearchBar = () => {
  const [term, setTerm] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(term));
    navigate('/search');
  };

  return (
    <form onSubmit={handleSearch} className={styles.searchBar}>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search products..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        <FiSearch />
      </button>
    </form>
  );
};

export default SearchBar;
