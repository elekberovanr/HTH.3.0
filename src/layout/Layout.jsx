import React, { useEffect } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../redux/reducers/userSlice';
import CommentSocketProvider from '../components/comments/CommentSocketProvider';

function Layout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [token, dispatch]);

  return (
    <div data-theme={theme}>
      <CommentSocketProvider>
        {!user?.isAdmin && <Header />}

        <div className={theme === 'dark' ? 'dark' : 'light'}>
          <main style={{ minHeight: '80vh' }}>
            <Outlet />
          </main>
        </div>

        {!user?.isAdmin && <Footer />}
      </CommentSocketProvider>
    </div>
  );
}

export default Layout;
