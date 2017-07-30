// root of node application
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../build');
const port = process.env.PORT || 3000;
const app = express();

// Configure express to use http
const server = http.createServer(app);
// Configure the server to use SocketIO
// Returns the websocket server
const io = socketIO(server);

app.use(express.static(publicPath));

// Listen for a new connection,
// do something when that connection comes in
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
       console.log('Client has disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});