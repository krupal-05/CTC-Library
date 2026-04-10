import React from "react";
import Mahendrasinh from "../../assets/CommiteePic/Mahendrasinh_Gadhavi.png";
import Shahnawazkhan from "../../assets/CommiteePic/Shahnawazkhan.png";
import Zalalkumar from "../../assets/CommiteePic/ZalakhKumar.png";
import Pradip from "../../assets/CommiteePic/Pradip.png";
import Hitesh from "../../assets/CommiteePic/Hitesh.png";
import download from "../../assets/CommiteePic/download.png";

const Committee = () => {
  const members = [
    {
      name: "Prof.(Dr.) Shahnawazkhan S. Pathan",
      Designation: "Officer-in-Charge & Associate Professor(Mechanical)",
      email: "pathan_ss@yahoo.co.in",
      image: Shahnawazkhan
    },
    {
      name: "Prof.(Dr.) Mahendrasinh S. Gadhavi",
      Designation: "Assistant Professor(Civil)",
      email: "mahendrasinh@gmail.com",
      image: Mahendrasinh
    },
    {
      name: "Prof.Zalalkumar Chhaya",
      Designation: "Assistant Professor(Civil)",
      email: "zrchhaya@yahoo.com",
      image: Zalalkumar
    },

     {
      name: "Prof.(Dr.)Pradip R. Patel",
      Designation: "Assistant Professor(IT)",
      email: "pradippatel@ldce.ac.in",
      image: Pradip
    },
    {
      name: "Prof.Hitesh D. Rajput",
      Designation: "Assistant Professor(Computer)",
      email: "hitesh.rajput@ldce.ac.in",
      image: Hitesh
    }
  ];

  const staff = [
        {
        name: "Smt. Sunita A. Captain",
        Designation: "Assistant Librarian",
        email: "sunitacaptain@gmail.com",   
        image: download
        },
    {
      name: "Shri Sanjay K. Desai",
      Designation: "Clerk",
      email: "sanjay.desai@ldce.ac.in",   
      image:download
    },
    {
      name: "Shri Umashankar D. Pasi",
      Designation: "Shop Lab Attendant",
      email: "umeshkar@ldce.ac.in",   
      image: download
    },
  ];
  return (
    <>
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Library Committee
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-3 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-500">{member.Designation}</p>
            <p className="text-sm text-gray-400">{member.email}</p>
          </div>
        ))}
      </div>
    </div>
     <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
        Library staff
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staff.map((member, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-xl p-3 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-gray-500">{member.Designation}</p>
            <p className="text-sm text-gray-400">{member.email}</p>
          </div>
        ))}
      </div>
     </div>
    </>
  );
};

export default Committee;