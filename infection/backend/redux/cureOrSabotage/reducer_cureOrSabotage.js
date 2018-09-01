const {
  VOTE_SABOTAGE,
  VOTE_CURE,
  RESET_VOTES,
} = require('./actions_cureOrSabotage');
const initialState = require('./initialState_cureOrSabotage');

const submitVote = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    /*
  * If a mission vote is 'cure':
  *   - return current state of voteStatus for that game instance --> [action.gameID]
  *   - increment current state of deployedVoteCount by 1
  */
    case VOTE_CURE:
      newState[action.gameID].voteStatus = state[action.gameID].voteStatus;
      newState[action.gameID].deployedVoteCount =
        state[action.gameID].deployedVoteCount + 1;
      return newState;
    /*
  * If a mission vote is 'sabotage':
  *   - change voteStatus to 1
  *   - increment current state of deployedVoteCount by 1
  */
    case VOTE_SABOTAGE:
      newState[action.gameID].voteStatus = 1;
      newState[action.gameID].deployedVoteCount =
        state[action.gameID].deployedVoteCount + 1;
      return newState;
    // Reset to initial values
    case RESET_VOTES:
      newState[action.gameID].voteStatus = 0;
      newState[action.gameID].deployedVoteCount = 0;
      return newState;
    // Return current state
    default:
      return newState;
  }
};

module.exports = submitVote;
