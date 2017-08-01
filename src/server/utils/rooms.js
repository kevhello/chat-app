

class Rooms {
    constructor(){
        this.rooms = [];
    }

    addUserToRoom(socketId, roomName){
        const room = this.rooms.find(room => room.roomName === roomName);
        if(!room){
            // Room doesn't exist; add it to the list of active rooms
            const newRoom = {roomName, users: [socketId]};
            this.rooms = [...this.rooms, newRoom];
        } else {
            // Room already exists

            // Check if the user is already in room
            const user = room.users.find(userId => userId === socketId);
            if(!user){
                // User not in room; add the user into the room
                room.users = [...room.users, socketId];
            }
        }
    }

    removeUserFromRoom(socketId, roomName){
        // Get the room to remove
        let roomIndex = this.rooms.findIndex(room => room.roomName === roomName);

        if(roomIndex !== -1){
            // Room exists

            if(this.rooms[roomIndex].users.length === 1){
                // If the room is about to be empty, remove it
                this.rooms = this.rooms.filter((room, i) => i !== roomIndex);
            } else {
                // Room not about to be empty, keep the room, remove the user from
                // the room.
                this.rooms[roomIndex] = this.rooms[roomIndex].users.filter(user => user !== socketId);
            }
        }
    }

}

module.exports = {Rooms};