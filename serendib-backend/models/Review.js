const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    role: { type: String },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
