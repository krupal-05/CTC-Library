import React from "react";
import defaultImg from "../../assets/default-user.png"; // 👈 add a default image here

const Librarian = () => {
  return (
    <div className="container px-10 py-12 lg:py-16">
      
      {/* Top Heading */}
      <h1 className="text-4xl font-semibold mb-10 pl-8 h-auto w-auto p-2 rounded-lg bg-blue-500 text-center">
        Librarian Profile
      </h1>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-8">
        
        {/* LEFT SIDE (Details) */}
        <div className="space-y-4 text-gray-700 pl-8">
          
          <h2 className="text-3xl font-semibold text-gray-900">
           Smt. Sunita A. Captain
          </h2>

          <p>
            <span className="font-semibold">	Designation: </span>{" "}
            Assistant Librarian
          </p>

          <p><span className="font-semibold">BE:</span> ABC, 2000</p>
          <p><span className="font-semibold">MTech:</span> ABC, 2000</p>
          <p><span className="font-semibold">PhD:</span> ABC, 2000</p>

          <p>
            <span className="font-semibold">Email:</span>{" "}
            <a
              href="mailto:abhishek@iitgn.ac.in"
              className="text-blue-600 hover:underline"
            >
              abc@ldce.ac.in
            </a>
          </p>

         

        </div>

        {/* RIGHT SIDE (Image) */}
        <div className="flex justify-center ">
          <img
            src={defaultImg}
            alt="Profile"
            className="w-[300px] h-[320px] shadow-lg object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default Librarian;