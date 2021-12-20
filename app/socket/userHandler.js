const Message = require('../database/models/Message');
module.exports = (io, socket, nameSpace) => {
  const privateMessage = (payload) => {
    const { from, to, body } = payload;
    Message.create({ from, to, body });
    nameSpace.to(payload.target_socket_id).emit('privateMessage', payload.body);
  }
  socket.on("privateMessage", privateMessage);
}