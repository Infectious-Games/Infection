// const Sequelize = require('sequelize');
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

// const db = new Sequelize(
//   `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${
//     process.env.DATABASE_URI
//   }:3306/${process.env.DATABASE_NAME}`,
//   {}
// );

// db.authenticate()
//   .then(() => {
//     console.log('Connection to db has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// const User = db.define('User', {
//   username: Sequelize.STRING,
//   gamesPlayed: Sequelize.INTEGER,
//   wins: Sequelize.INTEGER,
//   losses: Sequelize.INTEGER,
//   clearanceLevel: Sequelize.STRING,
//   photo: Sequelize.STRING,
//   email: Sequelize.STRING,
// });

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

// // game schema
// const Game = db.define('game', {
//   numberOfPlayers: Sequelize.INTEGER,
//   pal3000Active: Sequelize.BOOLEAN,
//   winner: Sequelize.STRING,
//   results: {
//     type: Sequelize.STRING,
//     allowNull: true,
//     get() {
//       return this.getDataValue('results').split(';');
//     },
//     set(val) {
//       this.setDataValue('results', val.join(';'));
//     },
//   },
// });

const gameSchema = mongoose.Schema({
  numberOfPlayers: Number,
  pal3000Active: Boolean,
  winner: String,
  // results: {
  //   type: String,
  //   allowNull: true,
  //   get() {
  //     return this.getDataValue('results').split(';');
  //   },
  //   set(val) {
  //     this.setDataValue('results', val.join(';'));
  //   },
  // },
});

const Game = mongoose.model('Game', gameSchema);

// Game.sync({ force: false })
//   .then(game => {
//     // console.log('game model created in db');
//   })
//   .catch(err => {
//     console.error(err);
//   });

// const findOrCreateUser = (profile, callback) => {
//   const username = profile.displayName;
//   const photo = profile.photos[0].value.slice(
//     0,
//     profile.photos[0].value.indexOf('?')
//   );
//   User.findOrCreate({
//     where: { username },
//     defaults: {
//       gamesPlayed: 0,
//       wins: 0,
//       losses: 0,
//       clearanceLevel: 'unclassified',
//       photo,
//       email: '',
//     },
//   }).spread((user, created) => {
//     console.log(
//       user.get({
//         plain: true,
//       })
//     );
//     callback(user);
//   });
// };

const findUser = (profile, callback) => {
  console.log(profile, 'profile in db 131');
  console.log(profile.username, 'profile.username in db 132');
  const { username } = profile;
  const { password } = profile;
  console.log(username, 'username in db 135');
  console.log(password, 'password in db 136');
  User.find(
    // { profile },
    {
      username,
      password,
    },
    // {
    //   username: 'Paul',
    //   password: '1234',
    // },
    // callback
    (err, user) => {
      console.log(user, 'user in db 149');
      if (err) {
        console.log(err);
      } else {
        callback(user);
      }
    }
  );
};

const createUser = (profile, callback) => {
  console.log(profile, 'profile in db 160');
  console.log(profile.username, 'profile.username in db 161');
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
// User.findOrCreate({
//   where: { username: 'PAL3000' },
//   defaults: {
//     gamesPlayed: 0,
//     wins: 0,
//     losses: 0,
//     clearanceLevel: 'unclassified',
//     photo: '',
//   },
// }).spread((user, created) => {
//   console.log(
//     user.get({
//       plain: true,
//     })
//   );
//   console.log('PAL3000 added to the db:', created, ', false = already in db');
// });

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

const createGameAndGetJoinCode = ({ playerCount, pal3000Active }) => {
  // grab user id to pass into game
  const newGame = new Game({ numberOfPlayers: playerCount, pal3000Active });
  return newGame.save((err, game) => {
    if (err) {
      console.log(err);
    } else {
      return new Promise((resolve, reject) => {
        resolve(game.id);
      });
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
  const result = win ? 'wins' : 'losses';
  // create array of attributes to increment
  const toIncrement = ['gamesPlayed', result];
  // find user
  User.find({ username })
    // increment fields
    .then(user => user.increment(toIncrement))
    .then(user => {
      const wins = user.wins;
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
