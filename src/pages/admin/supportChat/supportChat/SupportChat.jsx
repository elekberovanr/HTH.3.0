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
  const [files, setFiles] = useState([]);
  const bottomRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) return;
    socket.emit('registerSupportUser', user._id);
    fetchMessages();
    dispatch(markChatAsRead(user._id));
  }, [user]);

  useEffect(() => {
    const handler = (message) => {
      const isMine = message.sender === user._id || message.sender?._id === user._id;
      const isForMe = message.receiver === user._id || message.receiver?._id === user._id;

      if (isMine || isForMe) {
        setMessages((prev) => [...prev, message]);
        dispatch(addMessage(message));
      }

      if (isForMe && !isMine) {
        dispatch(incrementUnread({ chatId: message.sender._id || message.sender }));
      }
    };

    socket.on('newMessage', handler);
    return () => socket.off('newMessage', handler);
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
    if (!msg && files.length === 0) return;

    const formData = new FormData();
    formData.append('content', msg);
    files.forEach(file => formData.append('image', file)); // çox şəkil, eyni ad: image

    try {
      await API.post(`/support/admin/${user._id}`, formData);
      setMsg('');
      setFiles([]);
    } catch (err) {
      console.error('Mesaj göndərmə xətası:', err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(prev => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.header}>
        <img
          src={`http://localhost:5555/uploads/${user.profileImage}`}
          alt="profile"
          className={styles.avatar}
        />
        <span className={styles.username}>{user.email}</span>
      </div>

      <div className={styles.messages}>
        {messages.map((m) => (
          <div
            key={m._id}
            className={m.isAdmin ? styles.adminMessage : styles.userMessage}
          >
            {m.content && <div className={styles.bubble}>{m.content}</div>}

            {Array.isArray(m.image) && m.image.map((img, i) => (
              <img
                key={i}
                src={`http://localhost:5555/uploads/${img}`}
                className={styles.image}
                alt={`img-${i}`}
              />
            ))}

            <div className={styles.time}>
              {new Date(m.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {files.length > 0 && (
        <div className={styles.previewWrapper}>
          {files.map((file, idx) => (
            <div key={idx} className={styles.previewItem}>
              <img
                src={URL.createObjectURL(file)}
                className={styles.previewImage}
                alt={`preview-${idx}`}
              />
              <button
                className={styles.removeImageBtn}
                onClick={() => removeFile(idx)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className={styles.inputArea}>
        <input
          type="text"
          className={styles.input}
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Mesaj yaz..."
        />
        <label className={styles.imageLabel}>
          <FaImage />
          <input
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFileChange}
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
