import React from 'react';
import { Clock, MapPin, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-gray-100">

            {/* Hero Section Placeholder */}
            <div className="w-full h-80 bg-gray-300 relative">
                <img
                    src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1470&auto=format&fit=crop"
                    alt="Library Reading Hall"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white shadow-lg">Welcome to LDCE Library</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Library News */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                        <div className="bg-brand-blue text-white px-6 py-3 font-bold text-lg">
                            Library NEWS
                        </div>
                        <div className="divide-y divide-gray-100">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="p-4 hover:bg-gray-50">
                                    <div className="flex items-start gap-3">
                                        <ArrowRight className="w-5 h-5 text-gray-400 mt-1" />
                                        <div>
                                            <h3 className="font-semibold text-gray-800">News Headline</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                                                <Calendar className="w-3 h-3" />
                                                <span>10/10/2023</span>
                                            </div>
                                            <Link to={`/news/${item}`} className="text-blue-600 text-sm mt-2 hover:underline inline-block">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Timings & Location */}
                    <div className="bg-brand-blue rounded-lg shadow-lg text-white p-8">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold mb-4">Library Timings</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3">
                                    <div className="bg-white/20 p-2 rounded-full"><Clock className="w-5 h-5" /></div>
                                    <span className="font-medium">10:30 am to 09:00 pm</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="bg-white/20 p-2 rounded-full mt-1"><Calendar className="w-5 h-5" /></div>
                                    <span className="text-sm opacity-90 max-w-sm">Remains closed on Sunday & Public Holidays</span>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold mb-4">Location (Click for visit)</h3>
                            <div className="flex items-start gap-3 cursor-pointer hover:bg-white/10 p-2 -ml-2 rounded transition-colors">
                                <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
                                <p className="text-sm leading-relaxed opacity-90">
                                    LDCE Library, <br />
                                    Opposite Gujarat University, <br />
                                    Navrangpura, Ahmedabad - 380015 <br />
                                    Gujarat, India
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Latest Events Grid */}
                <div className="mt-12 mb-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-800 border-b-4 border-gray-800 inline-block pb-1">Latest Events</h2>
                        <p className="text-gray-600 mt-2">Stay updated with the latest events and activities happening at LDCE</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[1, 2, 3, 4].map((item) => (
                            <Link key={item} to={`/events/${item}`} className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer block">
                                <img
                                    src={`https://source.unsplash.com/random/400x400?library,book&sig=${item}`}
                                    alt="Event"
                                    className="w-full h-full object-cover"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=Event+Image' }} // Fallback
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
