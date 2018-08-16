const Sequelize = require('sequelize');
const AWS = require('../config');

const db = new Sequelize(`mysql://${AWS.databaseUsername}:${AWS.databasePassword}@${AWS.databaseURI}:3306/${AWS.datbaseName}`, {})

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
const User = db.define('User', {
  username: Sequelize.STRING
});

// create user or update user
const updateUser = (user) => {
  console.log(user, 'user in database');
  User.sync()
    .then(function() {
      // Now instantiate an object and save it:
      return User.findOrCreate({ username: user });
    })
    .then(function() {
      // Retrieve objects from the database:
      return User.findAll({ where: { username: user } });
    });
  db.close();
}

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
// User.sync()
//   .then(function() {
//     // Now instantiate an object and save it:
//     return User.create({username: 'Jean Valjean'});
//   })
//   .then(function() {
//     // Retrieve objects from the database:
//     return User.findAll({ where: {username: 'Jean Valjean'} });
//   })
//   .then(function(users) {
//     users.forEach(function(user) {
//       console.log(user.username + ' exists');
//     });
//     db.close();
//   })
//   .catch(function(err) {
//     // Handle any error in the chain
//     console.error(err);
//     db.close();
//   });

module.exports = {
  updateUser,
};