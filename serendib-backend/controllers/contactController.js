const Message = require("../models/Message");

// @desc    Submit a message via the contact form
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "Please fill in all fields." });
        }

        const newMessage = await Message.create({ name, email, subject, message });

        res.status(201).json({
            success: true,
            data: newMessage,
            message: "Thank you for reaching out! We've received your message."
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all messages (for admin only)
// @route   GET /api/contact
// @access  Admin/Private
const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find({}).sort("-createdAt");
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { submitMessage, getAllMessages };
