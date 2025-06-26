import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router';
import API from '../../../services/api';
import styles from './ChatList.module.css';
import { toast } from 'react-toastify';
import { incrementUnread } from '../../../redux/reducers/chatSlice';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5555');

const ChatList = () => {
  const user = useSelector((state) => state.user.user);
  const [chats, setChats] = useState([]);
  const { id: activeChatId } = useParams();
  const dispatch = useDispatch();

  const fetchChats = async () => {
    if (!user?._id) return;
    const res = await API.get(`/chat/${user._id}`);
    setChats(res.data);
  };

  useEffect(() => {
    fetchChats();

    const handleUpdate = () => fetchChats();
    window.addEventListener('chatUpdate', handleUpdate);

    socket.on('newMessage', (msg) => {
      const isMine = msg?.sender?._id === user?._id;
      if (!isMine && msg.chat === activeChatId) return;

      dispatch(incrementUnread());

      // Əgər başqa bir istifadəçidəndirsə toast göstər
      if (!isMine) {
        toast.info(`📩 ${msg.sender?.username || msg.sender?.name || 'Yeni mesaj'}: ${msg.content}`, {
          position: 'top-right',
          autoClose: 2500,
        });
      }

      fetchChats(); // yenidən al chatları
    });

    return () => {
      window.removeEventListener('chatUpdate', handleUpdate);
      socket.off('newMessage');
    };
  }, [user, activeChatId]);


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
              <span className={styles.username}>
                {partner.username || partner.name || 'Anonim'}
              </span>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ChatList;
