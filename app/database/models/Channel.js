const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
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
    type: {
        type: Boolean,
        required: true,
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

module.exports = mongoose.model("Channel", channelSchema, 'channel');