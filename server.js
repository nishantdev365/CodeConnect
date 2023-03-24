import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import ACTIONS from "./src/Actions.js";
import * as dotenv from 'dotenv'

const app = express();
const server = createServer(app);
const io = new Server(server);

dotenv.config()

app.use(express.static(path.join(process.cwd(), 'dist')));
app.use((req, res, next) => {
  res.sendFile(path.join(process.cwd(), 'dist', 'index.html'))
});

const userSocketMap = {};

function getAllConnectedUsers(userId) {
  return Array.from(io.sockets.adapter.rooms.get(userId) || []).map(
    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}


io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ userId, userName }) => {
    userSocketMap[socket.id] = userName;
    socket.join(userId);
    const users = getAllConnectedUsers(userId);
    users.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        users, 
        userName, 
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({userId, code}) => {
   
    socket.in(userId).emit(ACTIONS.CODE_CHANGE, { code });
  })

  socket.on(ACTIONS.SYNC_CODE, ({socketId, code}) => {
   
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  })

  socket.on('disconnecting', () => {
    const rooms = [...socket.rooms]
    rooms.forEach((userId) => {
              socket.in(userId).emit(ACTIONS.DISCONNECTED, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
              })
    })
   delete userSocketMap[socket.id];
   socket.leave();
  })
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
