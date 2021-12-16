const mongoose = require("mongoose");

const userLogSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    meta: {
        type: String,
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

module.exports = mongoose.model("User_Log", userLogSchema);