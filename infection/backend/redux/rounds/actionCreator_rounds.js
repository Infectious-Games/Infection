const { INCREMENT_ROUND, RESTART_ROUNDS } = require('./actions_rounds');

const incrementRound = round => ({
  type: INCREMENT_ROUND,
  round,
});
const restartRounds = round => ({
  type: RESTART_ROUNDS,
  round,
});

module.exports = {
  incrementRound,
  restartRounds,
};
