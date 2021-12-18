const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    channel_id: { type: mongoose.ObjectId },
    From: { type: mongoose.ObjectId },
    To: { type: mongoose.ObjectId },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Message", messageSchema, 'message');