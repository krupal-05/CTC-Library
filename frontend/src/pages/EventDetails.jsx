import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EventDetails = () => {
    const { id } = useParams();

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                    <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>
                <div className="p-8">
                    <h1 className="text-3xl font-bold mb-4">Event Details (ID: {id})</h1>
                    <div className="w-full h-64 bg-gray-200 rounded-lg mb-6 flex items-center justify-center">
                        <span className="text-gray-500">Event Image Placeholder</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        This is a placeholder for the event description. In a real application, you would fetch details for event ID {id} here.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
