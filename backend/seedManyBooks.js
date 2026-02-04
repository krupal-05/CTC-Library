const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

dotenv.config();

const baseBooks = [
    { title: "Advanced Calculus", category: "Mathematics", udc: "5" },
    { title: "Organic Chemistry", category: "Science", udc: "5" },
    { title: "World History 101", category: "History", udc: "9" },
    { title: "Intro to Psychology", category: "Psychology", udc: "1" },
    { title: "Modern Art Analysis", category: "Art", udc: "7" },
    { title: "Software Architecture", category: "Technology", udc: "6" },
    { title: "Database Systems", category: "Technology", udc: "6" },
    { title: "Microeconomics", category: "Social Science", udc: "3" },
    { title: "Classical Mythology", category: "Religion", udc: "2" },
    { title: "Creative Writing", category: "Literature", udc: "8" }
];

const authors = ["John Doe", "Jane Smith", "Alan Turing", "Grace Hopper", "Ada Lovelace", "Isaac Newton", "Marie Curie", "Albert Einstein"];

const generateBooks = (count) => {
    const books = [];
    for (let i = 0; i < count; i++) {
        const base = baseBooks[Math.floor(Math.random() * baseBooks.length)];
        const author = authors[Math.floor(Math.random() * authors.length)];

        books.push({
            title: `${base.title} Vol. ${i + 1}`,
            author: author,
            isbn: `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
            category: base.category,
            udc: base.udc,
            description: `A detailed study on ${base.title} covering varying aspects. edition ${i + 1}.`,
            imageUrl: "", // Empty or use a placeholder URL if desired
            totalQuantity: Math.floor(Math.random() * 10) + 1,
            availableQuantity: Math.floor(Math.random() * 5) + 1
        });
    }
    return books;
};

const seedMany = async () => {
    try {
        await connectDB();

        const books = generateBooks(120); // Generate 120 books
        await Book.insertMany(books);

        console.log(`Success! ${books.length} books added to the database.`);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedMany();
