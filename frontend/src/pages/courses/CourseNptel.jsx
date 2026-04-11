import { courses } from './coursesData';
import React from 'react';
const Coursenptel = () => {
  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 min-h-[60vh]">
      <h1 className="text-4xl lg:text-5xl font-black text-primary uppercase tracking-widest mb-6 lg:mb-10 text-center">
        NPTEL Courses
      </h1>

      <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-6 text-gray-500">

          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
            <span className="text-4xl text-accent">🚧</span>
          </div>

          <h1 className="text-4xl text-center mb-6">NPTEL Courses</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-10">
            {courses.map((course, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition"
              >
                <h2 className="text-lg font-semibold mb-3">
                  {course.name}
                </h2>

                <p className="text-gray-600 mb-4">
                  {course.description}
                </p>

                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-5 py-2 rounded-full inline-block hover:bg-green-700"
                >
                  🎓 Watch
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mb-10">
            <a
              href="https://onlinecourses.nptel.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 text-white px-6 py-3 rounded-full"
            >
              🌐 Explore All Courses
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Coursenptel;