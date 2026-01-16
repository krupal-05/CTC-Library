const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');

dotenv.config();

const verifyUsers = async () => {
    try {
        await connectDB();
        const users = await User.find({});
        console.log('--- USERS IN DB ---');
        users.forEach(u => {
            console.log(`Email: ${u.email}, Role: ${u.role}, Password: ${u.password}`);
        });
        console.log('-------------------');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

verifyUsers();
