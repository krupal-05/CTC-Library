
import React from 'react';

const CourseOnos = () => {

    const courses = [
        {
            name: "Access Research Journals",
            link: "https://www.onos.gov.in"
        },
        {
            name: "Scientific Papers",
           link: "https://www.onos.gov.in"
        },
        {
            name: "Webinars & Events",
            link: "https://www.onos.gov.in"
        },
        {
            name: "Academic Publications",
            link: "https://www.onos.gov.in"
        },
        
    ];

    return (
        <div className="container mx-auto px-4 py-12">

            <h1 className="text-4xl font-bold text-center mb-10">
                ONOS Courses
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow text-center">
                        
                        <h2 className="text-lg font-semibold mb-4">
                            {course.name}
                        </h2>

                        <a
                            href={course.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-600 text-white px-4 py-2 rounded-full"
                        >
                            View 
                        </a>

                    </div>
                ))}
            </div>
             <div className="flex justify-center mt-12">
        <a
          href="https://www.onos.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition"
        >
          🌐 Explore ONOS Courses
        </a>
      </div>

        </div>
    );
};

export default CourseOnos;