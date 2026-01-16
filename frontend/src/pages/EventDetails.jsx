import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { events } from '../data/eventsData';

const EventDetails = () => {
    const { id } = useParams();
    const event = events.find(e => e.id === parseInt(id));

    if (!event) {
        return (
            <div className="bg-gray-100 min-h-screen p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h2>
                    <Link to="/" className="text-brand-blue hover:underline">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <Link to="/" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </Link>
                </div>

                <div className="relative h-96 w-full">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
                        <h1 className="text-4xl font-bold mb-2 shadow-sm">{event.title}</h1>
                        <div className="flex flex-wrap gap-6 text-sm md:text-base">
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <Calendar size={18} />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                <MapPin size={18} />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    <div className="prose max-w-none text-gray-700 leading-relaxed mb-8">
                        <h3 className="text-xl font-semibold mb-4 text-gray-800 border-l-4 border-brand-blue pl-3">About the Event</h3>
                        <p className="text-lg">{event.description || "No description available for this event."}</p>
                    </div>

                    {event.externalLink && (
                        <div className="mt-8 border-t pt-6">
                            <a
                                href={event.externalLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg hover:bg-brand-dark transition-colors font-semibold"
                            >
                                Visit Official Page <ExternalLink size={18} />
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
