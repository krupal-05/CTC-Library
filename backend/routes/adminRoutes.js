const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');
const Activity = require('../models/Activity'); // Import Activity
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();

        // 1. Borrowed & Overdue Stats
        const borrowedStats = await User.aggregate([
            { $unwind: '$borrowedBooks' },
            { $match: { 'borrowedBooks.status': 'Active' } },
            {
                $group: {
                    _id: null,
                    totalBorrowed: { $sum: 1 },
                    overdue: {
                        $sum: { $cond: [{ $lt: ['$borrowedBooks.returnDate', new Date()] }, 1, 0] }
                    }
                }
            }
        ]);

        // 2. Category Distribution
        const categoryStats = await Book.aggregate([
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);

        // 3. Monthly Borrow Trends (Last 6 Months)
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const monthlyStats = await Activity.aggregate([
            {
                $match: {
                    timestamp: { $gte: sixMonthsAgo },
                    action: { $in: ['BORROW', 'ISSUE_BOOK'] }
                }
            },
            {
                $group: {
                    _id: { $month: '$timestamp' },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const stats = borrowedStats[0] || { totalBorrowed: 0, overdue: 0 };

        // 4. Total Cumulative Issued (History)
        const totalIssued = await Activity.countDocuments({
            action: { $in: ['BORROW', 'ISSUE_BOOK'] }
        });

        res.json({
            totalBooks,
            totalBorrowed: stats.totalBorrowed,
            overdueBooks: stats.overdue,
            totalIssued: totalIssued,
            categoryDistribution: categoryStats,
            monthlyBorrows: monthlyStats
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get recent activities
// @route   GET /api/admin/activities
// @access  Private/Admin
router.get('/activities', protect, admin, async (req, res) => {
    try {
        const activities = await Activity.find({})
            .sort({ timestamp: -1 })
            .limit(20); // Get last 20 activities
        res.json(activities);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities' });
    }
});

// @desc    Get transaction history (Borrows/Returns)
// @route   GET /api/admin/transactions
// @access  Private/Admin
router.get('/transactions', protect, admin, async (req, res) => {
    try {
        const transactions = await Activity.find({
            action: { $in: ['BORROW', 'RETURN', 'ISSUE_BOOK', 'RETURN_BOOK', 'ADD_BOOK', 'REMOVE_BOOK'] }
        })
            .sort({ timestamp: -1 })
            .limit(100);

        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions' });
    }
});

// @desc    Issue a book to a user (Admin/Librarian)
// @route   POST /api/admin/issue-book
// @access  Private/Admin
router.post('/issue-book', protect, admin, async (req, res) => {
    const { enrollmentNo, isbn, days } = req.body;

    try {
        // 1. Find User
        const user = await User.findOne({ enrollmentNo });
        if (!user) {
            return res.status(404).json({ message: 'Student not found with this Enrollment No' });
        }

        // 2. Find Book
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found with this ISBN' });
        }

        // 4. Check status
        // Case A: User has ACTIVE copy -> Error
        // Case B: User has PENDING copy -> Approve it (Don't decrement qty again)
        // Case C: User has NO copy -> New Issue (Decrement qty)

        const activeCopy = user.borrowedBooks.find(
            (b) => b.book.toString() === book._id.toString() && b.status === "Active"
        );

        if (activeCopy) {
            return res.status(400).json({ message: 'Student already has an active copy of this book' });
        }

        const pendingCopy = user.borrowedBooks.find(
            (b) => b.book.toString() === book._id.toString() && b.status === "Pending"
        );

        const duration = days ? parseInt(days) : 15;
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + duration); // Default 15 days or custom

        if (pendingCopy) {
            // Case B: Approve Pending
            pendingCopy.status = 'Active';
            pendingCopy.borrowDate = new Date(); // Reset borrow date to Issue date
            pendingCopy.returnDate = returnDate;
            pendingCopy.requestedDays = duration;

            await user.save();

            // Note: Quantity was already decremented when requested, so we DON'T decrement again.
            // Log Activity
            await Activity.create({
                action: 'ISSUE_BOOK',
                user: req.user.name,
                details: `Issued (Approved Request) '${book.title}' to ${user.name} (${user.enrollmentNo})`
            });

        } else {
            // Case C: New Issue
            if (book.availableQuantity <= 0) {
                return res.status(400).json({ message: 'Book is currently out of stock' });
            }

            const borrowedEntry = {
                book: book._id,
                borrowDate: new Date(),
                returnDate: returnDate,
                status: 'Active',
                requestedDays: duration
            };

            user.borrowedBooks.push(borrowedEntry);
            await user.save();

            // Update Book Quantity
            book.availableQuantity -= 1;
            await book.save();

            // Log Activity
            await Activity.create({
                action: 'ISSUE_BOOK',
                user: req.user.name,
                details: `Issued '${book.title}' to ${user.name} (${user.enrollmentNo})`
            });
        }

        res.status(200).json({
            message: 'Book issued successfully',
            user: user.name,
            book: book.title,
            dueDate: returnDate
        });

        // ... existing Issue Book logic ...

    } catch (error) {
        console.error("Issue Book Error:", error);
        res.status(500).json({ message: 'Server Error processing issue request' });
    }
});

// @desc    Return a book for a user (Admin/Librarian)
// @route   POST /api/admin/return-book
// @access  Private/Admin
router.post('/return-book', protect, admin, async (req, res) => {
    const { enrollmentNo, isbn } = req.body;

    try {
        // 1. Find User
        const user = await User.findOne({ enrollmentNo });
        if (!user) {
            return res.status(404).json({ message: 'Student not found with this Enrollment No' });
        }

        // 2. Find Book
        const book = await Book.findOne({ isbn });
        if (!book) {
            return res.status(404).json({ message: 'Book not found with this ISBN' });
        }

        // 3. Find Active Borrow Entry
        const borrowedEntry = user.borrowedBooks.find(
            (b) => b.book.toString() === book._id.toString() && b.status === "Active"
        );

        if (!borrowedEntry) {
            return res.status(400).json({ message: 'No active borrow record found for this student and book' });
        }

        // 4. Update User Record
        borrowedEntry.status = 'Returned';
        const now = new Date();
        borrowedEntry.actualReturnDate = now;

        // Calculate Penalty
        let penalty = 0;
        if (borrowedEntry.returnDate && now > borrowedEntry.returnDate) {
            const diffTime = Math.abs(now - borrowedEntry.returnDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            penalty = diffDays * 2;
        }
        borrowedEntry.penalty = penalty;

        await user.save();

        // 5. Update Book Quantity
        book.availableQuantity += 1;
        await book.save();

        // 6. Log Activity
        await Activity.create({
            action: 'RETURN_BOOK',
            user: req.user.name,
            details: `Returned '${book.title}' from ${user.name} (${user.enrollmentNo}). Penalty: Rs ${penalty}`
        });

        res.status(200).json({
            message: 'Book returned successfully',
            user: user.name,
            book: book.title,
            penalty: penalty
        });

    } catch (error) {
        console.error("Return Book Error:", error);
        res.status(500).json({ message: 'Server Error processing return request' });
    }
});

// @desc    Get all active issued books
// @route   GET /api/admin/active-issues
// @access  Private/Admin
router.get('/active-issues', protect, admin, async (req, res) => {
    try {
        const users = await User.find({ 'borrowedBooks.status': 'Active' })
            .populate('borrowedBooks.book', 'title isbn');

        const activeIssues = [];

        users.forEach(user => {
            user.borrowedBooks.forEach(borrow => {
                if (borrow.status === 'Active' && borrow.book) {
                    activeIssues.push({
                        enrollmentNo: user.enrollmentNo,
                        studentName: user.name,
                        bookTitle: borrow.book.title,
                        isbn: borrow.book.isbn,
                        issueDate: borrow.borrowDate,
                        dueDate: borrow.returnDate
                    });
                }
            });
        });

        res.json(activeIssues);
    } catch (error) {
        console.error("Fetch Active Issues Error:", error);
        res.status(500).json({ message: 'Failed to fetch active issues' });
    }
});

// @desc    Get all pending borrow requests
// @route   GET /api/admin/requests
// @access  Private/Admin
router.get('/requests', protect, admin, async (req, res) => {
    try {
        // Find users who have borrowedBooks with status 'Pending'
        const users = await User.find({ 'borrowedBooks.status': 'Pending' })
            .select('name enrollmentNo borrowedBooks')
            .populate('borrowedBooks.book');

        let requests = [];
        users.forEach(user => {
            user.borrowedBooks.forEach(bookEntry => {
                if (bookEntry.status === 'Pending') {
                    requests.push({
                        _id: bookEntry._id, // This is the ID of the subdocument
                        user: {
                            _id: user._id,
                            name: user.name,
                            enrollmentNo: user.enrollmentNo
                        },
                        book: bookEntry.book,
                        borrowDate: bookEntry.borrowDate,
                        requestedDays: bookEntry.requestedDays
                    });
                }
            });
        });

        res.json(requests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Approve a borrow request
// @route   PUT /api/admin/approve
// @access  Private/Admin
router.put('/approve', protect, admin, async (req, res) => {
    const { userId, bookId, requestId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const borrowedEntry = user.borrowedBooks.id(requestId);

        if (!borrowedEntry) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (borrowedEntry.status !== 'Pending') {
            return res.status(400).json({ message: 'Request is not pending' });
        }

        borrowedEntry.status = 'Active';

        // Update return date based on requested days (calculated from NOW)
        const duration = borrowedEntry.requestedDays || 15; // fallback to 15
        const returnDate = new Date();
        returnDate.setDate(returnDate.getDate() + duration);
        borrowedEntry.returnDate = returnDate;

        await user.save();

        // Log Activity
        await Activity.create({
            action: 'APPROVE_BORROW',
            user: 'Admin',
            details: `Approved borrow request for user ${user.name}. Due in ${duration} days.`
        });

        res.json({ message: 'Request approved' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Reject a borrow request
// @route   PUT /api/admin/reject
// @access  Private/Admin
router.put('/reject', protect, admin, async (req, res) => {
    const { userId, requestId } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const borrowedEntry = user.borrowedBooks.id(requestId);

        if (!borrowedEntry) {
            return res.status(404).json({ message: 'Request not found' });
        }

        if (borrowedEntry.status !== 'Pending') {
            return res.status(400).json({ message: 'Request is not pending' });
        }

        borrowedEntry.status = 'Rejected';
        // Restore book quantity
        const book = await Book.findById(borrowedEntry.book);
        if (book) {
            book.availableQuantity += 1;
            await book.save();
        }

        await user.save();

        // Log Activity
        await Activity.create({
            action: 'REJECT_BORROW',
            user: 'Admin',
            details: `Rejected borrow request for user ${user.name}`
        });

        res.json({ message: 'Request rejected' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
