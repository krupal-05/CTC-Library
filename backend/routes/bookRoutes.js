const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// @desc    Get all books
// @route   GET /api/books
// @access  Public
router.get('/', async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                $or: [
                    { title: { $regex: req.query.keyword, $options: 'i' } },
                    { author: { $regex: req.query.keyword, $options: 'i' } },
                ],
            }
            : {};

        const books = await Book.find({ ...keyword });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add a book
// @route   POST /api/books
// @access  Public (Should be Admin only, keeping simple for now)
router.post('/', async (req, res) => {
    try {
        const book = new Book(req.body);
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add book' });
    }
});

module.exports = router;
