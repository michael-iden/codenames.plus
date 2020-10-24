
let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

let fs = require('fs')
let readline = require('readline')

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('doThing', (msg) => {
    socket.emit('game', {words: basewords})
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});

const basewords = [];
loadWords(basewords);

function loadWords(words) {
  // Load base words into an array
  var filename = "./codewords/words.txt";
  readline
    .createInterface({
      input: fs.createReadStream(filename),
      terminal: false,
    })
    .on("line", (line) => {
      words.push(line);
    });
}
