const { INCREMENT_ROUND, RESTART_ROUNDS } = require('./actions_rounds');
const initialState = require('./initialState_rounds');

const rounds = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case INCREMENT_ROUND:
      newState[action.gameID].round = state.round + 1;
      return newState;
    case RESTART_ROUNDS:
      newState[action.gameID].round = 0;
      return newState;
    default:
      return state;
  }
};

module.exports = rounds;
