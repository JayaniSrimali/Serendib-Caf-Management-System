const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    menuItem: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [orderItemSchema],
    orderType: { type: String, required: true, default: "pickup" },
    paymentMethod: { type: String, required: true, default: "cash" },
    deliveryAddress: { type: String, default: "Store Pickup" },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Processing", "Ready", "Completed", "Cancelled"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
