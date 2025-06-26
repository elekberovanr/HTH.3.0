import { useParams, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import ProductCard from '../../components/product/ProductCard';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        setError('İstifadəçi tapılmadı və ya bağlantı xətası.');
      }
    };

    const fetchUserProducts = async () => {
      try {
        const res = await API.get(`/products/user/${id}`);
        setUserProducts(res.data);
      } catch (err) {
        console.error('Məhsullar alınmadı:', err);
      }
    };

    fetchUser();
    fetchUserProducts();
  }, [id]);

  const handleStartChat = async () => {
    try {
      const res = await API.post('/chat', { receiverId: id });
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      alert('Chat başlatmaq mümkün olmadı');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!user) return <p className={styles.loading}>Yüklənir...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img
          src={`http://localhost:5555/uploads/${user.profileImage}`}
          alt="Profil"
          className={styles.avatar}
        />
        <div className={styles.details}>
          <h2>{user.username}</h2>
          <p><strong>Şəhər:</strong> {user.city}</p>
          <p><strong>Cins:</strong> {user.gender}</p>
          <p><strong>Doğum tarixi:</strong> {new Date(user.birthday).toLocaleDateString()}</p>
          <button className={styles.chatButton} onClick={handleStartChat}>
            Mesaj göndər
          </button>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Paylaşılan Məhsullar</h3>
      <div className={styles.productList}>
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className={styles.noProducts}>Bu istifadəçinin məhsulu yoxdur.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
