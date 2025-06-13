import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Products.module.css';
import { fetchProducts } from '../../../redux/reducers/productSlice';

function Products() {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p>Xəta: {error}</p>;

  return (
    <div className={styles.grid}>
      {products.map((item) => (
        <div key={item._id} className={styles.card}>
          <img src={`http://localhost:5555/uploads/${item.image}`} alt={item.title} />
          <h4>{item.title}</h4>
        </div>
      ))}
    </div>
  );
}

export default Products;
