const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['AVAILABILITY', 'REMINDER', 'GENERAL', 'ADMIN_ALERT'],
        default: 'GENERAL'
    },
    read: {
        type: Boolean,
        default: false
    },
    relatedBook: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
}, {
    timestamps: true
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
