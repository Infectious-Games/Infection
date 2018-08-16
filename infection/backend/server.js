const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { join } = require('path');
const routes = require('./routes.js');
const sockets = require('./sockets.js');
const db = require('./database');

const app = express();

app.use(express.static(join(__dirname, '../build')));

const port = process.env.PORT || 3005;
app.set('port', port);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

app.post('/checkUser', (req, res) => {
  console.log('app.post /checkUser in server');
  // const body = req.body;
  const { body } = req;
  console.log(body, 'body app.post in server');
  db.updateUser(body, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      console.log('app.post db.updateUser called in server');
      // res.json(data);
      // res.send(data);
    }
  });
});

const server = app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('listening on port', port);
    }
});

sockets(server);