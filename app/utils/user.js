const User = require('../database/models/User');
const Server = require('../database/models/Server');
const Role = require('../database/models/Role');
const Channel = require('../database/models/Channel');
const Category = require('../database/models/Category');
const Permission = require('../database/models/Permission');
const { remove } = require('lodash');

exports.permissionToPermissionId = async (permission) => {
    const result = await Permission.findOne({ name: permission });
    return result;
}
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
exports.checkChannelPermission = async (socketId, serverId, channelId, permissionId) => {
    const userId = await this.socketIdToUserId(socketId);
    const userRoles = await this.userRolesInServer(userId._id, serverId);
    const channel = await Channel.findOne({
        _id: channelId,
        "rolesException.role_id": { "$in": userRoles },
        "rolesException.permission_id": permissionId,
    }).populate({ path: "rolesException.permission_id" });
    if (channel != null) {
        for (let i = 0; i < channel.rolesException.length; i++) {
            if (channel.rolesException[i].status == true) {
                return true;
            }
        }
        return false;
    } else {
        const category = await Category.findOne({
            channels: channelId,
            "rolesException.role_id": { "$in": userRoles },
            "rolesException.permission_id": permissionId,
        });
        if (category != null) {
            for (let i = 0; i < category.rolesException.length; i++) {
                if (category.rolesException[i].status == true) {
                    return true;
                }
            }
            return false;
        } else {
            return true;
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

