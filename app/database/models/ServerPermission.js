const mongoose = require("mongoose");
const { boolean } = require("yup");

const serverPermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50,
    },
    type: {
        type: Boolean,
        required: true,
        default: 0,
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

module.exports = mongoose.model("ServerPermission", serverPermissionSchema, 'serverPermission');