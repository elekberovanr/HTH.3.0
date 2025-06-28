import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import ProductCard from '../../components/product/ProductCard';
import styles from './UserProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, setSelectedChat } from '../../redux/reducers/chatSlice';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatList } = useSelector(state => state.chat);
  const user = useSelector(state => state.user.user);
  const [profileUser, setProfileUser] = useState(null);
  const [userProducts, setUserProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setProfileUser(res.data);
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
    const res = await API.post('/chat', { receiverId: id }); // chat yaradıldı
    const chatId = res.data._id;
    
    const chatDetail = await API.get(`/chat/chat-info/${chatId}`); // tam chat məlumatı al
    dispatch(fetchChats(user._id));
    dispatch(setSelectedChat(chatDetail.data)); // tam məlumatla Redux-a set et

    navigate(`/chat/${chatId}`);
  } catch (err) {
    alert('Chat başlatmaq mümkün olmadı');
    console.error(err);
  }
};


  if (error) return <p className={styles.error}>{error}</p>;
  if (!profileUser) return <p className={styles.loading}>Yüklənir...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img
          src={`http://localhost:5555/uploads/${profileUser.profileImage}`}
          alt="Profil"
          className={styles.avatar}
        />
        <div className={styles.details}>
          <h2>{profileUser.username}</h2>
          <p><strong>Şəhər:</strong> {profileUser.city}</p>
          <p><strong>Cins:</strong> {profileUser.gender}</p>
          <p><strong>Doğum tarixi:</strong> {new Date(profileUser.birthday).toLocaleDateString()}</p>
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
