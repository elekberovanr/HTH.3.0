import React, { useEffect, useRef, useState } from 'react';
import styles from './UserSupport.module.css';
import API from '../../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaImage } from 'react-icons/fa';
import { addMessage, incrementUnread } from '../../../redux/reducers/chatSlice';

const socket = io('http://localhost:5555/support');

const UserSupport = () => {
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    if (!user?._id) return;

    socket.emit('registerSupportUser', user._id);
    fetchMessages();

    socket.on('newMessage', (message) => {
      const isMine = message.sender === user._id || message.sender?._id === user._id;
      const isForMe = message.receiver === user._id || message.receiver?._id === user._id;

      if (isMine || isForMe) {
        setMessages(prev => [...prev, message]);
        dispatch(addMessage(message));
      }

      // 🔔 Yalnız MƏNƏ gələn mesajda bildiriş artır
      if (isForMe && !isMine) {
        dispatch(incrementUnread({ chatId: message.sender._id || message.sender }));
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [user, dispatch]);

  const fetchMessages = async () => {
    try {
      const res = await API.get('/support/user');
      setMessages(res.data);
    } catch (err) {
      console.error('Mesajlar alınmadı:', err);
    }
  };

  const handleSend = async () => {
    if (!msg && !file) return;
    const formData = new FormData();
    formData.append('content', msg);
    if (file) formData.append('image', file);

    try {
      const res = await API.post('/support', formData);
      setMessages(prev => [...prev, res.data]);
      setMsg('');
      setFile(null);
    } catch (err) {
      console.error('Göndərmə xətası:', err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.adminInfo}>
          <img className={styles.avatar} src="/admin-avatar.png" alt="Admin" />
          <span className={styles.name}>Admin dəstəyi</span>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={m.sender === user._id ? styles.userMessage : styles.adminMessage}
          >
            {m.image && (
              <img
                className={styles.image}
                src={`http://localhost:5555/uploads/${m.image}`}
                alt="img"
              />
            )}
            {m.content && <div className={styles.bubble}>{m.content}</div>}
            <div className={styles.time}>
              {new Date(m.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Mesaj yazın..."
          className={styles.input}
        />
        <label className={styles.imageLabel}>
          <FaImage />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <button className={styles.sendButton} onClick={handleSend}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default UserSupport;
