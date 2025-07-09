import React, { useEffect } from 'react';
import styles from './ChatList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchChats,
  setSelectedChat,
  resetUnread,
  incrementUnread,
} from '../../../redux/reducers/chatSlice';
import API from '../../../services/api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5555');

const ChatList = () => {
  const dispatch = useDispatch();
  const { chatList, selectedChatId } = useSelector((state) => state.chat);
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchChats(user._id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      if (!msg.chat || msg.sender?._id === user._id) return;

      if (selectedChatId !== msg.chat) {
        dispatch(incrementUnread(msg.chat));
      }

      dispatch(fetchChats(user._id));
    });

    return () => socket.off('newMessage');
  }, [dispatch, selectedChatId, user]);

  const handleChatClick = async (chat) => {
    dispatch(setSelectedChat(chat));
    dispatch(resetUnread(chat._id));
    try {
      await API.put(`/chat/read/${user._id}`, { chatId: chat._id });
      dispatch(fetchChats(user._id));
    } catch (err) {
      console.error('❌ Failed to mark as read:', err);
    }
  };

  return (
    <div className={`${styles.chatlist} ${theme === 'dark' ? 'dark' : ''}`}>
      <h3 className={styles.title}>Chats</h3>

      {chatList.map((chat) => {
        const otherUser = chat.participants.find((p) => p._id !== user._id);
        if (!otherUser) return null;

        return (
          <div
            key={chat._id}
            className={`${styles.chatItem} ${chat._id === selectedChatId ? styles.active : ''}`}
            onClick={() => handleChatClick(chat)}
          >
            <img
              src={`http://localhost:5555/uploads/${otherUser.profileImage || 'default.png'}`}
              alt={otherUser.username || otherUser.name}
              className={styles.avatar}
            />
            <div className={styles.chatInfo}>
              <p className={styles.name}>{otherUser.username || otherUser.name}</p>
              <p className={styles.lastMsg}>
                {chat.latestMessage?.content ||
                  (chat.latestMessage?.image ? '📷 Photo' : 'No messages yet')}
              </p>
            </div>
            {chat.unreadCount > 0 && (
              <span className={styles.badge}>{chat.unreadCount}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;
