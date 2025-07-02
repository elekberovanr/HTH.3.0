import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import styles from './Header.module.css';
import { FiMenu, FiLogOut, FiX, FiSun, FiMoon, FiLogIn } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import logo2 from '../../assets/logo2.png';
import { BiAddToQueue, BiMessage } from 'react-icons/bi';
import { HiHeart } from 'react-icons/hi';
import { FaHome } from 'react-icons/fa';
import CategoryDropdown from '../../pages/category/CategoryDropdown';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TbRegistered } from 'react-icons/tb';
import { toggleTheme } from '../../redux/reducers/themeSlice';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const notifications = useSelector((state) => state.chat.notifications || {});
  const unreadCount = Object.values(notifications).reduce((sum, val) => sum + val, 0);
  const theme = useSelector(state => state.theme.mode);

  const handleLogout = () => {
    const confirmLogout = window.confirm('Çıxış etmək istəyirsiniz?');
    if (confirmLogout) {
      dispatch(logout());
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (user?.isAdmin) return null;

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logoWrap}>
            <img src={logo2} alt="HTH Logo" className={styles.logo} />
            <span className={styles.title}>HTH</span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && user && (
            <nav className={styles.desktopNav}>
              <Link to="/" className={styles.navItem}><FaHome /> Home</Link>
              <Link to="/favorites" className={styles.navItem}><HiHeart /> Favorites</Link>
              <Link to="/chat" className={styles.navItem}>
                <BiMessage />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
                Chat
              </Link>
              <div className={styles.dropdownWrapper}>
                <span className={styles.navItem}>Categories <MdKeyboardArrowDown /></span>
                <div className={styles.dropdownContent}>
                  <CategoryDropdown />
                </div>
              </div>
              <button onClick={() => dispatch(toggleTheme())} className={styles.themeToggle}>
                {theme === 'dark' ? <FiSun /> : <FiMoon />}
              </button>
            </nav>
          )}

          {/* Right Side */}
          <div className={styles.right}>
            {user ? (
              <>
                <Link to="/add" className={styles.icon}><BiAddToQueue /></Link>
                <Link to="/profile">
                  {user?.profileImage && (
                    <img
                      src={`http://localhost:5555/uploads/${user.profileImage}`}
                      alt="Profile"
                      className={styles.profileImage}
                    />
                  )}
                </Link>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  <FiLogOut />
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.icon}>Login</Link>
                <Link to="/register" className={styles.icon}>Register</Link>
              </>
            )}

            {isMobile && user && (
              <button className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX /> : <FiMenu />}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobile && menuOpen && (
        <nav className={styles.mobileNav}>
          {user ? (
            <>
              <Link to="/" className={styles.navItem}><FaHome /> Home</Link>
              <Link to="/favorites" className={styles.navItem}><HiHeart /> Favorites</Link>
              <Link to="/chat" className={styles.navItem}>
                <BiMessage />
                {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
                Chat
              </Link>
              <div className={styles.dropdownWrapper}>
                <span className={styles.navItem}>Categories <MdKeyboardArrowDown /></span>
                <div className={styles.dropdownContent}>
                  <CategoryDropdown />
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.navItem}> Login</Link>
              <Link to="/register" className={styles.navItem}>Register</Link>
            </>
          )}
        </nav>
      )}
    </>
  );
}

export default Header;
