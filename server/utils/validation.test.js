const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () =>{
  var number = 2;
  var spaceString = '   ';
  var testString = 'asdf';

  it('should reject non-string values', () =>{
    expect(isRealString(number)).toBe(false);
  });

  it('should reject string with only spaces', ()=>{

      expect(isRealString(spaceString)).toBe(false);
  });

it('should accept string', ()=>{
  expect(isRealString(testString)).toBe(true);
    });
});
