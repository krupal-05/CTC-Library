const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    isbn: { type: String },
    category: { type: String },
    description: { type: String },
    imageUrl: { type: String },
    totalQuantity: { type: Number, default: 1 },
    availableQuantity: { type: Number, default: 1 },
}, {
    timestamps: true
});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
