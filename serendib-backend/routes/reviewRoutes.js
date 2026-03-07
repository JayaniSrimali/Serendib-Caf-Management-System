const express = require("express");
const { getReviews, getMyReviews, createReview, updateReview, deleteReview } = require("../controllers/reviewController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getReviews).post(protect, createReview);
router.route("/my").get(protect, getMyReviews);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

module.exports = router;
