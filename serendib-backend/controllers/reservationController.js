const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, guests } = req.body;
        const reservation = new Reservation({
            user: req.user ? req.user._id : undefined,
            name, email, phone, date, time, guests
        });
        const createdReservation = await reservation.save();
        res.status(201).json(createdReservation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({});
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReservation, getReservations };
