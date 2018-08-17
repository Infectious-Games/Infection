const { combineReducers } = require('redux');

const users = require('./users/reducer_users');
const rounds = require('./rounds/reducer_rounds');
const game = require('./game/reducer_game');
const cureOrSabotage = require('./cureOrSabotage/reducer_cureOrSabotage');
const leader = require('./leader/reducer_leader');
const winner = require('./winner/reducer_winner');
const test = require('./test/reducer_test');

module.exports = combineReducers({
  // users,
  // rounds,
  // game,
  // cureOrSabotage,
  // leader,
  // winner,
  test
});

module.exports = { rootReducer };