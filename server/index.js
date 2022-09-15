const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
  io.emit('message', `The Anonimus_${socket.id.substr(0, 2)} has connected to the chat.`);

  socket.on('message', (message) => {
    io.emit('message', `Anonimus_${socket.id.substr(0, 2)}: ${message}`);
  });

  socket.on('disconnect', () => {
    io.emit('message', `The Anonimus_${socket.id.substr(0, 2)} left the chat.`);
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));