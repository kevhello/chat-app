const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime(),
        type: 'message'
    };
};

const generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime(),
        type: 'geoMessage',
    };
};

module.exports = {generateMessage, generateLocationMessage};