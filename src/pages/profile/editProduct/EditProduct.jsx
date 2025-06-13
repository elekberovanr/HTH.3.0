import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import API from '../../../services/api';


function EditProduct() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await API.get(`/products/my/products`);
      const prod = res.data.find((p) => p._id === id);
      if (prod) setTitle(prod.title);
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      if (image) formData.append('image', image);
      await API.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Redaktə olundu!');
      navigate('/profile');
    } catch (err) {
      alert('Xəta baş verdi');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Məhsulu Redaktə Et</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <button type="submit">Yadda saxla</button>
    </form>
  );
}

export default EditProduct;
