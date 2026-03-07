const express = require("express");
const { createReservation, getUserReservations, getReservations, updateReservation, deleteReservation } = require("../controllers/reservationController");
const { protect, admin, optionalProtect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(optionalProtect, createReservation).get(protect, admin, getReservations);
router.route("/my").get(protect, getUserReservations);
router.route("/:id").put(protect, updateReservation).delete(protect, deleteReservation);

module.exports = router;
