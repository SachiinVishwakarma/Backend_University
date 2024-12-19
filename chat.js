const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "publics")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "publics", "chat.html"));
});

io.on("connection", (socket) => {
    console.log('A user connected');
    socket.on("chatMessage", (msg) => {
        io.emit("chatMessage", msg);
    });

    socket.on("disconnect", () => {
        console.log('A user disconnected');
    });
});

server.listen(9000, () => console.log('Server started on port 9000'));
