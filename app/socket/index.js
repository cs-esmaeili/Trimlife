const { serversList, channelsList, serversRoles, usersOnChannel, privateMessage, joinTextChannel , channelMessage } = require("./userHandler");
const userLogIn = require("../middlewares/socket/userLogIn");
const { Server } = require("socket.io");


const initialize = (server) => {

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
    }
  });
  const userNamespace = io.of("/user");
  global.userNamespace = userNamespace;

  const onConnection = async (socket) => {
    await console.log('user connected = ' + socket.id);
    await serversList(io, socket, userNamespace);
    await channelsList(io, socket, userNamespace);
    await serversRoles(io, socket, userNamespace);
    await usersOnChannel(io, socket, userNamespace);
    await privateMessage(io, socket, userNamespace);
    await joinTextChannel(io, socket, userNamespace);
    await channelMessage(io, socket, userNamespace);
  }

  userLogIn(io, userNamespace); // middleware
  userNamespace.on("connection", onConnection);

}

module.exports = initialize;