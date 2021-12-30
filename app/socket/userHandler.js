const Message = require('../database/models/Message');
const Token = require('../database/models/Token');
const Server = require("../database/models/Server");
const User = require("../database/models/User");


exports.joinRooms = async (io, socket, nameSpace) => {
  const token = await socket.handshake.headers.token;
  const tokenObj = await Token.findOne({ token });
  const userChannels = await User.userChannels(tokenObj._id);

  // console.log(userChannels);
  userChannels.map((value) => {
    value.list.map((value) => {
      console.log(value.channels);
    });
    console.log("...............");
  });
  // Server.userChannels('')
}

exports.privateMessage = (io, socket, nameSpace) => {

  const EventName = 'privateMessage';

  const privateMessage = (payload) => {
    const { from, to, body } = payload;
    Message.create({ from, to, body });
    nameSpace.to(payload.target_socket_id).emit(EventName, payload.body);
  }
  socket.on(EventName, privateMessage);
}

exports.channelMessage = (io, socket, nameSpace) => {

}