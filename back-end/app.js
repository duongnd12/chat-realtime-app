// ESmodule vs CommonJS
// CORS

const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");
const SOCKET_CONFIGS = require("./constants/socket.constant");

const app = express();

const CLIENT_ORIGIN = "http://localhost:3000";

app.use(
  cors({
    origin: CLIENT_ORIGIN,
    methods: "*",
  })
);

const httpServer = http.createServer(app);

const io = new socket.Server(httpServer, {
  cors: {
    origin: CLIENT_ORIGIN,
    methods: "*",
  },
});
let users = [];

io.on("connection", (socket) => {
  console.log("HAS NEW CONNECTION:", socket.id);

  socket.on("disconnect", (reason) => {
    console.log("A CONNECTION DISCONNECT:", reason);
    users = users.filter((user) => user.socketId != socket.id);
    io.emit(SOCKET_CONFIGS.SOCKET_ACTIONS.GET_ALL_ONLINE_MEMBERS, users);
  });

  socket.on(SOCKET_CONFIGS.SOCKET_ACTIONS.JOIN_CHAT, (data) => {
    users.push({ username: data.username, socketId: socket.id });
    io.emit(SOCKET_CONFIGS.SOCKET_ACTIONS.JOIN_CHAT, {
      ...data,
    });
    io.emit(SOCKET_CONFIGS.SOCKET_ACTIONS.GET_ALL_ONLINE_MEMBERS, users);
  });

  socket.on(SOCKET_CONFIGS.SOCKET_ACTIONS.CHAT, (data) => {
    io.emit(SOCKET_CONFIGS.SOCKET_ACTIONS.CHAT, {
      sender: data.sender,
      message: data.message,
    });
  });
});

httpServer.listen(5000, () => {
  console.log("SERVER IS RUNNING ON PORT", 5000);
});
