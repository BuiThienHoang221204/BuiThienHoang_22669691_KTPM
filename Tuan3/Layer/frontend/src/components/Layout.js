import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div>
            <Header />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <main style={{ flexGrow: 1, padding: '20px' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
