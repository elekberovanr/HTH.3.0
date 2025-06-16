import { useParams } from 'react-router';
import styles from './ChatLayout.module.css';
import ChatList from './chatPage/ChatList';
import ChatRoom from './chatRoom/ChatRoom';

const ChatLayout = () => {
  const { id } = useParams();

  return (
    <div className={styles.container}>
      <div className={styles.chatList}>
        <ChatList />
      </div>
      <div className={styles.chatRoom}>
        {id ? <ChatRoom /> : <p className={styles.welcome}>Bir söhbət seçin</p>}
      </div>
    </div>
  );
};

export default ChatLayout;
