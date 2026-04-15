import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Award, AtSign, Share2 } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#2c3e50] text-[#a0aab2] pt-16 mt-auto">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl grid grid-cols-1 lg:grid-cols-4 gap-12 md:gap-16">

                {/* Brand & Description */}
                <div className="lg:col-span-2">
                    <h3 className="font-serif font-bold text-[22px] text-[#3ab795] mb-6">LDCE Library</h3>
                    <p className="text-[13px] leading-[1.8] text-[#d1d8dd] mb-8 max-w-md">
                        L.D. College of Engineering Library is committed to providing world-class educational resources to our student body.
                    </p>
                    <div className="flex items-center gap-5 text-gray-400">
                        <Award className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                        <AtSign className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                        <Share2 className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                    </div>
                </div>



                {/* Affiliations */}
                <div>
                    <h4 className="font-serif font-bold text-[15px] text-white mb-6">Affiliations</h4>
                    <ul className="space-y-4 text-[13px] text-[#d1d8dd] font-medium">
                        <li><a href="https://ldce.ac.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">ldce.ac.in</a></li>
                        <li><a href="https://student.gtu.ac.in" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">student.gtu.ac.in</a></li>
                        <li><span className="hover:text-white transition-colors cursor-default">Gujarat University</span></li>
                        <li><span className="hover:text-white transition-colors cursor-default">NPTEL Local Chapter</span></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h4 className="font-serif font-bold text-[15px] text-white mb-6">Contact Us</h4>
                    <div className="space-y-5 text-[13px] text-[#d1d8dd] font-medium">
                        <div className="flex items-center gap-3">
                            <Mail className="w-4 h-4 text-[#3ab795]" />
                            <span>library@ldce.ac.in</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Phone className="w-4 h-4 text-[#3ab795]" />
                            <span>+91 079-26306752</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-[#3ab795] mt-0.5 shrink-0" />
                            <span>LDCE Campus, Ahmedabad</span>
                        </div>
                    </div>
                </div>

            </div>

            <div className="border-t border-white/10 mt-16 py-6 text-center text-[12px] text-[#a0aab2]">
                © {new Date().getFullYear()} L.D. College of Engineering Library. All rights reserved. | <Link to="/privacy" className="hover:text-white transition-colors hover:underline">Privacy Policy</Link>
            </div>
        </footer>
    );
};

export default Footer;
