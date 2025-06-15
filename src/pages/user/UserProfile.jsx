import { useParams, useNavigate } from 'react-router'; 
import { useEffect, useState } from 'react';
import API from '../../services/api';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error('Profil tapılmadı:', err);
        setError('İstifadəçi tapılmadı və ya bağlantı xətası.');
      }
    };
    fetchUser();
  }, [id]);

  const handleStartChat = async () => {
    try {
      const res = await API.post('/chat', { receiverId: id });
      navigate(`/chat/${res.data._id}`);
    } catch (err) {
      console.error('Chat başlatma xətası:', err);
      alert('Chat başlatmaq mümkün olmadı');
    }
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Yüklənir...</p>;

  return (
    <div>
      <h2>{user.username}</h2>
      {user.profileImage && (
        <img
          src={`http://localhost:5555/uploads/${user.profileImage}`}
          alt="Profil"
          width="100"
          style={{ borderRadius: '50%' }}
        />
      )}
      <p>{user.email}</p>
      <button onClick={handleStartChat}>Mesaj göndər</button>
    </div>
  );
};

export default UserProfile;
