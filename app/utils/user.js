const User = require('../database/models/User');
const Server = require('../database/models/Server');
const Role = require('../database/models/Role');
const Channel = require('../database/models/Channel');
const Category = require('../database/models/Category');
const Permission = require('../database/models/Permission');

exports.permissionToPermissionId = async (permission) => {
    const result = await Permission.findOne({ name: permission });
    return result;
}
exports.socketIdToUserId = async (socketId) => {
    const result = await User.findOne({ socket_id: socketId });
    return result;
}
exports.userIdToSocketId = async (userId) => {
    const result = await User.findOne({ _id: userId });
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
exports.userServers = async (userId) => {
    const result = await Server.find({ users: userId });
    return result;
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
const checkcollection = (collection, userRoles, permissionId) => {
    const { rolesException } = collection;
    for (let i = 0; i < rolesException.length; i++) {

        const roleCheck = userRoles.some(function (el) {
            return el.equals(rolesException[i].role_id);
        });
        if (roleCheck && rolesException[i].permission_id.equals(permissionId)) {
            return rolesException[i].status;
        }
    }
    return undefined;
}
exports.checkChannelPermission = async (socketId, serverId, channelId, permissionId) => {
    const userId = await this.socketIdToUserId(socketId);
    const userRoles = await this.userRolesInServer(userId._id, serverId);

    const channel = await Channel.findOne({
        _id: channelId,
    });
    const checkChannel = checkcollection(channel, userRoles, permissionId);
    if (checkChannel !== undefined) {
        return checkChannel;
    } else {
        const category = await Category.findOne({
            channels: channelId,
        });
        const checkCategory = checkcollection(category, userRoles, permissionId);
        if (checkCategory !== undefined) {
            return checkCategory;
        } else {
            if (channel.isPrivate == false) {
                return !category.isPrivate;
            }
            return !channel.isPrivate;
        }
    }
}
exports.removeFalsePermissins = async (socketId, serverId, permissionId, array) => {
    let result = await Promise.all(array.map(async item => {
        const check = await this.checkChannelPermission(socketId, serverId, item._id, permissionId);
        return check;
    }));
    result = await array.filter((value, index) => result[index]);
    return result;
}

