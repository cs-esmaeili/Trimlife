const User = require('../database/models/User');
const Server = require('../database/models/Server');
const Role = require('../database/models/Role');

exports.socketIdToUserId = async (socketId) => {
    const result = await User.findOne({ socketId });
    return result;
}
exports.userRolesInServer = async (userId, serverId) => {
    const result = await Server.findOne({ _id: serverId, userRoles: { "user_id": userId } }).select({ usersRoles: 1 });
    let rolesId = [];
    result.usersRoles.map((item) => {
        if (item.user_id.equals(userId)) {
            rolesId.push(item.role_id);
        }
    })
    return rolesId;
}
exports.rolesPermissions = async (roleIds) => {
    const result = await Role.find({ _id: { "$in": roleIds } })
        .populate({ path: "permissions.permission_id" })
        .select({ "permissions": 1 });
    return result;
}
exports.checkServerPermission = async (socketId, serverId, permissionId) => {
    const userId = await this.socketIdToUserId(socketId);
    const userRoles = await this.userRolesInServer(userId._id, serverId);
    const userRolesPermissions = await this.rolesPermissions(userRoles);
    let permissions = [];
    userRolesPermissions.map((item) => Array.prototype.push.apply(permissions, item.permissions));
    for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].permission_id._id.equals(permissionId)) {
            return true;
        }
    }
    return false;
}
exports.checkVoiceChannelPermission = async (socketId, serverId, channelId, permissionId) => { //TODO
    const userId = await this.socketIdToUserId(socketId);
    const userRoles = await this.userRolesInServer(userId._id, serverId);
}