import React from 'react';
import { Clock, MapPin, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import libraryImg1 from '../assets/library-1.jpg';
import libraryImg2 from '../assets/library-2.jpg';
import libraryImg3 from '../assets/library-3.jpg';
import libraryImg4 from '../assets/library-4.jpg';

import { events } from '../data/eventsData';

const Home = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const images = [libraryImg1, libraryImg2, libraryImg3, libraryImg4];

    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [images.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
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

            {/* Gallery Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-brand-blue pl-4">
                            State-of-the-Art Facilities
                        </h2>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Experience a conducive environment designed for academic excellence.
                            Our library provides a perfect blend of traditional resources and modern infrastructure.
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                'Spacious and Air-Conditioned Reading Halls',
                                'Digital Discussion Rooms',
                                'High-Speed WiFi Access',
                                'Vast Collection of Technical Resources'
                            ].map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-blue"></div>
                                    <span className="text-gray-700 font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                        <Link to="/about" className="inline-flex items-center gap-2 text-brand-blue font-semibold hover:gap-3 transition-all">
                            Explore More <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="bg-white p-2 rounded-xl shadow-xl h-[400px] relative group overflow-hidden">
                        <div
                            className="w-full h-full flex transition-transform duration-500 ease-out"
                            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                        >
                            {images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`Library facility ${idx + 1}`}
                                    className="w-full h-full object-cover flex-shrink-0 rounded-lg"
                                />
                            ))}
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${currentSlide === idx ? 'bg-white w-4' : 'bg-white/50'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
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
                                    <div className="bg-white/20 p-2 rounded-full"><Calendar className="w-5 h-5" /></div>
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
                        {events.map((event) => (
                            <Link
                                key={event.id}
                                to={`/events/${event.id}`}
                                className="aspect-square bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer relative group block"
                            >
                                <img
                                    src={event.image}
                                    alt={event.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center text-white p-4 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="font-bold text-lg mb-2">{event.title}</h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
                                        <Calendar size={14} />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                                        <MapPin size={14} />
                                        <span>{event.location}</span>
                                    </div>
                                    <span className="text-brand-blue text-xs font-semibold bg-white px-3 py-1 rounded-full">
                                        View Details
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
