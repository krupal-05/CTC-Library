import React from 'react';
import { Clock, MapPin, ArrowRight, Calendar, ChevronLeft, ChevronRight, BookOpen, Monitor, Wifi, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';
import libraryImg1 from '../assets/library-1.jpg';
import libraryImg2 from '../assets/library-2.jpg';
import libraryImg3 from '../assets/library-3.jpg';
import libraryImg4 from '../assets/library-4.jpg';
import { events } from '../data/eventsData';
import BookSearch from '../components/BookSearch';
import NewArrivals from '../components/NewArrivals';

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
        <div className="bg-white">

            {/* Hero Section */}
            <div className="w-full h-[650px] bg-black relative">
                <img
                    src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2670&auto=format&fit=crop"
                    alt="Library Reading Hall"
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-7xl mx-auto w-full">
                    <h1 className="text-5xl md:text-[80px] font-serif text-white max-w-4xl leading-[1.1] mb-6">
                        Welcome to<br/>Central Library
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-2xl text-left font-sans font-light leading-relaxed">
                        The intellectual heart of L.D. College of Engineering. Curating<br/>
                        knowledge, fostering research, and powering the next<br/>
                        generation of innovators.
                    </p>
                    <div className="flex gap-4">
                        <button className="bg-[#1a5b51] hover:bg-[#134840] text-white px-8 py-3.5 rounded-lg font-medium transition-colors">
                            Explore More
                        </button>
                        <button className="bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white px-8 py-3.5 rounded-lg font-medium transition-colors">
                            View Collections
                        </button>
                    </div>
                </div>
            </div>
            {/* Recent Updates Full-Width Section */}
            <div className="pt-16 pb-12">
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    <div className="flex items-center justify-between mb-10 w-full gap-8">
                        <div className="flex-1">
                            <h4 className="text-[10px] font-bold text-[#1a5b51] uppercase tracking-wider mb-2">News & Announcements</h4>
                            <div className="flex items-center gap-6 w-full">
                                <h2 className="text-3xl md:text-[40px] font-serif text-[#2c3e50] whitespace-nowrap">Recent Updates</h2>
                                <div className="h-[1px] bg-[#e4e9ec] flex-1 min-w-0 md:mt-1"></div>
                            </div>
                        </div>
                        <Link to="/news" className="text-[#1a5b51] font-bold text-[13px] hover:underline whitespace-nowrap mt-4 md:mt-3">
                            View All News
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map((item) => (
                            <div key={item} className="bg-white rounded-[16px] p-6 lg:p-8 flex gap-5 lg:gap-8 items-start hover:shadow-[0_6px_24px_rgba(0,0,0,0.03)] shadow-sm transition-all border border-[#f0f2f4]">
                                {/* Icon */}
                                <div className="bg-[#edf2f1] p-3.5 rounded-lg shrink-0 mt-1">
                                    <ArrowRight className="w-5 h-5 text-[#1a5b51]" strokeWidth={2.5} />
                                </div>
                                
                                {/* Content */}
                                <div className="space-y-2 lg:space-y-3">
                                    <h3 className="text-[18px] lg:text-[20px] font-serif text-[#3f5161] leading-normal font-medium">News Headline {item}</h3>
                                    <div className="flex items-center gap-2 text-[12px] text-gray-500 font-sans">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>10/10/2023</span>
                                    </div>
                                    <Link to={`/news/${item}`} className="text-[#1a5b51] text-[12px] font-bold flex items-center gap-1 hover:underline pt-2 inline-flex tracking-wide">
                                        View Details <span className="text-[11px] ml-0.5">›</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>





                {/* New Arrivals */}
                {/* New Arrivals */}
                <div className="bg-[#f8f9fa]">
                    <NewArrivals />
                    
                    {/* Latest Events Grid (Moved right under New Arrivals) */}
                    <div className="pt-6 pb-20">
                    <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                        <div className="mb-10">
                            <h4 className="text-[10px] font-bold text-[#1a5b51] uppercase tracking-wider mb-2">Engagement</h4>
                            <h2 className="text-3xl md:text-[40px] font-serif text-[#2c3e50] whitespace-nowrap">Latest Events</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {events.slice(0,3).map((event) => (
                                <Link
                                    key={event.id}
                                    to={`/events/${event.id}`}
                                    className="bg-[white] rounded-[16px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#f0f2f4] flex flex-col hover:-translate-y-1 transition-transform duration-300"
                                >
                                    <div className="w-full h-[200px] bg-gray-200 overflow-hidden">
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="p-6 flex flex-col flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Calendar className="w-3.5 h-3.5 text-[#1a5b51]" strokeWidth={2.5} />
                                            <span className="text-[#1a5b51] text-[11px] font-bold">{event.date}</span>
                                        </div>
                                        <h3 className="font-serif text-[#2c3e50] text-[22px] leading-snug mb-3 uppercase">{event.title}</h3>
                                        <p className="text-gray-500 text-[13px] leading-relaxed line-clamp-3 mb-6 flex-1">
                                            {event.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-gray-400 mb-6">
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span className="text-[11px]">{event.location}</span>
                                        </div>
                                        <button className="w-full bg-[#f4f7f6] border border-[#dce4e2] text-[#1a5b51] py-2.5 rounded-[8px] text-[13px] font-bold hover:bg-[#eaf1ef] transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Information Hub Section */}
                <div className="pb-20">
                    <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                        <div className="bg-white rounded-[32px] p-8 lg:p-14 shadow-[0_2px_24px_rgba(0,0,0,0.03)] border border-[#eef2f0] grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-center">
                            
                            {/* Left Side: Information */}
                            <div>
                                <h2 className="text-[32px] md:text-[40px] font-serif text-[#1c2e3d] mb-12">Information Hub</h2>
                                
                                <div className="space-y-10">
                                    {/* Service Timings Box */}
                                    <div className="flex items-start gap-6">
                                        <div className="bg-[#eef3f1] p-4 rounded-2xl shrink-0 mt-1">
                                            <Clock className="w-6 h-6 text-[#1a5b51]" strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-medium text-[#1c2e3d] mb-4 font-serif text-[22px]">Service Timings</h3>
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-6">
                                                    <span className="text-[14px] text-[#1c2e3d] font-bold w-[70px]">Mon - Sat:</span>
                                                    <span className="text-[14px] text-[#5b6c7a]">10:30 am to 09:00 pm</span>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span className="text-[14px] text-[#1c2e3d] font-bold w-[70px]">Sunday:</span>
                                                    <span className="text-[14px] text-[#5b6c7a]">Closed (Main Library)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Library Rules Box */}
                                    <div className="flex items-start gap-6">
                                        <div className="bg-[#eef3f1] p-4 rounded-2xl shrink-0 mt-1">
                                            <svg className="w-6 h-6 text-[#1a5b51]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <div className="pt-0.5">
                                            <h3 className="text-xl font-medium text-[#1c2e3d] mb-4 font-serif text-[22px]">Library Rules</h3>
                                            <ul className="space-y-4 text-[14px] text-[#5b6c7a] leading-relaxed">
                                                <li className="flex gap-3 items-start"><span className="text-[#1a5b51] font-bold mt-0.5">•</span> <span>ID cards are mandatory for entry and issuing.</span></li>
                                                <li className="flex gap-3 items-start"><span className="text-[#1a5b51] font-bold mt-0.5">•</span> <span>Maintain absolute silence in the reading halls.</span></li>
                                                <li className="flex gap-3 items-start"><span className="text-[#1a5b51] font-bold mt-0.5">•</span> <span>Food and open drinks are not permitted inside.</span></li>
                                                <li className="flex gap-3 items-start"><span className="text-[#1a5b51] font-bold mt-0.5">•</span> <span>24x7 Reading Hall accessible for postgraduate students.</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Support Card */}
                            <div className="relative w-full rounded-[24px] overflow-hidden shadow-lg border border-[#e4ece9] flex items-center justify-center p-6 min-h-[460px]">
                                {/* Blurred library bg */}
                                <div className="absolute inset-0 z-0">
                                    <img src={libraryImg1} alt="Library Background" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
                                </div>
                                
                                {/* Modal Box */}
                                <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-[20px] p-8 md:p-10 w-full max-w-[360px] text-center shadow-2xl border border-white/50 space-y-6">
                                    <div>
                                        <h3 className="text-[#657d9f] font-serif text-2xl mb-3">Need Assistance?</h3>
                                        <p className="text-[13px] text-gray-500 leading-relaxed font-medium">
                                            Librarian's Office is on the 2nd Floor.<br />
                                            We're here to help with your research.
                                        </p>
                                    </div>
                                    
                                    <div className="h-[1px] w-full bg-gray-200"></div>
                                    
                                    <div className="text-left text-[13px] text-gray-600 space-y-2">
                                        <div className="flex items-start justify-center gap-2 mb-1">
                                            <MapPin className="w-4 h-4 text-[#657d9f] shrink-0 mt-0.5" />
                                            <span className="font-bold text-[#2c3e50] text-[14px]">Location</span>
                                        </div>
                                        <p className="text-center text-gray-500 leading-relaxed px-2">
                                            LDCE Library, Opposite Gujarat University,<br />
                                            Navrangpura, Ahmedabad - 380015
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                </div>

            {/* Gallery Section */}
            <div className="container mx-auto px-4 py-12 md:py-24 max-w-7xl">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="pr-0 md:pr-4">
                        <h2 className="text-[32px] md:text-[40px] font-serif text-[#1c2e3d] mb-10 md:mb-14 leading-tight">
                            State-of-the-Art Facilities
                        </h2>
                        
                        <div className="grid grid-cols-2 gap-x-6 gap-y-10 mb-12">
                            {/* Item 1 */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <BookOpen className="w-5 h-5 text-[#1a5b51]" strokeWidth={2.5} />
                                    <h4 className="font-bold text-[#1c2e3d]">Reading Halls</h4>
                                </div>
                                <p className="text-[13px] text-[#5b6c7a] leading-relaxed">Quiet, temperature-controlled spaces with a capacity of 500+ students.</p>
                            </div>
                            
                            {/* Item 2 */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Monitor className="w-5 h-5 text-[#1a5b51]" strokeWidth={2.5} />
                                    <h4 className="font-bold text-[#1c2e3d]">Digital Rooms</h4>
                                </div>
                                <p className="text-[13px] text-[#5b6c7a] leading-relaxed">Equipped with high-performance workstations and GTU e-library access.</p>
                            </div>
                            
                            {/* Item 3 */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Wifi className="w-5 h-5 text-[#1a5b51]" strokeWidth={2.5} />
                                    <h4 className="font-bold text-[#1c2e3d]">High-speed WiFi</h4>
                                </div>
                                <p className="text-[13px] text-[#5b6c7a] leading-relaxed">Campus-wide seamless connectivity for all registered students.</p>
                            </div>
                            
                            {/* Item 4 */}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <Cpu className="w-5 h-5 text-[#1a5b51]" strokeWidth={2.5} />
                                    <h4 className="font-bold text-[#1c2e3d]">Technical Resources</h4>
                                </div>
                                <p className="text-[13px] text-[#5b6c7a] leading-relaxed">Access to premium IEEE, ASME journals and research databases.</p>
                            </div>
                        </div>

                        <Link to="/about" className="inline-flex items-center gap-1.5 text-[#1a5b51] font-bold text-[14px] hover:text-[#134840] transition-all group border-b-2 border-transparent hover:border-[#1a5b51]">
                            Explore More <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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


        </div>
    );
};

export default Home;
