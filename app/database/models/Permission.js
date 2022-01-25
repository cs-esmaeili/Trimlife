const mongoose = require("mongoose");
const { boolean } = require("yup");

const permissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        max: 100,
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

module.exports = mongoose.model("Permission", permissionSchema, 'permission');