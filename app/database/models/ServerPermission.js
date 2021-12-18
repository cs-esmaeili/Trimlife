const mongoose = require("mongoose");

const serverPermissionSchema = new mongoose.Schema({
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

module.exports = mongoose.model("ServerPermission", serverPermissionSchema , 'serverPermission');