const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
    users: [{ type: mongoose.ObjectId }],
    roles: [{ type: mongoose.ObjectId }],
    name: {
        type: String,
        required: true,
        trim: true,
        max: 50,
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

module.exports = mongoose.model("Server", serverSchema , 'server');