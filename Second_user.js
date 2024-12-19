const http = require('http');
const express = require('express');
const path = require('path'); 
const { Server } = require('socket.io');
const { io: Client } = require('socket.io-client');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Connect to the primary server (localhost:9000)
const primaryServer = Client('http://localhost:9000');

// Serve static files
app.use(express.static(path.resolve(__dirname, "publics"))); 

// Serve chat page
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "publics", "chat.html"));
});

// Handle socket connections on the secondary server
io.on("connection", (socket) => {
    console.log("User connected to secondary server:", socket.id);

    // Register the user as "Rahul"
    const name = "Tamana";
    // Pass the name to the primary server
    primaryServer.emit("new-user-join", name);

    // Forward messages from secondary server clients to the primary server
    socket.on("chatMessage", (msg) => {
        primaryServer.emit("chatMessage", msg);
    });

    // Forward messages from the primary server to secondary server clients
    primaryServer.on("chatMessage", (data) => {
        // Ensure that the name is included in the message
        socket.emit("chatMessage", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected from secondary server:", socket.id);
    });
});

// Start the server
server.listen(4000, () => console.log("Secondary Server (Rahul) running on http://localhost:4000"));
