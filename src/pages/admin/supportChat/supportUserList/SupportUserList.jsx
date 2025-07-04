import React, { useEffect, useState } from 'react';
import styles from './SupportUserList.module.css';
import API from '../../../../services/api';
import { useSelector } from 'react-redux';
import defaultAvatar from '../../../../assets/default-user.png';

const SupportUserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const notifications = useSelector((state) => state.chat.notifications);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/support/admin');
        setUsers(res.data);
      } catch (err) {
        console.error('Failed to fetch support users:', err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className={styles.userList}>
      {users.map((user) => {
        const unreadCount = notifications[user._id];
        const imageSrc = user.profileImage
          ? user.profileImage.startsWith('http')
            ? user.profileImage
            : `http://localhost:5555/uploads/${user.profileImage}`
          : defaultAvatar;

        return (
          <div
            key={user._id}
            className={`${styles.userItem} ${selectedUser?._id === user._id ? styles.active : ''}`}
            onClick={() => onSelectUser(user)}
          >
            <img
              src={imageSrc}
              alt="profile"
              className={styles.avatar}
              onError={(e) => (e.target.src = defaultAvatar)}
            />
            <div className={styles.details}>
              <div className={styles.nameWrapper}>
                <div className={styles.nameEmail}>
                  <div className={styles.name}>{user.name}</div>
                  <div className={styles.email}>{user.email}</div>
                </div>
                {unreadCount > 0 && (
                  <span className={styles.notificationBadge}>{unreadCount}</span>
                )}
              </div>
              <div className={styles.lastMessage}> </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupportUserList;
