const expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        const from = 'Kev',
            text = 'Message is here',
            type = 'message',
            message = generateMessage( from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text, type});
    });

});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        const from = 'Kev',
            latitude = 1,
            longitude = 1,
            url = `https://www.google.com/maps?q=${latitude},${longitude}`,
            type = 'geoMessage';
            message = generateLocationMessage(from, latitude, longitude);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url, type});
    });
});