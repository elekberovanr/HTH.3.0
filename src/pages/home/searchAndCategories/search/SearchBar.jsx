import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchBar.module.css';
import { setSearchTerm } from '../../../../redux/reducers/filterSlice';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder=" Search products..."
        className={styles.input}
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      <div className={styles.icon}>
        <BiSearch />
      </div>
    </div>
  );
};

export default SearchBar;
