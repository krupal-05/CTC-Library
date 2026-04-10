import React from 'react';

const ContactPage = () => {
    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
            <h1 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-widest mb-6 lg:mb-10 text-center">Contact Us</h1>
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center text-center space-y-6 text-gray-500">
                    <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
                        <span className="text-4xl text-accent">🚧</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800"> Construction</h2>
                    <p className="max-w-md">
                        We are currently working on this page. Please check back later for updates and new content regarding Contact Information.
                    </p>
                </div>
            </div>
        </div>
    );
};



export default ContactPage;
