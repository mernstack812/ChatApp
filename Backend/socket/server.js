import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chatapp-pd49.onrender.com",
    methods: ["GET", "POST"],
  },
});

export const getReciverSocketId = (recieverId) => {
  return users[recieverId];
};

const users = {};

//used to listen events on server side
io.on("connection", (socket) => {
  console.log("User connected", socket.id);
  const userId = socket.handshake.query.userId;

  if (userId) {
    users[userId] = socket.id;
    console.log(users);
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

export { app, io, server };
