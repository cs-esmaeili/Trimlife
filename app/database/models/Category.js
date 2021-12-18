const mongoose = require("mongoose");

const categorySchemaSchema = new mongoose.Schema({
    channels: [{ type: mongoose.ObjectId }],
    permissions: [{ type: mongoose.ObjectId }],
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

module.exports = mongoose.model("Category", categorySchemaSchema, 'category');