var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () =>{
 it('should generate the correct message object', () =>{
   var from = 'dave';
   var text = 'this is a test';
   var messageObj = generateMessage(from,text);
   expect(messageObj.from).toBe(from);
   expect(messageObj.text).toBe(text);
   expect(messageObj).toInclude({from, text});
   expect(typeof messageObj.createdAt).toBe('number');

 })
});
