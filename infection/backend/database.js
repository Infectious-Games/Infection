const Sequelize = require('sequelize');
//const AWS = require('../config');

const dotenv = require('dotenv');
dotenv.load();

const db = new Sequelize(`mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URI}:3306/${process.env.DATABASE_NAME}`, {})

db.authenticate()
  .then(() => {
    console.log('Connection to db has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = db.define('User', {
  username: Sequelize.STRING
});

//game schema
const Game = db.define('game', {
  numberOfPlayers: Sequelize.INTEGER,
  winner: Sequelize.STRING,
  results: {
    type: Sequelize.STRING,
    allowNull: true,
      get() {
        return this.getDataValue('results').split(';')
      },
      set(val) {
        this.setDataValue('results',val.join(';'));
      },
  },
});

Game.sync({force: true})
  .then(game => {
    console.log('game model created in db')
  })
  .catch(err => {
    console.error(err);
  })

// find or create user
const updateUser = (user, callback) => {
  const {username} = user;
  User.findOrCreate({ where: { username: username }})
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      callback(created);
    })
}

const createGameAndGetJoinCode = (count, cb) => {
  //grab user id to pass into game
  Game
  .create({ numberOfPlayers: count })
  .then(game => {
    console.log(game.get('id'), 'game id');
    cb(game.get('id'));
  })
  .catch(err => {
    console.error(err);
  })
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
  createGameAndGetJoinCode,
  updateUser,
  db,
};