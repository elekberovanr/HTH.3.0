import React, { useEffect, useState } from 'react';
import styles from './SupportUserList.module.css';
import API from '../../../../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedChat } from '../../../../redux/reducers/chatSlice';
import defaultAvatar from '../../../../assets/default-user.png';

const SupportUserList = ({ onSelectUser, selectedUser }) => {
  const [users, setUsers] = useState([]);
  const globalNotifications = useSelector((state) => state.chat.notifications);
  const dispatch = useDispatch();

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

  const handleSelect = (user) => {
    dispatch(setSelectedChat({ _id: user._id }));
    onSelectUser(user);
  };

  return (
    <div className={styles.userList}>
      {users.map((user) => {
        const unreadCount = globalNotifications[user._id] || 0;
        const imageSrc = user.profileImage
          ? user.profileImage.startsWith('http')
            ? user.profileImage
            : `http://localhost:5555/uploads/${user.profileImage}`
          : defaultAvatar;

        return (
          <div
            key={user._id}
            className={`${styles.userItem} ${selectedUser?._id === user._id ? styles.active : ''}`}
            onClick={() => handleSelect(user)}
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
                  <span className={styles.notificationBadge}>
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
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
