import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../components/product/ProductCard';
import { fetchProducts } from '../../../redux/reducers/productSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { items: products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
export default Products;
