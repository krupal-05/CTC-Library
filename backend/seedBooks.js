const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

dotenv.config();

const books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        isbn: "978-0743273565",
        category: "Classic Literature",
        description: "A novel set in the Jazz Age that tells the story of Jay Gatsby's unrequited love for Daisy Buchanan.",
        totalQuantity: 5,
        availableQuantity: 5,
        imageUrl: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        isbn: "978-0061120084",
        category: "Classic Literature",
        description: "A novel about the serious issues of rape and racial inequality, told through the eyes of young Scout Finch.",
        totalQuantity: 4,
        availableQuantity: 4,
        imageUrl: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "1984",
        author: "George Orwell",
        isbn: "978-0451524935",
        category: "Dystopian",
        description: "A social science fiction novel and cautionary tale about the future.",
        totalQuantity: 6,
        availableQuantity: 6,
        imageUrl: "https://m.media-amazon.com/images/I/71rpa1-kyvL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        isbn: "978-1503290563",
        category: "Romance",
        description: "A romantic novel of manners that charts the emotional development of the protagonist Elizabeth Bennet.",
        totalQuantity: 3,
        availableQuantity: 3,
        imageUrl: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "The Catcher in the Rye",
        author: "J.D. Salinger",
        isbn: "978-0316769488",
        category: "Fiction",
        description: "A story about a few days in the life of a troubled teenage boy, Holden Caulfield.",
        totalQuantity: 4,
        availableQuantity: 4,
        imageUrl: "https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        isbn: "978-0547928227",
        category: "Fantasy",
        description: "A fantasy novel about the quest of home-loving hobbit Bilbo Baggins to win a share of the treasure guarded by Smaug.",
        totalQuantity: 7,
        availableQuantity: 7,
        imageUrl: "https://m.media-amazon.com/images/I/91b0C2YNSrL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Fahrenheit 451",
        author: "Ray Bradbury",
        isbn: "978-1451673319",
        category: "Dystopian",
        description: "A novel about a future society where books are outlawed and 'firemen' burn any that are found.",
        totalQuantity: 5,
        availableQuantity: 5,
        imageUrl: "https://m.media-amazon.com/images/I/61l8LWTw+rL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Brave New World",
        author: "Aldous Huxley",
        isbn: "978-0060850524",
        category: "Science Fiction",
        description: "A dystopic novel set in a futuristic World State, inhabited by genetically modified citizens and an intelligence-based social hierarchy.",
        totalQuantity: 3,
        availableQuantity: 3,
        imageUrl: "https://m.media-amazon.com/images/I/81zE42gT3xL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "Moby Dick",
        author: "Herman Melville",
        isbn: "978-1503280786",
        category: "Adventure",
        description: "The narrative of the sailor Ishmael and the obsessive quest of Ahab for revenge on Moby Dick.",
        totalQuantity: 2,
        availableQuantity: 2,
        imageUrl: "https://m.media-amazon.com/images/I/71d5wo+-MuL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "War and Peace",
        author: "Leo Tolstoy",
        isbn: "978-1400079988",
        category: "Historical Fiction",
        description: "A literary work that mixes fictional narrative with chapters on history and philosophy.",
        totalQuantity: 2,
        availableQuantity: 2,
        imageUrl: "https://m.media-amazon.com/images/I/A1aDb5U5myL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        title: "The Alchemist",
        author: "Paulo Coelho",
        isbn: "978-0062315007",
        category: "Fiction",
        description: "A novel about a young Andalusian shepherd in his journey to the pyramids of Egypt.",
        totalQuantity: 8,
        availableQuantity: 8,
        imageUrl: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg"
    }
];

const importData = async () => {
    try {
        await connectDB();
        await Book.insertMany(books);
        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
