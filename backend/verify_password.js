const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

dotenv.config();

const verify = async () => {
    try {
        await connectDB();
        const user = await User.findOne({ email: 'student@gmail.com' });
        if (!user) {
            console.log('User not found!');
            process.exit(1);
        }
        console.log('User found:', user.email);
        console.log('Hashed Password:', user.password);

        const isMatch = await bcrypt.compare('password123', user.password);
        console.log('Password match for "password123":', isMatch);
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

verify();
