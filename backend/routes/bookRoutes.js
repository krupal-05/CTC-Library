const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const Activity = require('../models/Activity'); // Import Activity
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all books
// ... (GET route remains same)
router.get('/', async (req, res) => {
    try {
        const pageSize = Number(req.query.limit) || 20;
        const page = Number(req.query.page) || 1;

        // Build Filter Query
        const keyword = req.query.keyword
            ? {
                $or: [
                    { title: { $regex: req.query.keyword, $options: 'i' } },
                    { author: { $regex: req.query.keyword, $options: 'i' } },
                ],
            }
            : {};

        if (req.query.udc) {
            keyword.udc = req.query.udc;
        }

        if (req.query.available === 'true') {
            keyword.availableQuantity = { $gt: 0 };
        } else if (req.query.available === 'borrowed') {
            keyword.availableQuantity = { $lte: 0 };
        }

        // Build Sort Option
        let sortOption = { createdAt: -1 }; // Default: Newest first
        if (req.query.sort === 'oldest') {
            sortOption = { createdAt: 1 };
        } else if (req.query.sort === 'alpha_asc') {
            sortOption = { title: 1 };
        } else if (req.query.sort === 'alpha_desc') {
            sortOption = { title: -1 };
        }

        const count = await Book.countDocuments({ ...keyword });
        const books = await Book.find({ ...keyword })
            .sort(sortOption)
            .limit(pageSize)
            .skip(pageSize * (page - 1));

        res.json({ books, page, pages: Math.ceil(count / pageSize), totalBooks: count });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get book counts by UDC
// @route   GET /api/books/udc-counts
// @access  Public
router.get('/udc-counts', async (req, res) => {
    try {
        const counts = await Book.aggregate([
            {
                $group: {
                    _id: "$udc",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(counts);
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
    console.log(`[DELETE BOOK] Request received for ID: ${req.params.id}`);
    try {
        const book = await Book.findById(req.params.id);

        if (book) {
            console.log(`[DELETE BOOK] Book found: ${book.title}`);
            await book.deleteOne();
            console.log(`[DELETE BOOK] Book deleted from DB`);

            // Log Activity
            try {
                console.log(`[DELETE BOOK] Logging activity for user: ${req.user ? req.user.name : 'Unknown'}`);
                await Activity.create({
                    action: 'REMOVE_BOOK',
                    user: req.user.name || 'Admin',
                    details: `Removed book: ${book.title}`
                });
                console.log(`[DELETE BOOK] Activity logged`);
            } catch (err) {
                console.error("Failed to log REMOVE_BOOK activity", err);
            }

            res.json({ message: 'Book removed' });
        } else {
            console.log(`[DELETE BOOK] Book not found`);
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error("[DELETE BOOK] Error:", error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;

// @desc    Reserve a book (Join Waitlist)
// @route   POST /api/books/:id/reserve
// @access  Private
router.post('/:id/reserve', protect, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availableQuantity > 0) {
            return res.status(400).json({ message: 'Book is available, you can borrow it directly.' });
        }

        // Check if user is already in queue
        const alreadyInQueue = book.queue.find(item => item.user.toString() === req.user._id.toString());
        if (alreadyInQueue) {
            return res.status(400).json({ message: 'You are already in the waitlist for this book.' });
        }

        // Add to queue
        book.queue.push({
            user: req.user._id
        });

        await book.save();

        res.json({ message: 'Successfully joined the waitlist.', position: book.queue.length });

    } catch (error) {
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});
