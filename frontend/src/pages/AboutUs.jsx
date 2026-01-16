import React from 'react';

const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">

            {/* Introduction */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
                <div className="md:w-1/2">
                    {/* Using placeholder for the library entrance image */}
                    <img
                        src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1470&auto=format&fit=crop"
                        alt="Library Entrance"
                        className="w-full h-auto rounded-lg shadow-lg border-4 border-gray-200"
                    />
                </div>
                <div className="md:w-1/2 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4">
                        The Central Library of L.D. College of Engineering is a hub of knowledge and learning, providing comprehensive resources and services to support academic and research activities.
                    </p>
                    <p>
                        The Central Library of the renowned institute of the state, L. D. College of Engineering, Ahmedabad is the hub for information services in the institute, gathering place for the faculties & students of diversified technological areas and also serves as a major learning and resource centre. It is a creative and innovative partner in supporting the teaching, learning, scholarship and research activities of the institute.
                    </p>
                </div>
            </div>

            {/* Facilities Section */}
            <div className="flex flex-col md:flex-row-reverse gap-8 items-start mb-16">
                <div className="md:w-1/3 grid gap-4">
                    {/* Interior Library Shots */}
                    <img
                        src="https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=715&auto=format&fit=crop"
                        alt="Reading Room"
                        className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1529148482759-b35b25c5f634?q=80&w=715&auto=format&fit=crop"
                        alt="Book Shelves"
                        className="w-full h-80 object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="md:w-2/3 text-gray-700 text-lg leading-relaxed">
                    <p className="mb-4">
                        With the fast growing collection, both in digital and print forms using the state-of-the-art facilities, the Central library of the institute is contributing exponentially to provide a world class academic environment with the institute.
                    </p>
                    <p>
                        It is located in a separate building having beautiful landscape of lush green plants within the campus which gives a pleasant ambience to the readers. Well-furnished and illuminated location creates an atmosphere of serenity that motivates the readers to have effective learning and research activities.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;
