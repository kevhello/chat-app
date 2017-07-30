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
// do something when that connection comes in.
// You'll usually not be attaching anything to 'io'.
// io.on connection is a special event.
io.on('connection', (socket) => {
    console.log('New user connected');

    // 1st arg: The event to emit
    // 2nd arg: custom data (usually an object)

    socket.on('disconnect', () => {
       console.log('Client has disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log(message);
    });

    socket.emit('newMessage', {
        from: "Kev",
        text: "Hi",
        createdAt: '222'
    });


});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});