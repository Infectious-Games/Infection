const { SCIENTIST_ROUND_WIN, INFILTRATOR_ROUND_WIN, RESTART_GAME, INCREMENT_FAIL, RESET_FAIL } = require('./actions_game');
const initialState = require('./initialState_game');

const game = (state = initialState, action) => {
  switch (action.type) {
  case SCIENTIST_ROUND_WIN:
    return Object.assign({}, state, {
      round: state.round + 1,
      scientistWins: state.scientistWins + 1,
      infiltratorWins: state.infiltratorWins,
      failCount: state.failCount
    });

  case INFILTRATOR_ROUND_WIN:
    return Object.assign({}, state, {
      round: state.round + 1,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins + 1,
      failCount: state.failCount
    });

  case RESTART_GAME:
    return Object.assign({}, state, {
      round: 0,
      scientistWins: 0,
      infiltratorWins: 0,
      failCount: 0
    });

  case INCREMENT_FAIL:
    return Object.assign({}, state, {
      round: state.round,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins,
      failCount: state.failCount + 1
    });
  
  case RESET_FAIL:
    return Object.assign({}, state, {
      round: state.round,
      scientistWins: state.scientistWins,
      infiltratorWins: state.infiltratorWins,
      failCount: 0
    });  
  
  default:
    return state;
  }
};

module.exports = game;