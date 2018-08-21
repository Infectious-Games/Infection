const { combineReducers } = require('redux');

const users = require('./users/reducer_users');
const round = require('./rounds/reducer_rounds');
const game = require('./game/reducer_game');
const cureOrSabotage = require('./cureOrSabotage/reducer_cureOrSabotage');
const currentLeader = require('./leader/reducer_leader');

module.exports = combineReducers({
  users,
  round,
  game,
  cureOrSabotage,
  currentLeader,
});

