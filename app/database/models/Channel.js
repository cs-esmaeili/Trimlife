const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    category_id: { type: mongoose.ObjectId },
    serverSchema_id: { type: mongoose.ObjectId },
    permissions: [{ type: mongoose.ObjectId }],
    name: {
        type: String,
        required: true,
        trim: true,
        max: 50,
    },
    type: {
        type: Boolean,
        required: true,
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

module.exports = mongoose.model("Channel", channelSchema, 'channel');