const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({
    users: {
        type: [mongoose.ObjectId],
        ref: 'User',
        validate: v => Array.isArray(v) && v.length > 0,
    },
    roles: {
        type: [mongoose.ObjectId],
        ref: 'Role',
        validate: v => Array.isArray(v) && v.length > 0,
    },
    usersRoles: {
        type: [{
            user_id: {
                type: mongoose.ObjectId,
                ref: 'User',
            },
            role_id: {
                type: mongoose.ObjectId,
                ref: 'Role',
            },
        }],
        validate: v => Array.isArray(v) && v.length > 0,
    },
    list: {
        type: [mongoose.ObjectId],
        ref: 'Category',
        validate: v => Array.isArray(v) && v.length > 0,
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


module.exports = mongoose.model("Server", serverSchema, 'server');