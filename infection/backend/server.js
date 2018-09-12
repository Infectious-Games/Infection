const port = process.env.PORT || 3005;
console.log(`using port ${port}`);
// const express = require('express');
// // const http = require('http');
// const bodyParser = require('body-parser');
// const routes = require('./routes.js');
// const sockets = require('./sockets.js');

// const app = express();
// app.set('port', port);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// routes(app);

// const server = app.listen(port, err => {
//   if (err) {
//     console.error(err);
//   } else {
//     console.error('listening on port', port);
//   }
// });

// sockets(server);
