// root of node application
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');

const publicPath = path.join(__dirname, '../../build');
const port = process.env.PORT || 3000;
const app = express();

// Configure express to use http
const server = http.createServer(app);
// Configure the server to use SocketIO
// Returns the websocket server
const io = socketIO(server);
const users = new Users();
const rooms = new Rooms();

app.use(express.static(publicPath));

// Listen for a new connection,
// do something when that connection comes in.
// You'll usually not be attaching anything to 'io'.
// io.on connection is a special event.
io.on('connection', (socket) => {
    io.emit('updateRoomList', {rooms: rooms.rooms});

    socket.on('join', (user, callback) => {
        if(!isRealString(user.displayName) || !isRealString(user.roomName)){
            return callback('Display name and room name are required');
        }

        // join a room
        socket.join(user.roomName);
        // socket.leave(roomName) to leave the group

        // To make sure there is no user with socket.id already in there:
        users.removeUser(socket.id);

        users.addUser(socket.id, user.displayName, user.roomName);

        rooms.addUserToRoom(socket.id, user.roomName);
        io.emit('updateRoomList', {rooms: rooms.rooms});

        console.log(rooms.rooms);
        // Tells every user the new list of users in the chat room
        io.to(user.roomName).emit('updateUserList', users.getUserList(user.roomName));

        // Greet the individual user
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

        // Tells everyone that the user has joined
        socket.broadcast.to(user.roomName).emit('newMessage', generateMessage('Admin', `${user.displayName} has joined`));

        callback();
    });

    socket.on('disconnect', () => {
       console.log('Client has disconnected');
       const user = users.removeUser(socket.id);

       if(user) {
           rooms.removeUserFromRoom(socket.id, user.roomName);
           console.log(rooms.rooms);
           io.to(user.roomName).emit('updateUserList', users.getUserList(user.roomName));
           io.to(user.roomName).emit('newMessage', generateMessage('Admin', `${user.displayName} has left`));

           io.emit('updateRoomList', {rooms: rooms.rooms});
       }
    });

    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);

        if(user && isRealString(message.text)){
            io.to(user.roomName).emit('newMessage', generateMessage(user.displayName, message.text));
        }
        callback('This is from the server');
    });

    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);

        if(user){
            io.to(user.roomName).emit('newLocationMessage', generateLocationMessage(user.displayName, coords.latitude, coords.longitude));
        }
    });

});

server.listen(port, () => {
    console.log(`Server is up on port ${port}`)
});