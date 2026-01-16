const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Book = require('./models/Book');
const User = require('./models/User');

dotenv.config();

const importData = async () => {
    try {
        await connectDB();
        await Book.deleteMany();
        await User.deleteMany();

        const users = [
            {
                name: 'Student User',
                email: 'student@gmail.com',
                password: 'password123',
                role: 'student',
                enrollmentNo: '230240116014'
            },
            {
                name: 'Admin User',
                email: 'admin@gmail.com',
                password: 'password123',
                role: 'admin'
            }
        ];

        for (const user of users) {
            await User.create(user);
        }

        const books = [
            {
                title: 'The Subtle Art of Not Giving a F*ck',
                author: 'Mark Manson',
                imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop',
                category: 'Self-help',
                description: 'A Counterintuitive Approach to Living a Good Life',
            },
            {
                title: 'The Two Towers',
                author: 'J.R.R Tolkien',
                imageUrl: 'https://images.unsplash.com/photo-1621351183012-e2f99720b1e0?q=80&w=800&auto=format&fit=crop',
                category: 'Fiction',
                description: 'The second volume of The Lord of the Rings',
            },
            {
                title: 'Company of One',
                author: 'Paul Jarvis',
                imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop',
                category: 'Business',
                description: 'Why Staying Small Is the Next Big Thing for Business',
            }
        ];

        await Book.insertMany(books);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
