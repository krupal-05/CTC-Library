import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";




const ContactPage = () => {
  return (
    <div className="container mx-auto px-16 py-10 ">
      
      {/* Heading */}
      <div className="">
      <h1 className=" text-4xl font-semibold mb-10 pl-8 h-auto w-auto p-2 rounded-lg bg-blue-500 text-center">
        Ask Us
      </h1>
</div>

      {/* Main Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-5 ">
        
        {/* LEFT SIDE (Contact Info) */}
       <div className="space-y-6 text-gray-700 pl-8 text-[19px] border border-solid border-blue-200 h-[350px] rounded-2xl flex justify-center items-start flex-col 
 hover:scale-105 transition-transform duration-300 ease-in-out">

          {/* Circulation */}
         <div>
  <p className="font-semibold">Assistant Librarian:</p>
  <a
    href="mailto:abc@iitgn.ac.in"
    className="text-green-600 hover:underline"
  >
    abc@iitgn.ac.in
  </a>
</div>

<div>
  <p className="font-semibold">Clerk:</p>
  <a
    href="mailto:abc@iitgn.ac.in"
    className="text-green-600 hover:underline"
  >
    abc@iitgn.ac.in
  </a>
</div>

<div>
  <p className="font-semibold">Shop Lab Attendant:</p>
  <a
    href="mailto:abc@iitgn.ac.in"
    className="text-green-600 hover:underline"
  >
    abc@iitgn.ac.in
  </a>
</div>


{/* 
          Main Library: 079-2395-1129, 1127, 1128, 1126, 2431
Mini-Library: 079 – 2395-1130 */}
       



          {/* Social Icons */}
        <div className="flex gap-4 pt-4">

  {/* Facebook */}
  <a 
    href="https://www.facebook.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full hover:scale-110 transition"
  >
   <FaFacebook />
  </a>

  {/* Instagram */}
  <a 
    href="https://www.instagram.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-pink-500 text-white flex items-center justify-center rounded-full hover:scale-110 transition"
  >
  <FaInstagram />

  </a>

  {/* LinkedIn */}
  <a 
    href="https://www.linkedin.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-full hover:scale-110 transition"
  >
    <FaLinkedin />
  </a>


  {/* Twitter / X */}
  <a 
    href="https://twitter.com" 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 bg-blue-400 text-white flex items-center justify-center rounded-full hover:scale-110 transition"
  >
   <FaSquareXTwitter />

  </a>

</div>



        </div>

   {/* RIGHT SIDE (Google Map) */}
<div className="w-full h-[400px] pb-10">
  <iframe
    title="LDCE Library Map"
    src="https://www.google.com/maps?q=LD+College+of+Engineering+Library+Ahmedabad&output=embed"
    className="w-full h-full rounded-xl border"
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>

      </div>
    </div>
  );
};

export default ContactPage;