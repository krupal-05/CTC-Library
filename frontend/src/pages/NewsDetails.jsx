import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar } from 'lucide-react';

const NewsDetails = () => {
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
                    <h1 className="text-3xl font-bold mb-2">News Headline (ID: {id})</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Calendar className="w-4 h-4" />
                        <span>10/10/2023</span>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-4">
                        This is a placeholder for the news article content. It would correspond to news item #{id}.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                        Detailed news information goes here. The library has received new books for the Computer Department, including the latest editions of popular programming textbooks.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NewsDetails;
