const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

dotenv.config();

const fixCovers = async () => {
    try {
        await connectDB();

        // Find books with empty or missing imageUrl
        const books = await Book.find({
            $or: [
                { imageUrl: { $exists: false } },
                { imageUrl: "" },
                { imageUrl: null }
            ]
        });

        console.log(`Found ${books.length} books with missing covers.`);

        let updatedCount = 0;
        for (const book of books) {
            // Use a placeholder service. 'placehold.co' is reliable.
            // Using a colored background based on category could be cool, but simple gray is fine.
            // We encode the title for the URL.
            const encodedTitle = encodeURIComponent(book.title.replace(/\s+/g, '+'));
            // Using 400x600 for book aspect ratio
            book.imageUrl = `https://placehold.co/400x600/e2e8f0/1e293b?text=${encodedTitle}`;

            await book.save();
            updatedCount++;
            if (updatedCount % 10 === 0) process.stdout.write('.');
        }

        console.log(`\nSuccess! Updated ${updatedCount} books with placeholder covers.`);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

fixCovers();
