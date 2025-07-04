import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../../services/api';
import ProductCard from '../../components/product/ProductCard';
import styles from './UserProfile.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChats, setSelectedChat } from '../../redux/reducers/chatSlice';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { BiCake, BiLocationPlus } from 'react-icons/bi';

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
        setError('User not found or network error.');
      }
    };

    const fetchUserProducts = async () => {
      try {
        const res = await API.get(`/products/user/${id}`);
        setUserProducts(res.data);
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    };

    fetchUser();
    fetchUserProducts();
  }, [id]);

  const handleStartChat = async () => {
    try {
      const res = await API.post('/chat', { receiverId: id });
      const chatId = res.data._id;

      const chatDetail = await API.get(`/chat/chat-info/${chatId}`);
      dispatch(fetchChats(user._id));
      dispatch(setSelectedChat(chatDetail.data));
      navigate(`/chat/${chatId}`);
    } catch (err) {
      alert('Failed to start chat');
    }
  };

  if (error) return <p className={styles.error}>{error}</p>;
  if (!profileUser) return <LoadingSpinner />;

  return (
    <div className={styles.container}>
      <div className={styles.bannerWrapper}>
        <img
          src={`http://localhost:5555/uploads/${profileUser.bannerImage || 'default-banner.jpg'}`}
          alt="Banner"
          className={styles.banner}
        />
      </div>

      <div className={styles.profileSection}>
        <img
          src={`http://localhost:5555/uploads/${profileUser.profileImage}`}
          alt="Profile"
          className={styles.avatar}
        />
        <div className={styles.details}>
          <h2>{profileUser.username}</h2>
          <p>{profileUser.email}</p>
          <p><BiLocationPlus/> {profileUser.city}</p>
          <p>⚧ {profileUser.gender}</p>
          <p><BiCake/> {new Date(profileUser.birthday).toLocaleDateString()}</p>
          <button className={styles.chatButton} onClick={handleStartChat}>
            Message
          </button>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Shared Products</h3>
      <div className={styles.productList}>
        {userProducts.length > 0 ? (
          userProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className={styles.noProducts}>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
