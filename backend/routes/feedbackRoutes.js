const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
router.post('/', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        const feedback = await Feedback.create({
            name,
            email,
            message,
        });

        res.status(201).json(feedback);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const feedbacks = await Feedback.find({}).sort({ createdAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
