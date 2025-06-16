import React, { useEffect } from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';
import { Outlet } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from '../redux/reducers/userSlice';

function Layout() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchMe());
    }
  }, [token, dispatch]);

  return (
    <div>
      <Header />
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
