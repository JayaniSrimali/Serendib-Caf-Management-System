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

const getUserReservations = async (req, res) => {
    try {
        const searchEmail = req.user.email.trim();
        const searchUserId = req.user._id;

        console.log(`[DEBUG] Searching for reservations. UserID: ${searchUserId}, Email: "${searchEmail}"`);

        const reservations = await Reservation.find({
            $or: [
                { user: searchUserId },
                { email: { $regex: new RegExp("^" + searchEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + "$", "i") } }
            ]
        }).sort({ date: 1 });

        console.log(`[DEBUG] Found ${reservations.length} reservations for ${searchEmail}`);
        if (reservations.length > 0) {
            console.log(`[DEBUG] First matching ID: ${reservations[0]._id}`);
        }

        res.json(reservations);
    } catch (error) {
        console.error("[ERROR] getUserReservations:", error);
        res.status(500).json({ message: error.message });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({}).populate('user', 'name email');
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReservation = async (req, res) => {
    try {
        const { date, time, guests, status } = req.body;
        const reservation = await Reservation.findById(req.params.id);

        if (reservation) {
            // Check if user owns the reservation (by ID or Email) or is admin
            const isOwner = (reservation.user && reservation.user.toString() === req.user._id.toString()) ||
                (reservation.email === req.user.email);

            if (!isOwner && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }

            reservation.date = date || reservation.date;
            reservation.time = time || reservation.time;
            reservation.guests = guests || reservation.guests;
            reservation.status = status || reservation.status;

            const updatedReservation = await reservation.save();
            res.json(updatedReservation);
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (reservation) {
            // Check if user owns the reservation (by ID or Email) or is admin
            const isOwner = (reservation.user && reservation.user.toString() === req.user._id.toString()) ||
                (reservation.email === req.user.email);

            if (!isOwner && req.user.role !== 'admin') {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await reservation.deleteOne();
            res.json({ message: 'Reservation removed' });
        } else {
            res.status(404).json({ message: 'Reservation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createReservation, getUserReservations, getReservations, updateReservation, deleteReservation };
