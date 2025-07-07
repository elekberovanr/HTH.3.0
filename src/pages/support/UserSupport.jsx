import React, { useEffect, useRef, useState } from 'react';
import styles from './UserSupport.module.css';
import API from '../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { FaPaperPlane, FaImage, FaTimes } from 'react-icons/fa';
import adminImage from '../../assets/admin-default.png';
import { resetUnread } from '../../redux/reducers/chatSlice';

const socket = io('http://localhost:5555/support');

const UserSupport = () => {
  const user = useSelector((state) => state.user.user);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  const bottomRef = useRef();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if (!user?._id) return;

    socket.emit('registerSupportUser', user._id);
    fetchMessages();
    markMessagesAsRead();

    const handleMessage = (message) => {
      const isRelevant =
        message.sender === user._id ||
        message.receiver === user._id ||
        message.sender?._id === user._id ||
        message.receiver?._id === user._id;

      if (isRelevant) {
        setMessages((prev) => {
          const exists = prev.some((m) => m._id === message._id);
          return exists ? prev : [...prev, message];
        });
      }
    };

    const handleTicketStatus = (data) => {
      setIsClosed(data.closed);
    };

    socket.on('newMessage', handleMessage);
    socket.on('ticketStatusChanged', handleTicketStatus);

    return () => {
      socket.off('newMessage', handleMessage);
      socket.off('ticketStatusChanged', handleTicketStatus);
    };
  }, [user]);

  const fetchMessages = async () => {
    try {
      const res = await API.get('/support/user');
      setMessages(res.data.messages || []);
      setIsClosed(res.data.isClosed ?? false);
    } catch (err) {
      console.error('Mesajlar yüklənmədi:', err.response?.data || err.message);
    }
  };


  const markMessagesAsRead = async () => {
    try {
      await API.put(`/support/mark-read/${user._id}`, { chatWith: null });
      dispatch(resetUnread(user._id));
    } catch (err) {
      console.error('Mesajlar oxundu kimi işarələnə bilmədi:', err.message);
    }
  };

  const handleSend = async () => {
    if (!msg.trim() && !file) return;
    const formData = new FormData();
    formData.append('content', msg);
    if (file) formData.append('image', file);

    try {
      await API.post('/support', formData);
      setMsg('');
      setFile(null);
    } catch (err) {
      console.error('Mesaj göndərilə bilmədi:', err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.adminInfo}>
          <img className={styles.avatar} src={adminImage} alt="Admin" />
          <span className={styles.name}>Admin Support</span>
        </div>
      </div>

      <div className={styles.messages}>
        {messages.map((msg, i) => {
          const isMine = msg.sender?._id === user._id || msg.sender === user._id;
          const isAdmin = !isMine;

          const profileImg = isAdmin
            ? adminImage
            : msg.sender?.profileImage?.startsWith('http')
              ? msg.sender.profileImage
              : `http://localhost:5555/uploads/${msg.sender?.profileImage || 'default-user.png'}`;

          return (
            <div
              key={msg._id || i}
              className={isMine ? styles.userMessage : styles.adminMessage}
            >
              {!isMine && (
                <img src={profileImg} alt="avatar" className={styles.profileImage} />
              )}
              <div className={styles.bubbleBlock}>
                {Array.isArray(msg.image) && msg.image.length > 0 && (
                  <div className={styles.imageGroup}>
                    {msg.image.map((img, index) => (
                      <img
                        key={index}
                        className={styles.image}
                        src={`http://localhost:5555/uploads/${img}`}
                        alt="media"
                      />
                    ))}
                  </div>
                )}

                {msg.content && <div className={styles.bubble}>{msg.content}</div>}
                <div className={styles.time}>
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
              {isMine && (
                <img src={profileImg} alt="avatar" className={styles.profileImage} />
              )}
            </div>
          );
        })}
        <div ref={bottomRef}></div>
      </div>

      {file && (
        <div className={styles.previewWrapper}>
          <img
            src={URL.createObjectURL(file)}
            alt="preview"
            className={styles.previewImage}
          />
          <button className={styles.removeImage} onClick={() => setFile(null)}>
            <FaTimes />
          </button>
        </div>
      )}

      {isClosed ? (
        <div className={styles.closedNotice}>Bu söhbət admin tərəfindən bağlanıb.</div>
      ) : (
        <div className={styles.inputArea}>
          <label className={styles.imageLabel}>
            <FaImage />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
          <input
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Yazın..."
            className={styles.input}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className={styles.sendButton} onClick={handleSend}>
            <FaPaperPlane />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserSupport;
