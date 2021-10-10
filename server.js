// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 3000;

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
// });

// http.listen(port, () => {
//   console.log(`Socket.IO server running at http://localhost:${port}/`);
// });

var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const { log } = require('console');
var fs = require('fs');
var bufferMain;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', (socket) => {
  fs.readFile('./frag_bunny.mp4', (err, buffer) => {
    if (err) throw err;
    bufferMain = toArrayBuffer(buffer);
  });

  console.log(bufferMain);
  socket.emit('chank', bufferMain);

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

  // socket.on('message', function all(message) {
  //   console.log(message);
  //   socket.broadcast.emit('message', message);
  // });
});

io.on('err', (err) => {
  console.log(err.message);
});

http.listen(8000, () => {
  console.log('listening on *:8000');
});
//-------------------------------------------

function toArrayBuffer(buf) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}
