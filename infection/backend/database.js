const Sequelize = require('sequelize');
const AWS = require('../config');

// const dotenv = require('dotenv');
// dotenv.load();

// const db = new Sequelize(`mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_URI}:3306/${process.env.DATABASE_NAME}`, {})
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
const updateUser = ({username}, callback) => {
  User.findOrCreate({ where: { username },
    defaults: { 
      gamesPlayed: 0,
      wins: 0,
      loses: 0,
      clearanceLevel: 'Collateral Clearance'
    }
  })
    .spread((user, created) => {
      console.log(user.get({
        plain: true
      }))
      callback(created);
    })
}

const clearanceLevels = (wins => {
  if (wins < 10) {
    return 'Collateral Clearance';
  } else if (wins > 9 && wins < 20) {
    return 'Confidential';
  } else if (wins > 19 && wins < 50) {
    return 'Secret';
  } else if (wins > 49 && wins < 100) {
    return 'Top Secret';
  } else if (wins > 99) {
    return 'Illuminati';
  }
}) 

// update user stats
const updateUserStats = ({win, username} , callback) => {
  // check for win or loss
  const result = win ? 'wins': 'loses';
  // create array of attributes to increment
  const toIncrement = ['gamesPlayed', result];
  // find user
  User.find({ where: { username } })
    // increment fields
    .then((user) => user.increment(toIncrement))
    .then((user) => {
      const wins = user.wins;
      // check clearanceLevel
      const clearanceLevel = clearanceLevels(wins);
      return user.update({ clearanceLevel })
    })
    .then(() => User.find({ where: { username } }))
    // return the updated user
    .then((user) => callback(user))
}

// drop the db
User.sync({ force: true }).then(() => {
  console.log('DATABASE DROPPED');
});

module.exports = {
  updateUser,
  updateUserStats,
  db,
  User
};