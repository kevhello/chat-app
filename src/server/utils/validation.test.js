const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        const number = 5;
        expect(isRealString(number)).toBe(false);
    });

    it('should reject string with only spaces', () => {
        const str = '      ';
        expect(isRealString(str)).toBe(false);
    });

    it('should allow string with non-space characters', () => {
        const str = '   d554d  ';
        expect(isRealString(str)).toBe(true);
    });

});