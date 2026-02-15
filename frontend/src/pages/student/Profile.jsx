import React, { useState, useEffect } from 'react';
import { User, Mail, CreditCard, Calendar, Hash, BookOpen, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        enrollmentNo: '',
        gender: '',
        year: '',
        department: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                if (!userInfo) return;

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get('http://localhost:5000/api/users/profile', config);
                setUser(data);
                setFormData(data);



                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('Failed to load profile');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put('http://localhost:5000/api/users/profile', formData, config);
            setUser(data);
            setIsEditing(false);
            // Optionally update localStorage if name/email changed
            const updatedUserInfo = { ...userInfo, ...data };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
            setError(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Update failed');
        }
    };

    const handleCancel = () => {
        setFormData(user);
        setIsEditing(false);
        setError(null);
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#4c7c9b] to-[#86a8e7] p-8 text-center text-white relative">
                    <div className="mx-auto w-32 h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border-4 border-white/50 mb-4 shadow-lg">
                        <User size={64} className="text-white" />
                    </div>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="text-2xl font-bold tracking-wide text-center text-gray-800 rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-300 w-full max-w-xs mx-auto block"
                        />
                    ) : (
                        <h1 className="text-3xl font-bold tracking-wide">{user.name}</h1>
                    )}
                    <p className="text-blue-100 font-medium mt-1 uppercase">{user.role || 'Student'}</p>

                    {error && <div className="absolute top-4 right-4 bg-red-500 px-3 py-1 rounded text-sm animate-pulse">{error}</div>}
                </div>

                {/* Details Section */}
                <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileItem
                            icon={<Hash size={20} />}
                            label="Enrollment No"
                            name="enrollmentNo"
                            value={formData.enrollmentNo || ''}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                        <ProfileItem
                            icon={<Mail size={20} />}
                            label="Email ID"
                            name="email"
                            value={formData.email || ''}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                        <ProfileItem
                            icon={<User size={20} />}
                            label="Gender"
                            name="gender"
                            value={formData.gender || 'male'}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                        <ProfileItem
                            icon={<Calendar size={20} />}
                            label="Year"
                            name="year"
                            value={formData.year || '3rd'}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                        <ProfileItem
                            icon={<BookOpen size={20} />}
                            label="Department"
                            name="department"
                            value={formData.department || 'Information Technology'}
                            isEditing={isEditing}
                            onChange={handleChange}
                        />
                    </div>
                </div>



                {/* Footer / Actions */}
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-end gap-3">
                    {isEditing ? (
                        <>
                            <button onClick={handleCancel} className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 transition-colors">
                                <X size={18} /> Cancel
                            </button>
                            <button onClick={handleSave} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4c7c9b] text-white hover:bg-[#3b6683] transition-colors shadow-md">
                                <Save size={18} /> Save Changes
                            </button>
                        </>
                    ) : (
                        <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#4c7c9b] hover:bg-blue-50 font-medium transition-colors border border-transparent hover:border-blue-100">
                            <Edit2 size={18} /> Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div >
    );
};

const ProfileItem = ({ icon, label, name, value, isEditing, onChange }) => (
    <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100/50 hover:border-gray-200">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-[#4c7c9b] flex items-center justify-center shrink-0">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
            {isEditing ? (
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full text-gray-800 font-medium text-lg border-b border-gray-300 focus:border-[#4c7c9b] outline-none bg-transparent"
                />
            ) : (
                <p className="text-gray-800 font-medium text-lg min-h-[1.75rem]">{value || '-'}</p>
            )}
        </div>
    </div>
);

export default Profile;
