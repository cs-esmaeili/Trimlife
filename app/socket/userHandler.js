const Message = require('../database/models/Message');
const Token = require('../database/models/Token');
const Server = require("../database/models/Server");
const User = require("../database/models/User");
const { socketIdToUserId, userServers, checkServerPermission, permissionToPermissionId, removeFalsePermissins } = require("../utils/user");


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
    const userId = await socketIdToUserId(socket.id);
    const serverId = payload.serverId;
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
      nameSpace.to(socket.id).emit(EventName, result);
    } else {
      nameSpace.to(socket.id).emit(EventName, []);
    }
  }
  socket.on(EventName, channelsList);
}
