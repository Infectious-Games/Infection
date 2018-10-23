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
  User.find(
    profile,
    // callback
    (err, user) => {
      if (err) {
        console.log(err);
      } else {
        callback(user);
      }
    }
  );
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

// Add PAL3000 to the db
// const pal3000 = new User({
//   username: 'PAL3000',
//   gamesPlayed: 0,
//   wins: 0,
//   losses: 0,
//   clearanceLevel: 'unclassified',
// });
// pal3000.save((err, pal) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(pal, 'PAL3000 added to the db');
//   }
// });

// const createGameAndGetJoinCode = ({ playerCount, pal3000Active }) => {
//   // grab user id to pass into game
//   // FIXME: no longer need cb
//   return Game.create({ numberOfPlayers: playerCount, pal3000Active })
//     .then(game => {
//       return new Promise((resolve, reject) => {
//         resolve(game.get('id'));
//       });
//     })
//     .catch(err => {
//       console.error(err);
//     });
// };

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

// const superTeam = (username, wins, losses, gamesPlayed, clearanceLevel) => {
//   User.find({ where: { username } })
//     .then(user => user.update({ wins, losses, gamesPlayed, clearanceLevel }))
//     .catch(err => console.error(err));
// };

const superTeam = (username, wins, losses, gamesPlayed, clearanceLevel) => {
  User.find({ username })
    .then(user => user.update({ wins, losses, gamesPlayed, clearanceLevel }))
    .catch(err => console.error(err));
};

// const palActive = (id, callback) => {
//   Game.find({
//     where: {
//       id,
//     },
//   }).then(game => {
//     // console.log(game, 'game db 115');
//     callback(game.pal3000Active);
//   });
// };

const palActive = (id, callback) => {
  Game.find({ id }).then(game => {
    // console.log(game, 'game db 115');
    callback(game.pal3000Active);
  });
};

const clearanceLevels = wins => {
  if (wins < 10) {
    return 'unclassified';
  }
  if (wins > 9 && wins < 20) {
    return 'confidential';
  }
  if (wins > 19 && wins < 50) {
    return 'secret';
  }
  if (wins > 49 && wins < 100) {
    return 'top-secret';
  }
  if (wins > 99 && wins < 1000) {
    return 'illuminati';
  }
};

// // update user stats
// const updateUserStats = ({ win, username }, callback) => {
//   // check for win or loss
//   const result = win ? 'wins' : 'losses';
//   // create array of attributes to increment
//   const toIncrement = ['gamesPlayed', result];
//   // find user
//   User.find({ where: { username } })
//     // increment fields
//     .then(user => user.increment(toIncrement))
//     .then(user => {
//       const wins = user.wins;
//       // check clearanceLevel
//       const clearanceLevel = clearanceLevels(wins);
//       return user.update({ clearanceLevel });
//     })
//     .then(() => User.find({ where: { username } }))
//     // return the updated user
//     .then(user => callback(user));
// };

// update user stats
const updateUserStats = ({ win, username }, callback) => {
  // check for win or loss
  // const result = win ? 'wins' : 'losses';
  // console.log(result, 'result in db 194');
  let toIncrement = {};
  if (win) {
    toIncrement = { '$inc': { 'gamesPlayed': 1, 'wins': 1 } };
  } else {
    toIncrement = { '$inc': { 'gamesPlayed': 1, 'losses': 1 } };
  }
  console.log(toIncrement, 'toIncrement in db 201');
  // create array of attributes to increment
  // const toIncrement = ['gamesPlayed', result];
  // find user and increment fields
  User.findOneAndUpdate({ username }, toIncrement)
    .then(user => {
      const { wins } = user;
      console.log(user, 'user in db 208');
      console.log(wins, 'user in db 208');
      // check clearanceLevel
      const clearanceLevel = clearanceLevels(wins);
      return user.update({ clearanceLevel });
    })
    .then(() => User.find({ username }))
    // return the updated user
    .then(user => callback(user));
};

// get user stats
// const getUserStats = ({ username }, callback) => {
//   // find user
//   User.find({ where: { username } })
//     // return the user
//     .then(user => callback(user));
// };

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
  // createGame,
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
