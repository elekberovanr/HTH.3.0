import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import styles from './Header.module.css';
import { FiMenu, FiLogOut, FiLogIn, FiX } from 'react-icons/fi';
import { useState } from 'react';
import logo2 from '../../assets/logo2.png';
import {
  BiAddToQueue,
  BiMessage,
  BiSupport,
  BiUser,
} from 'react-icons/bi';
import { HiHeart } from 'react-icons/hi';
import { TbRegistered } from 'react-icons/tb';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const notifications = useSelector((state) => state.chat.notifications || {});
  const unreadCount = Object.values(notifications).reduce((sum, val) => sum + val, 0);


  const handleLogout = () => {
    const confirmLogout = window.confirm('Çıxış etmək istəyirsiniz?');
    if (confirmLogout) {
      dispatch(logout());
      navigate('/login');
    }
  };

  // 👇 Adminsə göstərmə
  if (user?.isAdmin) return null;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logoWrap}>
          <img src={logo2} alt="HTH Logo" className={styles.logo} />
          <span className={styles.title}>HTH</span>
        </Link>

        <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <Link to="/">Home</Link>

          {user ? (
            <>
              <Link to="/add">
                <BiAddToQueue /> Add
              </Link>

              <Link to="/favorites">
                <HiHeart /> Favorites
              </Link>

              <Link to="/support">
                <BiSupport /> Support
              </Link>

              <Link to="/chat" className={styles.chatLink}>
                <BiMessage /> Chat
                {unreadCount > 0 && (
                  <span className={styles.chatNotif}>{unreadCount}</span>
                )}
              </Link>

              <Link to="/profile">
                <BiUser /> Profile
              </Link>

              <button onClick={handleLogout} className={styles.logoutBtn}>
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <div className={styles.login}>
              <Link to="/login">
                <FiLogIn /> Login
              </Link>
              <Link to="/register">
                <TbRegistered /> Register
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
