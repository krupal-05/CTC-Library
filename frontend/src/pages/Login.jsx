import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [role, setRole] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/users/login',
                { email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            if (data.role === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/student'); // Redirect to student dashboard
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-[#4c7c9b] rounded-3xl shadow-xl w-full max-w-md p-8 md:p-12 text-center text-white">

                <h2 className="text-3xl font-bold mb-8 underline underline-offset-8 decoration-2">Login</h2>

                {/* Role Toggle */}
                <div className="flex justify-center gap-6 mb-8 text-sm font-medium">
                    <label className="flex items-center cursor-pointer gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center`}>
                            {role === 'student' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                        </div>
                        <span>Student</span>
                        <input
                            type="radio"
                            name="role"
                            className="hidden"
                            checked={role === 'student'}
                            onChange={() => setRole('student')}
                        />
                    </label>
                    <label className="flex items-center cursor-pointer gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 border-white flex items-center justify-center`}>
                            {role === 'admin' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                        </div>
                        <span>Admin</span>
                        <input
                            type="radio"
                            name="role"
                            className="hidden"
                            checked={role === 'admin'}
                            onChange={() => setRole('admin')}
                        />
                    </label>
                </div>

                {error && <div className="bg-red-500 text-white p-3 rounded mb-4 text-sm font-semibold animate-pulse">{error}</div>}

                {/* Form */}
                <form className="space-y-6" onSubmit={handleLogin}>
                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            className="w-full bg-gray-200/90 text-gray-800 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@library.com"
                        />
                    </div>

                    <div className="text-left">
                        <label className="block text-xl font-semibold mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full bg-gray-200/90 text-gray-800 rounded-full py-3 px-6 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password123"
                        />
                        <div className="text-right mt-2">
                            <a href="#" className="text-xs text-white hover:underline">Forget Password ?</a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="bg-white text-gray-800 font-bold py-2 px-10 rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-8 text-xs text-gray-200">
                    You Have No Account ? <a href="/register" className="font-bold hover:underline">Register</a>
                </div>

            </div>
        </div>
    );
};

export default Login;
