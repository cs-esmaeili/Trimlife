const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
    permissions: {
        type: [mongoose.ObjectId],
        validate: v => Array.isArray(v) && v.length > 0,
    },
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