import React from 'react';
import styles from './SearchAndCategories.module.css';
import CategoryDropdown from './category/CategoryDropdownr';
import SearchBar from './search/SearchBar';

const SearchAndCategories = () => {
  return (
    <div className={styles.container}>
      <CategoryDropdown />
      <SearchBar />
    </div>
  );
};

export default SearchAndCategories;
