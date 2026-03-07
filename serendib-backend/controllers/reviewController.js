const Review = require("../models/Review");

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const { name, role, rating, review, image } = req.body;
        const newReview = new Review({
            user: req.user._id,
            name,
            role,
            rating,
            review,
            image
        });
        const createdReview = await newReview.save();
        res.status(201).json(createdReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Only owner or admin can update
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: "Not authorized" });
        }

        review.rating = req.body.rating || review.rating;
        review.review = req.body.review || review.review;

        const updatedReview = await review.save();
        res.json(updatedReview);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: "Review not found" });

        // Only owner or admin can delete
        if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: "Not authorized" });
        }

        await review.deleteOne();
        res.json({ message: "Review removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviews, getMyReviews, createReview, updateReview, deleteReview };
