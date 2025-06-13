import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import API from '../../services/api';
import styles from './ChatPage.module.css';

function ChatPage() {
  const user = useSelector((state) => state.user.user);
  const [receiverId, setReceiverId] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');

  const fetchMessages = async () => {
    if (!receiverId) return;
    try {
      const res = await API.get(`/chat/${receiverId}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Mesajlar alınmadı:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [receiverId]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      await API.post('/chat', {
        receiver: receiverId,
        content: newMsg,
      });
      setNewMsg('');
      fetchMessages(); // Yenilə
    } catch (err) {
      console.error('Mesaj göndərilmədi:', err);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <h2>Chat</h2>

      <input
        type="text"
        placeholder="Qarşı tərəfin ID-sini daxil et"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className={styles.input}
      />

      <div className={styles.chatBox}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={
              msg.sender === user._id
                ? styles.myMessage
                : styles.theirMessage
            }
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div className={styles.sendBox}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Mesaj yaz..."
          className={styles.input}
        />
        <button onClick={sendMessage}>Göndər</button>
      </div>
    </div>
  );
}

export default ChatPage;
