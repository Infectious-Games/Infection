const { VOTE_SABOTAGE, VOTE_CURE } = require('./actions_cureOrSabotage');
const initialState = require('./initialState_cureOrSabotage');

const submitVote = (state = initialState, action) => {
  switch (action.type) {
    case VOTE_CURE:
      return Object.assign({}, state, {
        voteStatus: state.voteStatus,
        deployedVoteCount: state.deployedVoteCount + 1
      });
    case VOTE_SABOTAGE: 
    return Object.assign({}, state, {
      voteStatus: 1,
      deployedVoteCount: state.deployedVoteCount + 1
    });
    default: 
      return state;
  }
};

module.exports = submitVote;