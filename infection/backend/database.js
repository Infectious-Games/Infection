const dotenv = require('dotenv');

dotenv.load();

const mongoose = require('mongoose');

mongoose.connect(
  `mongodb://${process.env.DATABASE_USERNAME}:${
    process.env.DATABASE_PASSWORD
  }@${process.env.DATABASE_URI}/${process.env.DATABASE_NAME}`
);

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  gamesPlayed: Number,
  wins: Number,
  losses: Number,
  clearanceLevel: String,
  photo: String,
});

const User = mongoose.model('User', userSchema);

const gameSchema = mongoose.Schema({
  numberOfPlayers: Number,
  pal3000Active: Boolean,
  winner: String,
});

const Game = mongoose.model('Game', gameSchema);

const findUser = (profile, callback) => {
  User.find(profile, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      callback(user);
    }
  });
};

const createUser = (profile, callback) => {
  const { username } = profile;
  const { password } = profile;
  const { photo } = profile;
  const newUser = new User({
    username,
    password,
    gamesPlayed: 0,
    wins: 0,
    losses: 0,
    clearanceLevel: 'unclassified',
    photo,
  });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
    } else {
      callback(user);
    }
  });
};

// Add PAL3000 to users in db, if PAL3000 isn't already there
User.find({ username: 'PAL3000' })
  .then(PAL3000 => {
    // if PAL3000 isn't on the db
    if (!PAL3000.length) {
      // initiate PAL3000
      const pal3000 = new User({
        username: 'PAL3000',
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        clearanceLevel: 'unclassified',
      });
      // add PAL3000 to the db
      pal3000.save((err, pal) => {
        if (err) {
          console.error(err);
        } else {
          console.log('PAL3000 added to the db', pal);
        }
      });
    }
  })
  .catch(err => console.error(err));

const createGameAndGetJoinCode = ({ playerCount, pal3000Active }, callback) => {
  // grab user id to pass into game
  const newGame = new Game({ numberOfPlayers: playerCount, pal3000Active });
  newGame.save((err, game) => {
    if (err) {
      console.log(err);
    } else {
      callback(game.id);
    }
  });
};

const superTeam = (username, wins, losses, gamesPlayed, clearanceLevel) => {
  User.find({ username })
    .then(user => user.update({ wins, losses, gamesPlayed, clearanceLevel }))
    .catch(err => console.error(err));
};

const palActive = (id, callback) => {
  Game.find({ _id: id }).then(game => {
    callback(game[0].pal3000Active);
  });
};

const clearanceLevels = wins => {
  let clearanceLevel = '';
  if (wins < 10) {
    clearanceLevel = 'unclassified';
  }
  if (wins > 9 && wins < 20) {
    clearanceLevel = 'confidential';
  }
  if (wins > 19 && wins < 50) {
    clearanceLevel = 'secret';
  }
  if (wins > 49 && wins < 100) {
    clearanceLevel = 'top-secret';
  }
  if (wins > 99 && wins < 1000) {
    clearanceLevel = 'illuminati';
  }
  return clearanceLevel;
};

// update user stats
const updateUserStats = ({ win, username }, callback) => {
  let toIncrement = {};
  // check for win or loss
  if (win) {
    toIncrement = { $inc: { gamesPlayed: 1, wins: 1 } };
  } else {
    toIncrement = { $inc: { gamesPlayed: 1, losses: 1 } };
  }
  // find user and increment fields
  User.findOneAndUpdate({ username }, toIncrement, { new: true })
    .then(user => {
      const { wins } = user;
      // check clearanceLevel
      const clearanceLevel = clearanceLevels(wins);
      return user.update({ clearanceLevel });
    })
    .then(() => User.find({ username }))
    // return the updated user
    .then(user => callback(user))
    .catch(err => console.error(err));
};

// get user stats
const getUserStats = ({ username }, callback) => {
  // find user
  User.find({ username })
    // return the user
    .then(user => callback(user));
};

// drop the db
// User.sync({ force: true }).then(() => {
//   console.log('USER DATABASE DROPPED');
// });

// Game.sync({ force: true }).then(() => {
//   console.log('GAME DATABASE DROPPED');
// });

module.exports = {
  createGameAndGetJoinCode,
  findUser,
  createUser,
  updateUserStats,
  getUserStats,
  db,
  User,
  Game,
  palActive,
  superTeam,
};
