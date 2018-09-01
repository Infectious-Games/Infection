const { INCREMENT_ROUND, RESTART_ROUNDS } = require('./actions_rounds');

const incrementRound = (gameID, round) => ({
  type: INCREMENT_ROUND,
  gameID,
  round,
});
const restartRounds = (gameID, round) => ({
  type: RESTART_ROUNDS,
  gameID,
  round,
});

module.exports = {
  incrementRound,
  restartRounds,
};
