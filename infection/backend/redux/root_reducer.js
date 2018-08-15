const { combineReducers } = require('redux');

const users = require('./users/reducer_users');
const rounds = require('./rounds/reducer_rounds');
const teamVotes = require('./teamVotes/reducer_teamVotes');
const leader = require('./leader/reducer_leader');
const winner = require('./winner/reducer_winner');

module.exports = combineReducers({
  users,
  rounds,
  teamVotes,
  leader,
  winner
});

module.exports = { rootReducer };