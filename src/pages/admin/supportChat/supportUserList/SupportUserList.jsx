import React, { useEffect, useState } from 'react';
import styles from './SupportUserList.module.css';
import API from '../../../../services/api';
import { useSelector } from 'react-redux';

const SupportUserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const notifications = useSelector(state => state.chat.notifications);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await API.get('/support/admin');
        setUsers(res.data);
      } catch (err) {
        console.error('İstifadəçi siyahısı alınmadı:', err);
      }
    };
    fetchChats();
  }, []);

  return (
    <div className={styles.userList}>
      {users.map((msg) => {
        const isAdmin = msg.isAdmin;
        const otherUser = isAdmin ? msg.receiver : msg.sender;
        const unreadCount = notifications[otherUser._id];

        return (
          <div
            key={msg._id}
            className={`${styles.userItem} ${selectedUser?._id === otherUser._id ? styles.active : ''}`}
            onClick={() => onSelectUser(otherUser)}
          >
            <img
              src={`http://localhost:5555/uploads/${otherUser.profileImage}`}
              alt="profile"
              className={styles.avatar}
            />
            <div className={styles.details}>
              <div className={styles.nameWrapper}>
                <div className={styles.nameEmail}>
                  <div className={styles.name}>{otherUser.name}</div>
                  <div className={styles.email}>{otherUser.email}</div>
                </div>

                {unreadCount > 0 && (
                  <span className={styles.notificationBadge}>{unreadCount}</span>
                )}
              </div>
              <div className={styles.lastMessage}>
                {msg.content?.slice(0, 30)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupportUserList;
