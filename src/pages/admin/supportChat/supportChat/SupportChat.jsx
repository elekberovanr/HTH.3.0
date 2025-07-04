import React, { useEffect, useRef, useState } from 'react';
import styles from './SupportChat.module.css';
import { FaImage, FaPaperPlane, FaTimes } from 'react-icons/fa';
import API from '../../../../services/api';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:5555/support');

const SupportChat = ({ selectedUser, onBack }) => {
  const admin = useSelector(state => state.user.user);
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');
  const [file, setFile] = useState(null);
  const bottomRef = useRef();

  useEffect(() => {
    if (!selectedUser?._id) return;

    fetchMessages();
    socket.emit('registerSupportAdmin', admin._id);

    socket.on('newMessage', (message) => {
      const match =
        (message.sender === selectedUser._id || message.sender?._id === selectedUser._id) ||
        (message.receiver === selectedUser._id || message.receiver?._id === selectedUser._id);
      if (match) setMessages((prev) => [...prev, message]);
    });

    return () => socket.off('newMessage');
  }, [selectedUser]);

  const fetchMessages = async () => {
    try {
      const res = await API.get(`/support/admin/${selectedUser._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    }
  };

  const handleSend = async () => {
    if (!msg && !file) return;
    const formData = new FormData();
    formData.append('content', msg);
    if (file) formData.append('image', file);

    try {
      await API.post(`/support/admin/${selectedUser._id}`, formData);
      setMsg('');
      setFile(null);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={styles.chatContainer}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>←</button>
        <img
          src={
            selectedUser?.profileImage
              ? `http://localhost:5555/uploads/${selectedUser.profileImage}`
              : '/default-avatar.png'
          }
          alt="user"
          className={styles.profileImage}
        />
        <div>
          <div className={styles.username}>{selectedUser.name}</div>
          <div className={styles.email}>{selectedUser.email}</div>
        </div>
      </div>

      <div className={styles.messageArea}>
        {messages.map((m, i) => {
          const isAdmin = m.sender === admin._id || m.sender?._id === admin._id;
          const sender = m.sender || {};
          const senderImage = sender.profileImage
            ? `http://localhost:5555/uploads/${sender.profileImage}`
            : '/default-avatar.png';

          return (
            <div
              key={i}
              className={`${styles.messageRow} ${isAdmin ? styles.user : styles.admin}`}
            >
              {!isAdmin && (
                <img src={senderImage} alt="avatar" className={styles.avatar} />
              )}
              <div className={styles.bubbleWrapper}>
                {Array.isArray(m.image) && m.image.length > 0 && (
                  <div className={styles.imageGroup}>
                    {m.image.map((img, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5555/uploads/${img}`}
                        alt="media"
                        className={styles.messageImage}
                      />
                    ))}
                  </div>
                )}

                {m.content && (
                  <div className={styles.bubble}>
                    {m.content}
                    <span className={styles.time}>
                      {new Date(m.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                )}

                {!m.content && m.image?.length > 0 && (
                  <span className={styles.time}>
                    {new Date(m.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                )}
              </div>

              {isAdmin && (
                <img src={senderImage} alt="avatar" className={styles.avatar} />
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
          <button onClick={() => setFile(null)} className={styles.removeImage}>
            <FaTimes />
          </button>
        </div>
      )}

      <div className={styles.inputSection}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message..."
          className={styles.inputField}
        />
        <label className={styles.uploadIcon}>
          <FaImage />
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <button onClick={handleSend} className={styles.sendButton}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default SupportChat;
