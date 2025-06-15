import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, updateProduct } from '../../../redux/reducers/productSlice';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.items);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const prod = products.find(p => p._id === id);
    if (prod) {
      setTitle(prod.title);
      setDescription(prod.description || '');
      setCategory(prod.category || '');
    }
  }, [products, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    if (image) formData.append('image', image);
    await dispatch(updateProduct({ id, data: formData }));
    navigate('/profile');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Yenilə</button>
    </form>
  );
}
export default EditProduct;
