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
        <div className="bg-white py-10 w-full mt-8 shadow-sm">
            <div className="container mx-auto px-4 flex items-center">
                {/* Title Section */}
                <div className="flex flex-col gap-2 w-48 shrink-0 pr-6 mr-4 border-r border-gray-200">
                    <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                        New Arrivals
                    </h2>
                    <div className="w-full h-1 bg-accent mt-1 mb-4"></div>
                    <button className="new-arrivals-prev text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-gray-100 w-10 h-10 w-fit">
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Swiper Slider */}
                <div className="flex-1 w-full overflow-hidden">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        spaceBetween={20}
                        slidesPerView={5}
                        slidesPerGroup={5}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        navigation={{
                            nextEl: '.new-arrivals-next',
                            prevEl: '.new-arrivals-prev',
                        }}
                        breakpoints={{
                            320: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 10 },
                            768: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 15 },
                            1024: { slidesPerView: 4, slidesPerGroup: 4, spaceBetween: 20 },
                            1280: { slidesPerView: 5, slidesPerGroup: 5, spaceBetween: 20 },
                        }}
                        className="w-full !px-2 !py-4"
                    >
                        {dummyBooks.map((book) => (
                            <SwiperSlide key={book.id}>
                                <div className="group relative overflow-hidden rounded border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white flex flex-col h-full cursor-pointer">
                                    <div className="aspect-[3/4] w-full overflow-hidden relative bg-gray-50 flex items-center justify-center p-2">
                                        <img 
                                            src={book.url} 
                                            alt={book.title} 
                                            className="w-full h-full object-cover shadow-sm"
                                        />
                                    </div>
                                    <div className="p-3 text-center border-t border-gray-100 mt-auto bg-gray-50/50 group-hover:bg-gray-100 transition-colors">
                                        <h3 className="text-sm font-medium text-gray-800 line-clamp-1" title={book.title}>{book.title}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right Arrow */}
                <div className="shrink-0 pl-6 ml-2">
                    <button className="new-arrivals-next text-gray-400 hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-gray-100 w-10 h-10">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;
