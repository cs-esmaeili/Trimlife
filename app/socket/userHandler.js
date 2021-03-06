const Message = require('../database/models/Message');
const Token = require('../database/models/Token');
const Server = require("../database/models/Server");
const User = require("../database/models/User");
const { socketIdToUserId,
  userServers,
  checkServerPermission,
  permissionToPermissionId,
  removeFalsePermissins,
  checkChannelPermission,
  userIdToSocketId
} = require("../utils/user");


exports.serversList = (io, socket, nameSpace) => {
  const EventName = 'serversList';
  const serversList = async (payload) => {
    const userId = await socketIdToUserId(socket.id);
    const servers = await userServers(userId);
    nameSpace.to(socket.id).emit(EventName, servers);
  }
  socket.on(EventName, serversList);
}
exports.channelsList = async (io, socket, nameSpace) => {
  const EventName = 'channelsList';
  const channelsList = async (payload) => {
    const { serverId } = payload;
    const userId = await socketIdToUserId(socket.id);
    const viewChannelsPermission = await permissionToPermissionId('View Channels');
    const viewChannelPermission = await permissionToPermissionId('View Channel');
    const checkUserServerPermission = await checkServerPermission(socket.id, serverId, viewChannelsPermission._id);
    if (checkUserServerPermission) {
      const server = await Server.findOne({ _id: serverId, users: userId })
        .populate({ path: "list", populate: { path: "channels" } }).lean();
      let list = server.list;
      let filters = [];
      for (let i = 0; i < list.length; i++) {
        let category = list[i];
        const fillterdChannels = await removeFalsePermissins(socket.id, serverId, viewChannelPermission._id, category.channels);
        if (fillterdChannels.length == 0) {
          filters.push(false);
        }
        category.channels = fillterdChannels;
        filters.push(true);
      }
      result = await list.filter((value, index) => filters[index]);
      console.log(result);
      nameSpace.to(socket.id).emit(EventName, result);
    } else {
      nameSpace.to(socket.id).emit(EventName, []);
    }
  }
  socket.on(EventName, channelsList);
}
exports.serversRoles = (io, socket, nameSpace) => {
  const EventName = 'serversRoles';
  const serversRoles = async (payload) => {
    const { serverId } = payload;
    const userId = await socketIdToUserId(socket.id);
    const adminstratorPermission = await permissionToPermissionId('Adminstrator');
    const manageRolesPermission = await permissionToPermissionId('Manage Roles');
    const checkAdminstratorPermission = await checkServerPermission(socket.id, serverId, adminstratorPermission._id);
    const checkManageRolesPermission = await checkServerPermission(socket.id, serverId, manageRolesPermission._id);
    if (checkAdminstratorPermission || checkManageRolesPermission) {
      const result = await Server.findOne({ _id: serverId, users: userId })
        .populate({ path: "users", select: ['userName', 'image'] }).populate({ path: "roles" }).select({ 'createdAt': 0, 'updatedAt': 0 });
      nameSpace.to(socket.id).emit(EventName, result);
    } else {
      nameSpace.to(socket.id).emit(EventName, "You dont have Permission");
    }
  }
  socket.on(EventName, serversRoles);
}
exports.usersOnChannel = (io, socket, nameSpace) => {
  const EventName = 'usersOnChannel';
  const usersOnChannel = async (payload) => {
    const { serverId, channeId } = payload;
    const userId = await socketIdToUserId(socket.id);
    const viewChannelPermission = await permissionToPermissionId('View Channel');
    const server = await Server.findOne({ _id: serverId, users: userId });
    let users = [];
    for (let i = 0; i < server.users.length; i++) {
      const user = server.users[i];
      const socketId = await userIdToSocketId(user);
      const checkViewChannelPermission = await checkChannelPermission(socketId.socket_id, serverId, channeId, viewChannelPermission._id);
      if (checkViewChannelPermission) {
        users.push(user);
      }
    }
    console.log(users);
  }
  socket.on(EventName, usersOnChannel);
}
exports.privateMessage = (io, socket, nameSpace) => {//TODO SECURITY
  const EventName = 'privateMessage';
  const privateMessage = async (payload) => {
    const { to, body } = payload;
    const { _id: from } = await socketIdToUserId(socket.id);
    const { socket_id } = await userIdToSocketId(to);
    Message.create({ from, to, body });
    nameSpace.to(socket_id).emit(EventName, payload.body);
  }
  socket.on(EventName, privateMessage);
}
exports.joinTextChannel = (io, socket, nameSpace) => {//TODO SECURITY
  const EventName = 'joinTextChannel';
  const joinTextChannel = async (payload) => {
    const { channelId } = payload;
    socket.join(channelId);
    nameSpace.to(socket.id).emit(EventName, `you joined to ${channelId} channel`);
  }
  socket.on(EventName, joinTextChannel);
}
exports.channelMessage = (io, socket, nameSpace) => {//TODO SECURITY
  const EventName = 'channelMessage';
  const channelMessage = async (payload) => {
    const { channelId, to = undefined, body } = payload;
    const { _id: from } = await socketIdToUserId(socket.id);
    Message.create({ channel_id: channelId, from, to, body });
    socket.broadcast.to(channelId).emit(EventName, { from, to, body });
  }
  socket.on(EventName, channelMessage);
}
exports.privateHistory = (io, socket, nameSpace) => {
  const EventName = 'privateHistory';
  const privateHistory = async (payload) => {
    const { to, itemsCount, pageNumber } = payload;
    const { _id: from } = await socketIdToUserId(socket.id);
    const result = await Message.find({ from, to }).skip((parseInt(pageNumber) - 1) * parseInt(itemsCount)).limit(parseInt(itemsCount));
    nameSpace.to(socket.id).emit(EventName, result);
  }
  socket.on(EventName, privateHistory);
}
exports.channelHistory = (io, socket, nameSpace) => {
  const EventName = 'channelHistory';
  const channelHistory = async (payload) => {
    const { channelId, itemsCount, pageNumber } = payload;
    const result = await Message.find({ channel_id: channelId }).skip((parseInt(pageNumber) - 1) * parseInt(itemsCount)).limit(parseInt(itemsCount));
    nameSpace.to(socket.id).emit(EventName, result);
  }
  socket.on(EventName, channelHistory);
}