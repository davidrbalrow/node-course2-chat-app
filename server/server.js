const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New user connected');

  socket.emit('newMessage',{
    from: 'Admin',
    text: 'Welcome to chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage',{
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // socket.emit('newMessage',{
  //   from: 'John',
  //   text: 'Hey. What up June?',
  //   createdAt: 124
  // });


  socket.on('createMessage',(newMessage) =>{
    console.log('createMessage', newMessage);


    io.emit('newMessage',{
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
    // socket.broadcast.emit('newMessage',{
    //     from: newMessage.from,
    //     text: newMessage.text,
    //     createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('Disconnected from server');
  });

});



console.log(publicPath);


server.listen(port ,()=>{
    console.log(`Server is up on port ${port}`);
});
