const { VOTE_YES, VOTE_NO, RESET_MISSION_VOTES } = require('./actions_teamVotes');

const voteYes = (voteStatus, totalMissionVotes) => ({
  type: VOTE_YES,
  voteStatus,
  totalMissionVotes
});

const voteNo = (voteStatus, totalMissionVotes) => ({
  type: VOTE_NO,
  voteStatus,
  totalMissionVotes
});

const resetMissionVotes = (voteStatus, totalMissionVotes) => ({
  type: RESET_MISSION_VOTES,
  voteStatus,
  totalMissionVotes
});

module.exports = {
  voteYes,
  voteNo, 
  resetMissionVotes
};