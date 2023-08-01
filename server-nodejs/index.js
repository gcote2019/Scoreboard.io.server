const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const fs = require('fs');
const path = require('path');
const gameOverFilename = __dirname + `/gameOver${port}`;
//const gameUpdateFilename = __dirname + `/gameUpdate${port}`;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let lastMessage = "";
let games = [];
/*
try {
  if (fs.existsSync(gameUpdateFilename)) {
    lastMessage = fs.readFileSync(gameUpdateFilename);
  }
} catch(err) {
  console.error(err)
}
*/

try {
  if (fs.existsSync(gameOverFilename)) {
    let data = fs.readFileSync(gameOverFilename);
    games = JSON.parse(data);
  }
} catch(err) {
  console.error(err)
}

io.on('connection', (socket) => {
  socket.on('game update', msg => {
    io.emit('game update', msg);
	  lastMessage = msg;
    //fs.writeFileSync(gameUpdateFilename, msg);
    //console.log(msg);
  });
  
  socket.on('game over', msg => {
	  console.log("--------------------------------");
	  games.push(msg);
    io.emit('game over', msg);
    let output = "";
    fs.writeFileSync(gameOverFilename, JSON.stringify(games));
    //console.log(msg);
  });
  
  socket.on('clear results', msg => {
	console.log("--------------------------------");
	games.length = 0;
    io.emit('clear results', '');
    //console.log('clear results');
    try {
      if (fs.existsSync(gameOverFilename)) {
        fs.unlinkSync(gameOverFilename);
      }
    } catch(err) {
      console.error(err)
    }
  });

  if (lastMessage.length > 0) {
	  socket.emit('game update', lastMessage);
  }
  
  socket.emit('game over', JSON.stringify(games));
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
