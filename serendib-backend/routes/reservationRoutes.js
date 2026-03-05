const express = require("express");
const { createReservation, getReservations } = require("../controllers/reservationController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// Allow unauthenticated users to make reservations, or we can use protect middleware if we want only logged-in users.
// We'll optionally pass user ID in controller.
// Need a middleware that just parses user but doesn't throw if not logged in, or we just keep it unprotected for creation
router.route("/").post(createReservation).get(protect, admin, getReservations);

module.exports = router;
