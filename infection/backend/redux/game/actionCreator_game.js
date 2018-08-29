const {
  SCIENTIST_ROUND_WIN,
  INFILTRATOR_ROUND_WIN,
  RESTART_GAME,
  INCREMENT_FAIL,
  RESET_FAIL,
  INCREMENT_ROUND,
} = require('./actions_game');

const scientistRoundWin = (
  round,
  scientistWins,
  infiltratorWins,
  failCount
) => ({
  type: SCIENTIST_ROUND_WIN,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const infiltratorRoundWin = (
  round,
  scientistWins,
  infiltratorWins,
  failCount
) => ({
  type: INFILTRATOR_ROUND_WIN,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const restartGame = (round, scientistWins, infiltratorWins, failCount) => ({
  type: RESTART_GAME,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const incrementFail = (round, scientistWins, infiltratorWins, failCount) => ({
  type: INCREMENT_FAIL,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const resetFail = (round, scientistWins, infiltratorWins, failCount) => ({
  type: RESET_FAIL,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const incrementRound = (round, scientistWins, infiltratorWins, failCount) => ({
  type: INCREMENT_ROUND,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

module.exports = {
  scientistRoundWin,
  infiltratorRoundWin,
  restartGame,
  incrementFail,
  resetFail,
  incrementRound,
};
