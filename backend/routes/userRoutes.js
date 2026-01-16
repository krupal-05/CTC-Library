const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register new user
// @route   POST /api/users
// @access  Public
router.post('/', async (req, res) => {

    const { name, email, password, role, enrollmentNo, gender, year, department } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role, // 'student' or 'admin'
            enrollmentNo,
            gender,
            year,
            department
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                enrollmentNo: user.enrollmentNo,
                gender: user.gender,
                year: user.year,
                department: user.department,
                token: generateToken(user.id),
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const { protect } = require('../middleware/authMiddleware');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            enrollmentNo: user.enrollmentNo,
            gender: user.gender,
            year: user.year,
            department: user.department,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.enrollmentNo = req.body.enrollmentNo || user.enrollmentNo;
        user.gender = req.body.gender || user.gender;
        user.year = req.body.year || user.year;
        user.department = req.body.department || user.department;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            enrollmentNo: updatedUser.enrollmentNo,
            gender: updatedUser.gender,
            year: updatedUser.year,
            department: updatedUser.department,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Borrow a book
// @route   POST /api/users/borrow
// @access  Private
router.post('/borrow', protect, async (req, res) => {
    const { bookId } = req.body;

    try {
        const book = await Book.findById(bookId);
        const user = await User.findById(req.user._id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availableQuantity <= 0) {
            return res.status(400).json({ message: 'Book not available' });
        }

        // Check if user already has an active copy of this book
        const alreadyBorrowed = user.borrowedBooks.find(
            (b) => b.book.toString() === bookId && b.status === 'Active'
        );

        if (alreadyBorrowed) {
            return res.status(400).json({ message: 'You have already borrowed this book' });
        }

        // 15 days return period
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + 15);

        const borrowedBook = {
            book: bookId,
            borrowDate: new Date(),
            returnDate: returnDate,
            status: 'Active'
        };

        console.log('Pushing to borrowedBooks:', borrowedBook);
        user.borrowedBooks.push(borrowedBook);

        console.log('Saving user...');
        await user.save();
        console.log('User saved.');

        book.availableQuantity -= 1;
        await book.save();

        res.json({ message: 'Book borrowed successfully', borrowedBook });

    } catch (error) {
        console.error('FULL ERROR:', error);
        console.error('ERROR MESSAGE:', error.message);
        if (error.errors) console.error('VALIDATION ERRORS:', JSON.stringify(error.errors, null, 2));
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
});

// @desc    Return a book
// @route   POST /api/users/return
// @access  Private
router.post('/return', protect, async (req, res) => {
    const { bookId } = req.body;

    try {
        const user = await User.findById(req.user._id);
        const book = await Book.findById(bookId);

        const borrowedEntry = user.borrowedBooks.find(
            (b) => b.book.toString() === bookId && b.status === 'Active'
        );

        if (!borrowedEntry) {
            return res.status(400).json({ message: 'No active record found for this book' });
        }

        borrowedEntry.status = 'Returned';
        borrowedEntry.actualReturnDate = new Date();
        await user.save();

        if (book) {
            book.availableQuantity += 1;
            await book.save();
        }

        res.json({ message: 'Book returned successfully' });

    } catch (error) {
        console.error('Error in /mybooks:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get logged in user's borrowed books
// @route   GET /api/users/mybooks
// @access  Private
router.get('/mybooks', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('borrowedBooks.book');
        res.json(user.borrowedBooks);
    } catch (error) {
        console.error('Error in /mybooks:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
