import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';
import API from '../../../services/api';

const ChatPage = () => {
  const user = useSelector((state) => state.user.user);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;
    const fetchChats = async () => {
      try {
        const res = await API.get(`/chat/${user._id}`);
        setChats(res.data);
      } catch (err) {
        console.error('Chat listi alınmadı:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchChats();
  }, [user]);

  if (!user) return <p>İstifadəçi yüklənir...</p>;
  if (loading) return <p>Yüklənir...</p>;

  const filteredChats = chats.filter(chat =>
    chat.participants && chat.participants.some(p => p._id !== user._id)
  );

  return (
    <div>
      <h2>Mesajlaşdıqlarım</h2>
      {filteredChats.length === 0 ? (
        <p>Hələ heç kimlə mesajlaşmamısınız.</p>
      ) : (
        filteredChats.map(chat => {
          const partner = chat.participants.find(p => p._id !== user._id);
          if (!partner) return null;

          return (
            <Link key={chat._id} to={`/chat/${chat._id}`}>
              <div style={{ marginBottom: '12px', borderBottom: '1px solid #ccc', padding: '10px 0' }}>
                <img
                  src={`http://localhost:5555/uploads/${partner.profileImage}`}
                  alt="profil"
                  width="40"
                  style={{ borderRadius: '50%' }}
                />
                <span style={{ marginLeft: '10px' }}>{partner.username}</span>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChatPage;
