import express from "express";
import http from "http";
import socketIO from "socket.io";

import {createGame} from "./handler.js";

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("createRoom", (roomName) => {createGame(socket, roomName)});
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});