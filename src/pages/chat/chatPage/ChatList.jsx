import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import API from '../../../services/api';
import styles from './ChatList.module.css';

const ChatList = () => {
  const user = useSelector((state) => state.user.user);
  const [chats, setChats] = useState([]);
  const { id: activeChatId } = useParams();

  useEffect(() => {
    if (!user?._id) return;
    const fetchChats = async () => {
      const res = await API.get(`/chat/${user._id}`);
      setChats(res.data);
    };
    fetchChats();
  }, [user]);

  const filteredChats = chats.filter(chat =>
    chat.participants?.some(p => p._id !== user._id)
  );

  return (
    <div className={styles.chatList}>
      <h3 className={styles.title}>Mesajlaşdıqlarım</h3>
      {filteredChats.length === 0 ? (
        <p className={styles.empty}>Hələ heç kimlə mesajlaşmamısınız.</p>
      ) : (
        filteredChats.map(chat => {
          const partner = chat.participants.find(p => p._id !== user._id);
          if (!partner) return null;

          const isActive = chat._id === activeChatId;

          return (
            <Link
              to={`/chat/${chat._id}`}
              key={chat._id}
              className={`${styles.chatItem} ${isActive ? styles.active : ''}`}
            >
              <img
                src={`http://localhost:5555/uploads/${partner.profileImage}`}
                alt={partner.username}
                className={styles.avatar}
              />
              <span className={styles.username}>{partner.username}</span>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChatList;
