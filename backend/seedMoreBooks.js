const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const connectDB = require('./config/db');

dotenv.config();

const newBooks = [
    // 0 - Generalities
    {
        title: "The Information: A History, a Theory, a Flood",
        author: "James Gleick",
        isbn: "978-1400096237",
        category: "General Works",
        udc: "0",
        description: "A chronological analysis of the history of information science and communication.",
        imageUrl: "https://m.media-amazon.com/images/I/910q4w2aCmL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 3,
        availableQuantity: 3
    },
    // 1 - Philosophy
    {
        title: "Meditations",
        author: "Marcus Aurelius",
        isbn: "978-0140449334",
        category: "Philosophy",
        udc: "1",
        description: "A series of personal writings by Marcus Aurelius, Roman Emperor, recording his private notes to himself and ideas on Stoic philosophy.",
        imageUrl: "https://m.media-amazon.com/images/I/81K0jWjKjAL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 5,
        availableQuantity: 5
    },
    // 2 - Religion
    {
        title: "The Varieties of Religious Experience",
        author: "William James",
        isbn: "978-0140390346",
        category: "Religion",
        udc: "2",
        description: "A comprehensive survey of the psychology of religion.",
        imageUrl: "https://m.media-amazon.com/images/I/81j8r-nO+AL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 2,
        availableQuantity: 2
    },
    // 3 - Social Sciences
    {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        isbn: "978-0374275631",
        category: "Psychology/Social Science",
        udc: "3",
        description: "The book describes two systems that drive the way we think.",
        imageUrl: "https://m.media-amazon.com/images/I/61fdrEuPJwL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 4,
        availableQuantity: 4
    },
    {
        title: "Sapiens: A Brief History of Humankind",
        author: "Yuval Noah Harari",
        isbn: "978-0062316097",
        category: "Social Science",
        udc: "3",
        description: "A book that surveys the history of humankind from the evolution of archaic human species in the Stone Age up to the twenty-first century.",
        imageUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 6,
        availableQuantity: 6
    },
    // 5 - Mathematics & Natural Sciences
    {
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        isbn: "978-0553380163",
        category: "Science",
        udc: "5",
        description: "A historical overview of cosmology from the Big Bang to black holes.",
        imageUrl: "https://m.media-amazon.com/images/I/81K+20nW0+L._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 4,
        availableQuantity: 4
    },
    {
        title: "Silent Spring",
        author: "Rachel Carson",
        isbn: "978-0618249060",
        category: "Nature",
        udc: "5",
        description: "An environmental science book that documents the adverse environmental effects caused by the indiscriminate use of pesticides.",
        imageUrl: "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg", // Placeholder or duplicate image if specific not found easily
        totalQuantity: 3,
        availableQuantity: 3
    },
    // 6 - Applied Sciences
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "978-0132350884",
        category: "Technology",
        udc: "6",
        description: "A hnadbook of agile software craftsmanship.",
        imageUrl: "https://m.media-amazon.com/images/I/51E2055ZGUL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 8,
        availableQuantity: 8
    },
    {
        title: "The Immortal Life of Henrietta Lacks",
        author: "Rebecca Skloot",
        isbn: "978-1400052189",
        category: "Medicine",
        udc: "6",
        description: "The story of Henrietta Lacks and the immortal cell line known as HeLa.",
        imageUrl: "https://m.media-amazon.com/images/I/81k11+Q+t5L._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 3,
        availableQuantity: 3
    },
    // 7 - The Arts
    {
        title: "The Story of Art",
        author: "E.H. Gombrich",
        isbn: "978-0714880292",
        category: "Art",
        udc: "7",
        description: "A survey of the history of art from ancient times to the modern era.",
        imageUrl: "https://m.media-amazon.com/images/I/91r1+P-tTCL._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 2,
        availableQuantity: 2
    },
    // 9 - Geography, Biography, History
    {
        title: "Guns, Germs, and Steel",
        author: "Jared Diamond",
        isbn: "978-0393317558",
        category: "History",
        udc: "9",
        description: "A transdisciplinary non-fiction book that explores why some societies are more materially successful than others.",
        imageUrl: "https://m.media-amazon.com/images/I/81+LzT4bT1L._AC_UF1000,1000_QL80_.jpg",
        totalQuantity: 4,
        availableQuantity: 4
    }
];

const seedMore = async () => {
    try {
        await connectDB();
        await Book.insertMany(newBooks);
        console.log('Additional books imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedMore();
