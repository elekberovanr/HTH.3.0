import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatLayout.module.css';
import ChatRoom from './chatRoom/ChatRoom';
import ChatList from './chatPage/ChatList';

const ChatLayout = () => {
  const { selectedChat } = useSelector((state) => state.chat);
  const theme = useSelector((state) => state.theme.mode);

  return (
    <div className={`${styles.container} ${theme === 'dark' ? 'dark' : 'light'}`}>
      <div className={`${styles.left} ${selectedChat ? styles.hideOnMobile : ''}`}>
        <ChatList />
      </div>
      <div className={`${styles.right} ${!selectedChat ? styles.hideOnMobile : ''}`}>
        <ChatRoom />
      </div>
    </div>
  );
};

export default ChatLayout;
