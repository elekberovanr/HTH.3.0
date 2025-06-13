import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/userSlice';
import styles from './Header.module.css';
import logo2 from '../../assets/logo2.png';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

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

        <nav className={styles.nav}>
          {user ? (
            <>
              <Link to="/add">+Add</Link>
              <Link to="/chat">Chat</Link>
              <Link to="/profile">Profil</Link>
              <button onClick={handleLogout}>Çıxış</button>
            </>
          ) : (
            <>
              <Link to="/login">Giriş</Link>
              <Link to="/register">Qeydiyyat</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
