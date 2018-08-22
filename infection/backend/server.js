const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { join } = require('path');
const routes = require('./routes.js');
const sockets = require('./sockets.js');
const db = require('./database');
// const { createGameAndGetJoinCode } = require('./database');

const app = express();

app.use(express.static(join(__dirname, '../build')));

const port = process.env.PORT || 3005;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

// find or add a user to the db
app.post('/user', (req, res) => {
  const { body } = req;
  db.updateUser(body, (data) => {
    // response is true if user has been added to db, or false if user already exists
    res.json(data);
  });
});

app.post('/start', (req, res) => {
  const { body } = req;
  const playerCount = body.playerCount; //TODO: client should send a player count on create game
  console.log(playerCount, 'playerCount from client');
  let joinCode = db.createGameAndGetJoinCode(playerCount);
  //console.log(joinCode);
  // response is true if user has been added to db, or false if user already exists
  res.json(joinCode);
});


const server = app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('listening on port', port);
    }
});

sockets(server);