const http = require('http');
const express = require('express');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const users = {};

// Serve static files
app.use(express.static(path.resolve(__dirname, "publics")));

// Serve chat page
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "publics", "chat.html"));
});

// Handle socket connections
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    // Handle new user joining
    socket.on("new-user-join", (name) => {
        users[socket.id] = name;
        socket.broadcast.emit("user-joined", { name });
    });

    // Handle chat messages
    socket.on("chatMessage", (msg) => {
        const name = users[socket.id] || "Chinu";
        io.emit("chatMessage", { message: msg, name });
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        const name = users[socket.id];
        if (name) {
            socket.broadcast.emit("user-left", { name });
        }
        delete users[socket.id];
    });
});

// Start the server
server.listen(9000, () => console.log("Primary Server running on http://localhost:9000"));
