const mongoose = require("mongoose");

const serverSchemaSchema = new mongoose.Schema({
    server_id: {
        type: mongoose.ObjectId
    },
    List: [{ type: mongoose.ObjectId }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ServerSchema", serverSchemaSchema, 'serverSchema');