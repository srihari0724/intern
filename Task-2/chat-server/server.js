const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('sendMessage', (messageData) => {
        io.emit('receiveMessage', messageData);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5000, () => {
    console.log('✨ Chat server running on port 5000');
});
