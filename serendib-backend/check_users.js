const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const users = await User.find({});
        console.log("Users in DB:");
        users.forEach(u => {
            console.log(`- ID: ${u._id} | Name: "${u.name}" | Email: "${u.email}" (Len: ${u.email.length})`);
        });
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkUsers();
