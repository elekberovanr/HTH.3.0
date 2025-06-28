import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ChatLayout.module.css';
import ChatRoom from './chatRoom/ChatRoom';
import ChatList from './chatPage/ChatList';

const ChatLayout = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <div className={styles.container}>
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
