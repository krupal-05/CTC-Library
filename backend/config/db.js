const mongoose = require('mongoose');

const connectDB = async () => {
    const primaryUri = process.env.MONGO_URI;
    const fallbackUri = 'mongodb://127.0.0.1:27017/library';
    const uriToUse = primaryUri || fallbackUri;

    try {
        console.log(`Connecting to MongoDB using: ${uriToUse}`);
        const conn = await mongoose.connect(uriToUse);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (primaryUri && primaryUri.startsWith('mongodb+srv://')) {
            console.warn('Primary Atlas connection failed, trying local MongoDB fallback...');
            try {
                const conn = await mongoose.connect(fallbackUri);
                console.log(`MongoDB Connected: ${conn.connection.host}`);
                return;
            } catch (fallbackError) {
                console.error(`Fallback connection failed: ${fallbackError.message}`);
            }
        }

        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
    