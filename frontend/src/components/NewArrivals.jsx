import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const dummyBooks = [
    { id: 1, title: 'Many-Particle Physics', url: 'https://covers.openlibrary.org/b/id/8259443-L.jpg' },
    { id: 2, title: 'The Theory of Heat Radiation', url: 'https://covers.openlibrary.org/b/id/8259451-L.jpg' },
    { id: 3, title: 'Effective Field Theory', url: 'https://covers.openlibrary.org/b/id/8259463-L.jpg' },
    { id: 4, title: 'The Knowledge Gene', url: 'https://covers.openlibrary.org/b/id/8259477-L.jpg' },
    { id: 5, title: 'Machine Learning Evaluation', url: 'https://covers.openlibrary.org/b/id/8259489-L.jpg' },
    { id: 6, title: 'Quantum Computing', url: 'https://covers.openlibrary.org/b/id/8259501-L.jpg' },
    { id: 7, title: 'Appraisal Strategies', url: 'https://covers.openlibrary.org/b/id/8259513-L.jpg' },
    { id: 8, title: 'Physics and Philosophy', url: 'https://covers.openlibrary.org/b/id/8259525-L.jpg' },
    { id: 9, title: 'Astrophysics', url: 'https://covers.openlibrary.org/b/id/8259535-L.jpg' },
    { id: 10, title: 'Mechanics', url: 'https://covers.openlibrary.org/b/id/8259545-L.jpg' },
];

const NewArrivals = () => {
    return (
        <div className="pt-8 pb-6 w-full mt-0">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-8 w-full gap-8">
                    <h2 className="text-[32px] md:text-[40px] font-serif text-[#1c2e3d]">New Arrivals</h2>
                </div>

                {/* Swiper Slider */}
                <div className="w-full relative group">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={24}
                        slidesPerView={5}
                        slidesPerGroup={1}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        navigation={{
                            nextEl: '.new-arrivals-next',
                            prevEl: '.new-arrivals-prev',
                        }}
                        breakpoints={{
                            320: { slidesPerView: 2, spaceBetween: 12 },
                            768: { slidesPerView: 3, spaceBetween: 16 },
                            1024: { slidesPerView: 4, spaceBetween: 24 },
                            1280: { slidesPerView: 5, spaceBetween: 24 },
                        }}
                        className="w-full !py-6"
                    >
                        {dummyBooks.map((book, idx) => (
                            <SwiperSlide key={book.id}>
                                <div className="group/card cursor-pointer">
                                    <div className="aspect-[3/4] w-full rounded-[12px] overflow-hidden relative shadow-[0_8px_20px_rgba(0,0,0,0.12)] group-hover/card:shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition-all duration-300 transform group-hover/card:-translate-y-1">
                                        <img 
                                            src={book.url} 
                                            alt={book.title} 
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-3 right-3 bg-[#1c2e3d]/85 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                                            {idx % 3 === 1 ? 'On Loan' : 'In-Library'}
                                        </div>
                                    </div>
                                    <div className="mt-4 px-1">
                                        <h3 className="text-[14px] font-bold text-[#1c2e3d] line-clamp-1 group-hover/card:text-[#1a5b51] transition-colors" title={book.title}>{book.title}</h3>
                                        <p className="text-[12px] text-gray-500 mt-0.5">QA 76.73 .P98</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    
                    {/* Navigation Arrows */}
                    <button className="new-arrivals-prev absolute left-0 top-[40%] -translate-y-1/2 -ml-5 z-10 bg-white/90 text-[#1c2e3d] flex items-center justify-center rounded-full w-10 h-10 shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-[#1a5b51]">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button className="new-arrivals-next absolute right-0 top-[40%] -translate-y-1/2 -mr-5 z-10 bg-white/90 text-[#1c2e3d] flex items-center justify-center rounded-full w-10 h-10 shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-[#1a5b51]">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
