import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import API from '../../../services/api';
import { clearUnread } from '../../../redux/reducers/chatSlice';
import { io } from 'socket.io-client';
import styles from './ChatRoom.module.css';
import { BiSend } from 'react-icons/bi';

const socket = io('http://localhost:5555');

const ChatRoom = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const chatBoxRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await API.get(`/chat/messages/${id}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Mesajlar alınmadı:', err);
      }
    };
    fetchMessages();
    dispatch(clearUnread());
  }, [id, dispatch]);

  useEffect(() => {
    socket.emit('joinRoom', id);

    socket.on('newMessage', (incomingMsg) => {
      setMessages((prev) => [...prev, incomingMsg]);
    });

    return () => {
      socket.off('newMessage');
    };
  }, [id]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;
    try {
      const res = await API.post('/chat/message', {
        chatId: id,
        content: newMsg,
      });
      socket.emit('sendMessage', res.data);
      setMessages((prev) => [...prev, res.data]);
      setNewMsg('');
    } catch (err) {
      console.error('Göndərilə bilmədi:', err);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div ref={chatBoxRef} className={styles.chatBox}>
        {messages.map((msg) => {
          const isMine = msg?.sender?._id === user?._id;
          return (
            <div
              key={msg._id}
              className={`${styles.messageRow} ${isMine ? styles.mine : styles.theirs}`}
            >
              <img
                src={`http://localhost:5555/uploads/${msg?.sender?.profileImage}`}
                alt="profil"
                className={styles.avatar}
              />
              <div className={styles.bubbleContainer}>
                <div className={styles.bubble}>
                  <p>{msg.content}</p>
                  <span className={styles.time}>{formatTime(msg.createdAt)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type..."
          className={styles.inputField}
        />
        <button onClick={sendMessage} className={styles.sendButton}>
          <BiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
