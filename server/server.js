const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New user connected');



  // socket.emit('newMessage',{
  //   from: 'John',
  //   text: 'Hey. What up June?',
  //   createdAt: 124
  // });

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required.')
    }

   socket.join(params.room);
   users.removeUser(socket.id);
   users.addUser(socket.id, params.name,params.room);
   //socket.leave(params.room);

   //io.emit -> io.to(params.room).emit //goes to everyone
   //socket.broadcast.emit -> socket.broadcast.to(params.room).emit //goes to everyone but sender
   //socket.emit  //goes to one person
   io.to(params.room).emit('updateUserList', users.getUserList(params.room))
   socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
   socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined.`));

   callback();
  });

  socket.on('createMessage',(message,callback) =>{
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    callback();
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
    var user = users.removeUser(socket.id)

    if (user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });

});



console.log(publicPath);


server.listen(port ,()=>{
    console.log(`Server is up on port ${port}`);
});
