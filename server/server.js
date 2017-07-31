// root of node application
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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

    // Greet the individual user
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));


    // Tells everyone that the user has joined
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined'));


    socket.on('disconnect', () => {
       console.log('Client has disconnected');
    });

    socket.on('createMessage', (message, callback) => {
        console.log(message);
        io.emit('newMessage', generateMessage(message.from, message.text));


        callback('This is from the server');
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});