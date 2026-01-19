const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Activity = require('../models/Activity'); // Import Activity
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all books
// ... (GET route remains same)
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

// @desc    Get single book
// @route   GET /api/books/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Add a book
// @route   POST /api/books
// @access  Public (Should be Admin only, keeping simple for now)
router.post('/', async (req, res) => {
    try {
        if (req.body.availableQuantity === undefined && req.body.totalQuantity !== undefined) {
            req.body.availableQuantity = req.body.totalQuantity;
        }
        const book = new Book(req.body);
        const createdBook = await book.save();

        // Log Activity
        await Activity.create({
            action: 'ADD_BOOK',
            user: 'Admin', // Assuming Admin usually adds books
            details: `Added new book: ${book.title} (Qty: ${book.totalQuantity})`
        });

        res.status(201).json(createdBook);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Failed to add book' });
    }
});

// @desc    Delete a book
// @route   DELETE /api/books/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            await book.deleteOne();
            res.json({ message: 'Book removed' });
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
