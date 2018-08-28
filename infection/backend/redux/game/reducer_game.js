const { SCIENTIST_ROUND_WIN, INFILTRATOR_ROUND_WIN, RESTART_GAME, INCREMENT_FAIL, RESET_FAIL, INCREMENT_ROUND } = require('./actions_game');
const initialState = require('./initialState_game');

const game = (state = initialState, action) => {
  switch (action.type) {
  /*
  * If scientists win a round:
  *   - increment the round
  *   - increment scientistWin count
  *   - return previous state of infiltratorWin count
  *   - return previous state of failCount
  */   
  case SCIENTIST_ROUND_WIN:
    return Object.assign({}, state, {
      round: state.round + 1,
      scientistWins: state.scientistWins + 1,
      infiltratorWins: state.infiltratorWins,
      failCount: state.failCount
    });
  /*
  * If infiltrators win a round:
  *   - increment the round
  *   - increment infiltratorWin count
  *   - return previous state of scientistWin count
  *   - return previous state of failCount
  */    
  case INFILTRATOR_ROUND_WIN:
    return Object.assign({}, state, {
      round: state.round + 1,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins + 1,
      failCount: state.failCount
    });
  // If game is over, reset all to initial state
  case RESTART_GAME:
    return Object.assign({}, state, {
      round: 0,
      scientistWins: 0,
      infiltratorWins: 0,
      failCount: 0
    });
  /*
  * If proposal fails:
  *   - return previous state of round
  *   - return previous state of infiltratorWin count
  *   - return previous state of scientistWin count
  *   - increment failCount
  */
  case INCREMENT_FAIL:
    return Object.assign({}, state, {
      round: state.round,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins,
      failCount: state.failCount + 1
    });
  /*
  * When moving beyond the proposal stage:
  *   - return previous state of round
  *   - return previous state of infiltratorWin count
  *   - return previous state of scientistWin count
  *   - reset failCount to initial value
  */
  case RESET_FAIL:
    return Object.assign({}, state, {
      round: state.round,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins,
      failCount: 0
    });
  /*
  * When INCREMENT_ROUND is dispatched:
  *   - increment round by 1
  *   - return previous state of infiltratorWin count
  *   - return previous state of scientistWin count
  *   - return previous state of failCount
  */  
  case INCREMENT_ROUND:
    return Object.assign({}, state, {
      round: state.round + 1,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins,
      failCount: 0
    });
    
  // Return current state
  default:
    return state;
  }
};

module.exports = game;