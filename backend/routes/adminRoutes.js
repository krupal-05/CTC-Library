const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const { protect } = require('../middleware/authMiddleware');

// Middleware to check if user is admin
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();

        // Calculate borrowed books and overdue books
        const borrowedStats = await User.aggregate([
            { $unwind: '$borrowedBooks' },
            { $match: { 'borrowedBooks.status': 'Active' } },
            {
                $group: {
                    _id: null,
                    totalBorrowed: { $sum: 1 },
                    overdue: {
                        $sum: {
                            $cond: [{ $lt: ['$borrowedBooks.returnDate', new Date()] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        const stats = borrowedStats[0] || { totalBorrowed: 0, overdue: 0 };

        res.json({
            totalBooks,
            totalBorrowed: stats.totalBorrowed,
            overdueBooks: stats.overdue
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
