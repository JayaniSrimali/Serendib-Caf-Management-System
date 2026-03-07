const mongoose = require('mongoose');
require('dotenv').config();
const Reservation = require('./models/Reservation');

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const reservations = await Reservation.find({});
        console.log("Reservations in DB:");
        reservations.forEach(r => {
            console.log(`- ID: ${r._id} | Email: "${r.email}" (Len: ${r.email.length}) | UserID: ${r.user || 'None'}`);
        });
        process.exit();
    } catch (err) {
        process.exit(1);
    }
};

checkDB();
