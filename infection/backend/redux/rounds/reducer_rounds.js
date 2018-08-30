const { INCREMENT_ROUND, RESTART_ROUNDS } = require('./actions_rounds');
const initialState = require('./initialState_rounds');

const rounds = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_ROUND:
      return Object.assign({}, state, {
        round: state.round + 1,
      });
    case RESTART_ROUNDS:
      return Object.assign({}, state, {
        round: 0,
      });
    default:
      return state;
  }
};

module.exports = rounds;
