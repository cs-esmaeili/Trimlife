const mongoose = require("mongoose");

const serverRolesSchema = new mongoose.Schema({
    permissions: [{ type: mongoose.ObjectId, ref: 'serverpermissions' }],
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

module.exports = mongoose.model("ServerRoles", serverRolesSchema,'serverRoles');