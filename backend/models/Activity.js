const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    action: { type: String, required: true }, // e.g., 'REGISTER', 'BORROW', 'RETURN', 'ADD_BOOK', 'ISSUE_BOOK'
    user: { type: String, required: true }, // User Name or 'Admin'
    details: { type: String }, // e.g., 'Borrowed "The Great Gatsby"'
    timestamp: { type: Date, default: Date.now },
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;
