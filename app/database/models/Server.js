const mongoose = require("mongoose");

const serversSchema = new mongoose.Schema({
   
    users: [{ type: mongoose.ObjectId, ref: 'users' }],
    roles: [{ type: mongoose.ObjectId, ref: 'serverroles' }],
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

module.exports = mongoose.model("Servers", serversSchema , 'servers');