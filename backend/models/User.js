const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'admin'], default: 'student' },
    enrollmentNo: { type: String },
    gender: { type: String },
    year: { type: String },
    department: { type: String },
    borrowedBooks: [{
        book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
        borrowDate: { type: Date, default: Date.now },
        returnDate: { type: Date }, // Expected return date
        actualReturnDate: { type: Date },
        status: { type: String, enum: ['Active', 'Returned'], default: 'Active' }
    }]
}, {
    timestamps: true
});

// Password Hash Middleware
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Password Verification Method
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
