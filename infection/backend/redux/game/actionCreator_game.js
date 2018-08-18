const { SCIENTIST_ROUND_WIN, INFILTRATOR_ROUND_WIN, RESTART_GAME } = require('./actions_game');

const scientistRoundWin = (round, scientistWins, infiltratorWins) => ({
  type: SCIENTIST_ROUND_WIN,
  round,
  scientistWins,
  infiltratorWins
});

const infiltratorRoundWin = (round, scientistWins, infiltratorWins) => ({
  type: INFILTRATOR_ROUND_WIN,
  round,
  scientistWins,
  infiltratorWins
});

const restartGame = (round, scientistWins, infiltratorWins) => ({
  type: RESTART_GAME,
  round,
  scientistWins,
  infiltratorWins
});


module.exports = {
  scientistRoundWin,
  infiltratorRoundWin,
  restartGame
}