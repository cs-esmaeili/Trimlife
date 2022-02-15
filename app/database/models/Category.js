const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    channels: {
        type: [mongoose.ObjectId],
        ref: 'Channel',
        validate: v => Array.isArray(v) && v.length > 0,
    },
    rolesException: {
        type: [{
            role_id: {
                type: mongoose.ObjectId,
                ref: 'ServerRole',
            },
            permission_id: {
                type: mongoose.ObjectId,
                ref: 'Permission',
            },
            status: {
                type: Boolean,
                default: "false",
            }
        }],
        validate: v => Array.isArray(v),
    },
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

module.exports = mongoose.model("Category", categorySchema, 'category');