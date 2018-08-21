const Sequelize = require('sequelize');
const AWS = require('../config');

const db = new Sequelize(`mysql://${AWS.databaseUsername}:${AWS.databasePassword}@${AWS.databaseURI}:3306/${AWS.datbaseName}`, {})

db.authenticate()
  .then(() => {
    console.log('Connection to db has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = db.define('User', {
  username: Sequelize.STRING,
  gamesPlayed: Sequelize.INTEGER,
  wins: Sequelize.INTEGER,
  loses: Sequelize.INTEGER,
  clearanceLevel: Sequelize.STRING,
});

// find or create user
const updateUser = (user, callback) => {
  const {username} = user;
  User.findOrCreate({ where: { username: username },
    defaults: { 
      gamesPlayed: 0,
      wins: 0,
      loses: 0,
      clearanceLevel: "Rookie"
    }
  })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      callback(created);
    })
}

// update user stats
const updateUserStats = (user, callback) => {
  User.update({
    wins: user.wins,
    loses: user.loses,
    clearanceLevel: user.clearanceLevel,
  }, { where: { username: user.username }
    })
    .then(() => {
      User.increment('gamesPlayed', { where: { username: user.username } })    
      .then(() => {
        User.findAll({ where: { username: user.username } })
        .then(data => {
          callback(data)
        })
      })
    })
}

// drop the db
User.sync({ force: true }).then(() => {
  console.log('DATABASE DROPPED');
});

module.exports = {
  updateUser,
  updateUserStats,
  db,
};