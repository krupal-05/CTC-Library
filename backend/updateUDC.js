const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

dotenv.config();

const categoryToUDC = {
    'Classic Literature': '8', // Literature
    'Dystopian': '8',
    'Romance': '8',
    'Fiction': '8',
    'Fantasy': '8',
    'Science Fiction': '8',
    'Adventure': '8',
    'Historical Fiction': '8',
    'History': '9', // Geography, biography, history
    'Philosophy': '1', // Philosophy
    'Psychology': '1',
    'Religion': '2',
    'Social Science': '3',
    'Math': '5',
    'Science': '5',
    'Technology': '6',
    'Arts': '7',
};

const updateData = async () => {
    try {
        await connectDB();

        const books = await Book.find({});
        console.log(`Found ${books.length} books.`);

        for (const book of books) {
            let udc = '0'; // Default to Generalities
            if (book.category && categoryToUDC[book.category]) {
                udc = categoryToUDC[book.category];
            } else {
                // Fallback logic or keeping it 0
                // If it's a known title we could force it, but let's stick to category mapping
                console.log(`Unknown category: ${book.category}, defaulting to 0`);
            }

            book.udc = udc;
            await book.save();
            console.log(`Updated "${book.title}" [${book.category}] -> UDC: ${udc}`);
        }

        console.log('All books updated with UDC codes!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

updateData();
