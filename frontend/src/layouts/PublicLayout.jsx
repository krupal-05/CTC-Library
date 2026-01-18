import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet, useLocation } from 'react-router-dom';

const PublicLayout = () => {
    const location = useLocation();
    const path = location.pathname.replace(/\/+$/, '') || '/';
    const showFooter = ['/', '/about'].includes(path.toLowerCase());

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            {showFooter && <Footer />}
        </div>
    );
};

export default PublicLayout;
