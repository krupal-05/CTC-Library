import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header isLoggedIn={true} />
            <div className="flex flex-grow">
                <Sidebar />
                <main className="flex-grow bg-white p-8">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default StudentLayout;
