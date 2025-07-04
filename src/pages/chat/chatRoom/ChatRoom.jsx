import React, { useEffect, useRef, useState } from 'react';
import styles from './ChatRoom.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useParams } from 'react-router-dom';
import API from '../../../services/api';
import { BiImage, BiSend } from 'react-icons/bi';
import {
  fetchChats,
  markChatAsRead,
  resetChat,
  setSelectedChat,
} from '../../../redux/reducers/chatSlice';
import { FaArrowLeft } from 'react-icons/fa';
import { BsImage } from 'react-icons/bs';

const socket = io('http://localhost:5555');

const ChatRoom = () => {
  const { chatId } = useParams();
  const dispatch = useDispatch();
  const { chatList, selectedChat } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user.user);

  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const recipient = selectedChat?.participants?.find(p => p._id !== user._id);

  useEffect(() => {
    if (user?._id) dispatch(fetchChats(user._id));
  }, [dispatch, user]);

  useEffect(() => {
    if (!chatId || !chatList.length) return;
    const found = chatList.find((c) => c._id === chatId);
    if (found) dispatch(setSelectedChat(found));
  }, [chatId, chatList, dispatch]);

  useEffect(() => {
    const markRead = async () => {
      if (!selectedChat?._id || !user?._id) return;
      try {
        await API.put(`/chat/read/${user._id}`, { chatId: selectedChat._id });
        dispatch(markChatAsRead(selectedChat._id));
      } catch (err) {
        console.error('Read marking failed:', err);
      }
    };
    markRead();
  }, [selectedChat]);


  useEffect(() => {
    if (!selectedChat?._id) return;
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const res = await API.get(`/chat/messages/${selectedChat._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Failed to load messages:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
    socket.emit('joinRoom', selectedChat._id);
    return () => socket.off('getMessage');
  }, [selectedChat]);

  useEffect(() => {
    socket.on('getMessage', (msg) => {
      if (msg.chat === selectedChat._id) {
        setMessages((prev) => [...prev, msg]);
        dispatch(fetchChats(user._id));
      }
    });
    return () => socket.off('getMessage');
  }, [selectedChat, dispatch, user]);

  useEffect(() => {
    chatBoxRef.current?.scrollTo(0, chatBoxRef.current.scrollHeight);
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim() && !file) return;
    const formData = new FormData();
    formData.append('chatId', selectedChat._id);
    formData.append('content', newMsg);
    if (file) formData.append('image', file);

    try {
      const res = await API.post('/chat/message', formData);
      socket.emit('sendMessage', res.data);
      setMessages(prev => [...prev, res.data]);
      setNewMsg('');
      setFile(null);
    } catch (err) {
      console.error('Message sending failed:', err);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  if (!selectedChat?._id) return <div className={styles.empty}>Select a chat</div>;

  return (
    <div className={styles.chatRoom}>
      <div className={styles.header}>
        <FaArrowLeft onClick={() => dispatch(resetChat())} className={styles.backIcon} />
        <img
          src={`http://localhost:5555/uploads/${recipient?.profileImage || 'default.png'}`}
          alt={recipient?.username || recipient?.name || 'Profile'}
          className={styles.profileImage}
        />
        <h3>{recipient?.username || recipient?.name}</h3>
      </div>

      <div className={styles.chatBox} ref={chatBoxRef}>
        {isLoading ? (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
            <span>Loading messages...</span>
          </div>
        ) : (
          messages.map((msg) => {
            const isMine = msg?.sender?._id === user?._id;
            return (
              <div key={msg._id} className={`${styles.messageRow} ${isMine ? styles.mine : styles.theirs}`}>
                <div className={styles.bubbleContainer}>
                  <div className={styles.bubble}>
                    {msg.content && <p>{msg.content}</p>}
                    {msg.image && (
                      <img
                        src={`http://localhost:5555/uploads/${msg.image}`}
                        alt="message"
                        className={styles.messageImage}
                      />
                    )}
                    <span className={styles.time}>{formatTime(msg.createdAt)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {file && (
        <div className={styles.previewImageWrapper}>
          <img src={URL.createObjectURL(file)} alt="preview" className={styles.previewImage} />
        </div>
      )}


      <div className={styles.inputSection}>
        <label htmlFor="file-upload" className={styles.uploadIcon}>
          <BsImage />
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="Type a message..."
          className={styles.inputField}
        />

        <button className={styles.sendButton} onClick={sendMessage}>
          <BiSend />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
