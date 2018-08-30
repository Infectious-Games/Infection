const {
  VOTE_YES,
  VOTE_NO,
  RESET_MISSION_VOTES,
} = require('./actions_teamVotes');
const initialState = require('./initialState_teamVotes');

const proposalVote = (state = initialState, action) => {
  // Handle dispatched actions
  const newState = Object.assign({}, state);
  switch (action.type) {
    /*
  * If a team-proposal vote is 'yes':
  *   - return current state of voteFail
  *   - increment current state of voteSuccess by 1
  *   - increment current state of totalMissionVotes by 1
    */
    case VOTE_YES:
      newState[action.gameID]['voteFail'] = state.voteFail;
      newState[action.gameID]['voteSuccess'] = state.voteSuccess + 1;
      newState[action.gameID]['totalMissionVotes'] = state.totalMissionVotes + 1;
      return newState;
    /*
  * If a team-proposal vote is 'no':
  *   - return current state of voteSuccess
  *   - increment current state of voteFail by 1
  *   - increment current state of totalMissionVotes by 1
    */
    case VOTE_NO:
      newState[action.gameID]['voteFail'] = state.voteFail + 1;
      newState[action.gameID]['voteSuccess'] = state.voteSuccess;
      newState[action.gameID]['totalMissionVotes'] = state.totalMissionVotes + 1;
      return newState;
    // Reset to initial values
    case RESET_MISSION_VOTES:
      newState[action.gameID]['voteFail'] = 0;
      newState[action.gameID]voteSuccess = 0;
      newState[action.gameID]totalMissionVotes = 0;
      return newState;
    // Return current state
    default:
      return newState;
  }
};

module.exports = proposalVote;
