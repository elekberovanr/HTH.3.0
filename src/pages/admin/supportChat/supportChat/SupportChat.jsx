import React, { useEffect, useState, useRef } from 'react';
import styles from './SupportChat.module.css';
import { FaPaperPlane, FaImage } from 'react-icons/fa';
import API from '../../../../services/api';
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { addMessage, incrementUnread, markChatAsRead } from '../../../../redux/reducers/chatSlice';

const socket = io('http://localhost:5555/support');

const SupportChat = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    socket.emit('registerSupportUser', user._id);
    fetchMessages();
    dispatch(markChatAsRead(user._id));
  }, [user]);

  useEffect(() => {
    socket.on('newMessage', (message) => {
      const isMine = message.sender === user._id || message.sender?._id === user._id;
      const isForMe = message.receiver === user._id || message.receiver?._id === user._id;

      if (isMine || isForMe) {
        setMessages((prev) => [...prev, message]);
        dispatch(addMessage(message));
      }

      // 🔔 Yalnız mənə gələn mesaj üçün bildiriş artır
      if (isForMe && !isMine) {
        dispatch(incrementUnread({ chatId: message.sender._id || message.sender }));
      }
    });

    return () => socket.off('newMessage');
  }, [user, dispatch]);


  const fetchMessages = async () => {
    try {
      const res = await API.get(`/support/admin/${user._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Mesajlar alınmadı:', err);
    }
  };

  const sendMessage = async () => {
    if (!msg && !file) return;
    const formData = new FormData();
    formData.append('content', msg);
    if (file) formData.append('image', file);

    try {
      const res = await API.post(`/support/admin/${user._id}`, formData);
      setMessages((prev) => [...prev, res.data]);
      setMsg('');
      setFile(null);
    } catch (err) {
      console.error('Mesaj göndərmə xətası:', err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.header}>
        <img
          src={`http://localhost:5555/uploads/${user.profileImage}`}
          alt="profile"
          className={styles.avatar}
        />
        <span className={styles.username}>{user.username}</span>
      </div>

      <div className={styles.messages}>
        {messages.map((m) => (
          <div
            key={m._id}
            className={m.isAdmin ? styles.adminMessage : styles.userMessage}
          >
            {m.image && (
              <img
                src={`http://localhost:5555/uploads/${m.image}`}
                className={styles.image}
                alt="img"
              />
            )}
            {m.content && <div className={styles.bubble}>{m.content}</div>}
            <div className={styles.time}>{new Date(m.createdAt).toLocaleTimeString()}</div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Mesaj yazın..."
        />
        <label className={styles.imageLabel}>
          <FaImage />
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <button className={styles.sendButton} onClick={sendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default SupportChat;
