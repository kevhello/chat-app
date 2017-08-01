const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            displayName: 'Kev',
            roomName: 'MongoDB',
        },
        {
            id: '2',
            displayName: 'Tom',
            roomName: 'React'
        },
        {
            id: '3',
            displayName: 'Sarah',
            roomName: 'React',
        }]
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '5556',
            displayName: 'Kev',
            roomName: 'thisRoom',
        };

        const testUser = users.addUser(user.id, user.displayName, user.roomName);

        expect(users.users).toEqual([testUser]);
    });

    it('should return names for React course', () => {
        const userList = users.getUserList('React');

        expect(userList).toEqual(['Tom','Sarah'])
    });

    it('should return names for MongoDB course', () => {
        const userList = users.getUserList('MongoDB');
        expect(userList).toEqual(['Kev']);
    });

    it('should remove a user', () => {
        const userId = '1';
        const user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        const user = users.removeUser('500');
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find the user', () => {
        const foundUser = users.getUser('1');
        expect(foundUser).toEqual(users.users[0]);
    });

    it('should not find the user', () => {
        const foundUser = users.getUser('5000');
        expect(foundUser).toNotExist();
    });
});
