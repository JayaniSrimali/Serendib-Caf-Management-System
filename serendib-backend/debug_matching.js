const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');
const Reservation = require('./models/Reservation');

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({ email: /jayanisrim/i });
        console.log("Matching Users:", JSON.stringify(users.map(u => ({ id: u._id, email: u.email })), null, 2));

        const reservations = await Reservation.find({ email: /jayanisrim/i });
        console.log("Matching Reservations (Email):", JSON.stringify(reservations.map(r => ({ id: r._id, email: r.email, user: r.user })), null, 2));

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

debug();
