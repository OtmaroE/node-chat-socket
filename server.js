const net = require('net');

const server = net.createServer();

let baseId = 0;
const existingSockets = {};

server.on('connection', socket => {
  socket.id = baseId++;
  existingSockets[socket.id] = socket;
  console.log(`${socket.id} connected`);

  socket.on('data', data => {
    Object.entries(existingSockets).forEach(([, socket]) => {
      socket.write(`${socket.id}: ${data}`);
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
  });
});

server.listen(3000, console.log('Ready to accept connections'));
