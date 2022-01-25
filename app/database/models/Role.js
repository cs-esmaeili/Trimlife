const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    permissions: {
        type: [{
            permission_id: {
                type: mongoose.ObjectId,
                ref: 'Permission',
                required: true,
            },
            status: {
                type: Boolean,
                default: "false"
            }
        }],
        validate: v => Array.isArray(v),
    },
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

module.exports = mongoose.model("Role", roleSchema, 'role');