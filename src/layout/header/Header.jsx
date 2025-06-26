import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import styles from './Header.module.css';
import { FiMenu, FiLogOut, FiLogIn, FiX } from 'react-icons/fi';
import { useState } from 'react';
import logo2 from '../../assets/logo2.png';
import { BiAddToQueue, BiMessage, BiUser } from 'react-icons/bi';
import { HiHeart } from 'react-icons/hi';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const unreadCount = useSelector((state) => state.chat.unreadCount);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Çıxış etmək istəyirsiniz?');
    if (confirmLogout) {
      dispatch(logout());
      navigate('/login');
    }
  };

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
              <Link to="/add"><BiAddToQueue /></Link>
              <Link to="/profile"><BiUser /></Link>
              <Link to='/chat' className={styles.iconWrap}>
                <div className={styles.bellWrapper}>
                  <BiMessage />
                  {unreadCount > 0 && (
                    <span className={styles.badge}>{unreadCount}</span>
                  )}
                </div>
              </Link>

              <Link to="/favorites"><HiHeart /></Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <FiLogOut /> LogOut
              </button>
            </>
          ) : (
            <>
              <Link to="/login"><FiLogIn /> Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </div>

      {menuOpen && <div className={styles.overlay} onClick={() => setMenuOpen(false)} />}
    </header>
  );
}

export default Header;
