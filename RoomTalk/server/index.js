const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`User with ID: ${socket.id} joined room: ${room}`);
    });

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
