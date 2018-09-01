const {
  SCIENTIST_ROUND_WIN,
  INFILTRATOR_ROUND_WIN,
  RESTART_GAME,
  INCREMENT_FAIL,
  RESET_FAIL,
  INCREMENT_ROUND,
} = require('./actions_game');
const initialState = require('./initialState_game');

const game = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    /*
  * If scientists win a round:
  *   - increment the round
  *   - increment scientistWin count
  *   - return previous state of infiltratorWin count
  *   - return previous state of failCount
    */
    case SCIENTIST_ROUND_WIN:
      newState[action.gameID].round = state[action.gameID].round + 1;
      newState[action.gameID].scientistWins =
        state[action.gameID].scientistWins + 1;
      newState[action.gameID].infiltratorWins =
        state[action.gameID].infiltratorWins;
      newState[action.gameID].failCount = state[action.gameID].failCount;
      return newState;
    /*
  * If infiltrators win a round:
  *   - increment the round
  *   - increment infiltratorWin count
  *   - return previous state of scientistWin count
  *   - return previous state of failCount
    */
    case INFILTRATOR_ROUND_WIN:
      newState[action.gameID].round = state[action.gameID].round + 1;
      newState[action.gameID].scientistWins =
        state[action.gameID].scientistWins;
      newState[action.gameID].infiltratorWins =
        state[action.gameID].infiltratorWins + 1;
      newState[action.gameID].failCount = state[action.gameID].failCount;
      return newState;
    // If game is over, reset all to initial state
    case RESTART_GAME:
      newState[action.gameID].round = 0;
      newState[action.gameID].scientistWins = 0;
      newState[action.gameID].infiltratorWins = 0;
      newState[action.gameID].failCount = 0;
      return newState;
    /*
  * If proposal fails:
  *   - return previous state of round
  *   - return previous state of infiltratorWin count
  *   - return previous state of scientistWin count
  *   - increment failCount
    */
    case INCREMENT_FAIL:
      newState[action.gameID].round = state[action.gameID].round;
      newState[action.gameID].scientistWins =
        state[action.gameID].scientistWins;
      newState[action.gameID].infiltratorWins =
        state[action.gameID].infiltratorWins;
      newState[action.gameID].failCount = state[action.gameID].failCount + 1;
      return newState;
    /*
  * When moving beyond the proposal stage:
  *   - return previous state of round
  *   - return previous state of infiltratorWin count
  *   - return previous state of scientistWin count
  *   - reset failCount to initial value
    */
    case RESET_FAIL:
      newState[action.gameID].round = state[action.gameID].round;
      newState[action.gameID].scientistWins =
        state[action.gameID].scientistWins;
      newState[action.gameID].infiltratorWins =
        state[action.gameID].infiltratorWins;
      newState[action.gameID].failCount = 0;
      return newState;
    /*
  * When INCREMENT_ROUND is dispatched:
  *   - increment round by 1
  *   - return previous state of infiltratorWin count
  *   - return previous state of scientistWin count
  *   - return previous state of failCount
    */
    case INCREMENT_ROUND:
      newState[action.gameID].round = state[action.gameID].round + 1;
      newState[action.gameID].scientistWins =
        state[action.gameID].scientistWins;
      newState[action.gameID].infiltratorWins =
        state[action.gameID].infiltratorWins;
      newState[action.gameID].failCount = 0;
      return newState;
    // Return current state
    default:
      return newState;
  }
};

module.exports = game;
