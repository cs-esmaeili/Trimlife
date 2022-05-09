const path = require("path");
const http = require("http");
const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');
dotEnv.config({ path: "./config/config.env" });
// const winston = require("./config/winston");
const morgan = require("morgan");
const { connect } = require('./app/database');
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const socket = require('./app/socket');


connect();
//* BodyPaser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//* Static Folder
app.use(express.static(path.join(__dirname, "public")));
//* Logging
if (process.env.NODE_ENV === "development") {
  // app.use(morgan("combined", { stream: winston.systemlogger.stream }));
}
app.use(cors({
    origin: 'http://localhost:3001'
}));
//* Routes
app.use("/users", require("./app/routes/users"));
//* Server Listen
server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on Port : ${PORT}`)
});
socket(server);