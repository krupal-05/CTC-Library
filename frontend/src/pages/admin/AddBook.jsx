import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, X } from 'lucide-react';

const AddBookObj = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        description: '',
        totalQuantity: 1,
        imageUrl: '' // Will store Base64 string
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, imageUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // Ensure availableQuantity matches totalQuantity on creation
            const bookData = {
                ...formData,
                availableQuantity: parseInt(formData.totalQuantity)
            };

            await axios.post('http://localhost:5000/api/books', bookData, config);
            alert('Book Added Successfully!');
            navigate('/admin/books'); // Redirect to all books
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Failed to add book');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Add New Book</h1>
                    <p className="text-gray-500">Expand the library collection</p>
                </div>
                <button onClick={() => navigate('/admin/manage-books')} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                    <X size={24} />
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {error && <div className="bg-red-50 text-red-500 p-4 border-b border-red-100">{error}</div>}

                <form onSubmit={handleSubmit} className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column: Details */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Book Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    placeholder="e.g. The Great Gatsby"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    placeholder="Author Name"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">ISBN</label>
                                    <input
                                        type="text"
                                        name="isbn"
                                        value={formData.isbn}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        placeholder="ISBN-13"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Fiction">Fiction</option>
                                        <option value="Science">Science</option>
                                        <option value="Technology">Technology</option>
                                        <option value="Philosophy">Philosophy</option>
                                        <option value="History">History</option>
                                        <option value="Business">Business</option>
                                        <option value="Biography">Biography</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Quantity</label>
                                <input
                                    type="number"
                                    name="totalQuantity"
                                    min="1"
                                    value={formData.totalQuantity}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Right Column: Visuals & Desc */}
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Image</label>
                                <div className={`border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors ${formData.imageUrl ? 'bg-gray-50' : ''}`}>
                                    {formData.imageUrl ? (
                                        <div className="relative group w-full">
                                            <img src={formData.imageUrl} alt="Cover Preview" className="h-48 w-auto mx-auto object-contain rounded-lg shadow-sm" />
                                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                                                <span className="text-white text-sm font-medium">Change Image</span>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-3">
                                                <Upload size={20} />
                                            </div>
                                            <span className="text-sm font-medium text-gray-700">Click to upload cover</span>
                                            <span className="text-xs text-gray-400 mt-1">PNG, JPG, or WEBP</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all h-32 resize-none"
                                    placeholder="Write a brief summary of the book..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/manage-books')}
                            className="px-6 py-3 rounded-xl font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-[#4c7c9b] hover:bg-[#3a6580] text-white rounded-xl font-bold shadow-lg shadow-blue-900/10 transition-all transform active:scale-95 flex items-center gap-2"
                        >
                            {loading ? 'Saving...' : <><Upload size={18} /> Add to Library</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBookObj;
