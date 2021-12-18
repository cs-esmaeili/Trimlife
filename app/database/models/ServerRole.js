const mongoose = require("mongoose");

const serverRoleSchema = new mongoose.Schema({
    permissions: [{ type: mongoose.ObjectId }],
    name: {
        type: String,
        required: true,
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

module.exports = mongoose.model("ServerRole", serverRoleSchema,'serverRole');