const {
  SCIENTIST_ROUND_WIN,
  INFILTRATOR_ROUND_WIN,
  RESTART_GAME,
  INCREMENT_FAIL,
  RESET_FAIL,
  INCREMENT_ROUND,
} = require('./actions_game');

const scientistRoundWin = (
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount
) => ({
  type: SCIENTIST_ROUND_WIN,
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const infiltratorRoundWin = (
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount
) => ({
  type: INFILTRATOR_ROUND_WIN,
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const restartGame = (
  gameID, 
  round, 
  scientistWins, 
  infiltratorWins, 
  failCount
) => ({
  type: RESTART_GAME,
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const incrementFail = (
  gameID,
  round, 
  scientistWins, 
  infiltratorWins, 
  failCount
) => ({
  type: INCREMENT_FAIL,
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const resetFail = (
  gameID,
  round, 
  scientistWins, 
  infiltratorWins, 
  failCount
) => ({
  type: RESET_FAIL,
  gameID,
  round,
  scientistWins,
  infiltratorWins,
  failCount,
});

const incrementRound = (
  gameID,
  round, 
  scientistWins, 
  infiltratorWins, 
  failCount
) => ({
  type: INCREMENT_ROUND,
  gameID,
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
