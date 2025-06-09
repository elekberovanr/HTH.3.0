import React from 'react'
import Header from './header/Header'
import { Outlet } from 'react-router'
import Footer from './footer/Footer'

const Layout = () => {
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