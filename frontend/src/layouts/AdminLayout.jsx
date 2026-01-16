import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header isLoggedIn={true} />
            <div className="flex flex-grow">
                <AdminSidebar />
                <main className="flex-grow bg-white p-8">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default AdminLayout;
