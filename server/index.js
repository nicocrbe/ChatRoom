const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);

const socketIO = new Server(httpServer, { 
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
 });

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));
});

httpServer.listen(4000)