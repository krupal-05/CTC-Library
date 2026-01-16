import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Hash, Calendar, BookOpen, Users } from 'lucide-react';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        enrollmentNo: '',
        gender: 'Male',
        year: '1st Year',
        department: 'Computer Engineering',
        role: 'student'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/users',
                formData,
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/student'); // Redirect to student dashboard
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#4c7c9b] rounded-3xl shadow-xl w-full max-w-4xl p-8 md:p-12 text-white flex flex-col md:flex-row gap-8">

                {/* Left Side: Form */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-8 underline underline-offset-8 decoration-2 text-center md:text-left">Register Student</h2>

                    {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm font-semibold animate-pulse">{error}</div>}

                    <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InputGroup icon={<User size={18} />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
                            <InputGroup icon={<Mail size={18} />} name="email" placeholder="Email Address" type="email" value={formData.email} onChange={handleChange} />
                            <InputGroup icon={<Lock size={18} />} name="password" placeholder="Password" type="password" value={formData.password} onChange={handleChange} />
                            <InputGroup icon={<Hash size={18} />} name="enrollmentNo" placeholder="Enrollment No" value={formData.enrollmentNo} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SelectGroup icon={<Users size={18} />} name="gender" value={formData.gender} onChange={handleChange} options={['Male', 'Female', 'Other']} />
                            <SelectGroup icon={<Calendar size={18} />} name="year" value={formData.year} onChange={handleChange} options={['1st Year', '2nd Year', '3rd Year', '4th Year']} />
                        </div>

                        <SelectGroup icon={<BookOpen size={18} />} name="department" value={formData.department} onChange={handleChange} options={['Computer Engineering', 'Information Technology', 'Civil Engineering', 'Mechanical Engineering', 'Electrical Engineering']} />


                        <button
                            type="submit"
                            className="w-full bg-white text-gray-800 font-bold py-3 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105 mt-6"
                        >
                            Register
                        </button>
                    </form>

                    <div className="mt-6 text-xs text-gray-200 text-center md:text-left">
                        Already have an account? <a href="/login" className="font-bold hover:underline">Login</a>
                    </div>
                </div>

                {/* Right Side: Illustration/Text (Optional) */}
                <div className="hidden md:flex flex-1 flex-col justify-center items-center text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                    <User size={100} className="mb-4 text-white/80" />
                    <h3 className="text-2xl font-bold mb-2">Join the Library</h3>
                    <p className="text-sm text-white/80">
                        Create your account to access thousands of books, manage your reading list, and more.
                    </p>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ icon, type = "text", ...props }) => (
    <div className="relative">
        <div className="absolute left-3 top-3.5 text-gray-500">
            {icon}
        </div>
        <input
            type={type}
            className="w-full bg-gray-200/90 text-gray-800 rounded-full py-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-500 text-sm"
            {...props}
        />
    </div>
);

const SelectGroup = ({ icon, options, ...props }) => (
    <div className="relative">
        <div className="absolute left-3 top-3.5 text-gray-500">
            {icon}
        </div>
        <select
            className="w-full bg-gray-200/90 text-gray-800 rounded-full py-3 pl-10 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-300 appearance-none text-sm cursor-pointer"
            {...props}
        >
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <div className="absolute right-4 top-4 text-gray-500 pointer-events-none">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
        </div>
    </div>
);

export default Register;
