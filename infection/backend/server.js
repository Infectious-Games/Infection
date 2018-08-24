const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { join } = require('path');
const routes = require('./routes.js');
const sockets = require('./sockets.js');
const db = require('./database');

const app = express();

const port = process.env.PORT || 3005;
app.set('port', port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('listening on port', port);
  }
});

sockets(server);

app.use(express.static(join(__dirname, '../build')));