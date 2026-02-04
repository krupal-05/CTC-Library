const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const User = require('./models/User');
const Notification = require('./models/Notification');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const run = async () => {
    try {
        console.log('--- Starting Verification ---');

        // 1. Create a dummy book with 0 availability
        const book = await Book.create({
            title: 'Test Reservation Book',
            author: 'Test Author',
            totalQuantity: 1,
            availableQuantity: 0,
            udc: '000',
            queue: []
        });
        console.log('1. Created Book with 0 availability:', book._id);

        // 2. Create a dummy user
        const user = await User.create({
            name: 'Test Reserve User',
            email: `testreserve${Date.now()}@example.com`,
            password: 'password123',
            role: 'student'
        });
        console.log('2. Created User:', user._id);

        // 3. Simulate Reservation (Join Waitlist)
        // Direct DB manipulation to simulate API valid logic
        book.queue.push({ user: user._id });
        await book.save();
        console.log('3. User added to queue');

        // 4. Simulate Return (Trigger Notification)
        // Logic from return controller: check queue, pop, notify
        console.log('4. Simulating Return...');

        const bookToReturn = await Book.findById(book._id);
        if (bookToReturn.queue.length > 0) {
            const nextUser = bookToReturn.queue.shift();

            await Notification.create({
                user: nextUser.user,
                message: `Good news! The book "${bookToReturn.title}" is available.`,
                type: 'AVAILABILITY',
                relatedBook: bookToReturn._id
            });
            console.log('   Notification Created!');
        }

        bookToReturn.availableQuantity += 1;
        await bookToReturn.save();

        // 5. Verify Notification Exists
        const notifications = await Notification.find({ user: user._id });
        console.log('5. Verification Results:');
        console.log('   User Notifications:', notifications.length);
        if (notifications.length > 0) {
            console.log('   SUCCESS: Notification found:', notifications[0].message);
        } else {
            console.log('   FAILURE: No notification found');
        }

        // Cleanup
        await Book.findByIdAndDelete(book._id);
        await User.findByIdAndDelete(user._id);
        await Notification.deleteMany({ user: user._id });
        console.log('6. Cleanup Complete');

        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

run();
