const mongoose = require("mongoose");

const systemLogSchema = new mongoose.Schema({
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

module.exports = mongoose.model("System_Log", systemLogSchema);
