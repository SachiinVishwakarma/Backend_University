const http = require('http');
const express = require('express');
const path = require('path');

const {Server}=require('socket.io');

const app = express();
const server = http.createServer(app);
const io=new Server(server);

io.on

app.use(express.static(path.resolve(__dirname, "publics")));

app.get("/", (req, res) => {
    return res.sendFile(path.resolve(__dirname, "publics", "chat.html"));
});

server.listen(9000, () => console.log('Server started on port 9000'));
