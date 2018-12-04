const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  // socket.emit('newMessage',{
  //   from: 'John',
  //   text: 'Hey. What up June?',
  //   createdAt: 124
  // });


  socket.on('createMessage',(message,callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from the server');
    // socket.broadcast.emit('newMessage',{
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });



  //https://www.google.com/maps?q=34.025591299999995,-118.37538749999999

  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });

});



console.log(publicPath);


server.listen(port ,()=>{
    console.log(`Server is up on port ${port}`);
});
