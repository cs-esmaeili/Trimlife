const userHandler = require("./userHandler");
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

  const onConnection = (socket) => {
    console.log('user connected = ' + socket.id);
    userHandler(io, socket, userNamespace);
  }

  userLogIn(io, userNamespace); // middleware
  userNamespace.on("connection", onConnection);
}

module.exports = initialize;