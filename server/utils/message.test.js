var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');


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

describe('generateLocationMessage', () => {
  it('should generate correct location object', ()=>{
    var from = 'Deb';
    var latitude = 15;
    var longitude = 19;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    var message =  generateLocationMessage(from,latitude,longitude);

    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from, url});
    expect(url).toBe(message.url);
  });
});
