import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router'
import Footer from './footer/Footer'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout } from '../redux/reducers/userSlice';
import API from '../services/api';

function Layout() {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.user.token);

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const res = await API.get('/auth/me');
                    dispatch(setUser(res.data));
                } catch (err) {
                    dispatch(logout()); 
                }
            }
        };

        fetchUser();
    }, [token, dispatch]);


    return (
        <div>
            <Header />
            <main style={{ minHeight: '80vh', padding: '1rem' }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout