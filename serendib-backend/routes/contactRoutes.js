const express = require("express");
const { submitMessage, getAllMessages } = require("../controllers/contactController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", submitMessage);
router.get("/", protect, admin, getAllMessages); // Only admins see messages

module.exports = router;
