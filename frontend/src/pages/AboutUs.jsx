import React from 'react';
import libraryImg3 from '../assets/library-3.jpg';
import libraryImg1 from '../assets/library-1.jpg';
import libraryImg2 from '../assets/library-2.jpg';
import libraryImg4 from '../assets/library-4.jpg';


const AboutUs = () => {
    return (
        <div className="container mx-auto px-4 py-8">

            {/* Introduction */}
            <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
                <div className="md:w-1/2">
                    {/* Using placeholder for the library entrance image */}
                    <img
                        src={libraryImg3}
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
                        src={libraryImg4}
                        alt="Reading Room"
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

            {/* Library Committee Section */}
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-brand-blue pl-4">
                    Library Committee
                </h2>
                <div className="bg-white rounded-xl shadow-lg run-in overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#4c7c9b] text-white uppercase text-sm tracking-wider">
                                    <th className="px-6 py-4 font-semibold w-16">#</th>
                                    <th className="px-6 py-4 font-semibold">Name of Staff</th>
                                    <th className="px-6 py-4 font-semibold">Designation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {[
                                    { id: 1, name: "Prof.(Dr.) Shahnawazkhan S. Pathan", designation: "Officer-in-Charge & Associate Professor(Mechanical)" },
                                    { id: 2, name: "Prof.(Dr.) Mahendrasinh S. Gadhavi", designation: "Assistant Professor(Civil)" },
                                    { id: 3, name: "Prof. Zalalkumar Chhaya", designation: "Assistant Professor(Civil)" },
                                    { id: 4, name: "Prof.(Dr.)Pradip R. Patel", designation: "Assistant Professor(IT)" },
                                    { id: 5, name: "Prof. Hitesh D. Rajput", designation: "Assistant Professor(Computer)" }
                                ].map((member) => (
                                    <tr key={member.id} className="hover:bg-blue-50 transition-colors duration-150">
                                        <td className="px-6 py-4 font-medium text-gray-400">{member.id}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">{member.name}</td>
                                        <td className="px-6 py-4">{member.designation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Library Staff Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-l-4 border-brand-blue pl-4">
                    Library Staff
                </h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#4c7c9b] text-white uppercase text-sm tracking-wider">
                                    <th className="px-6 py-4 font-semibold w-16">#</th>
                                    <th className="px-6 py-4 font-semibold">Name of Staff</th>
                                    <th className="px-6 py-4 font-semibold">Designation</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {[
                                    { id: 1, name: "Smt. Sunita A. Captain", designation: "Assistant Librarian" },
                                    { id: 2, name: "Shri Sanjay K. Desai", designation: "Clerk" },
                                    { id: 3, name: "Shri Umashankar D. Pasi", designation: "Shop Lab Attendant" }
                                ].map((staff) => (
                                    <tr key={staff.id} className="hover:bg-blue-50 transition-colors duration-150">
                                        <td className="px-6 py-4 font-medium text-gray-400">{staff.id}</td>
                                        <td className="px-6 py-4 font-semibold text-gray-800">{staff.name}</td>
                                        <td className="px-6 py-4">{staff.designation}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutUs;
