const {
  VOTE_CURE,
  VOTE_SABOTAGE,
  RESET_VOTES,
} = require('./actions_cureOrSabotage');

const voteCure = (gameID, voteStatus, deployedVoteCount) => ({
  type: VOTE_CURE,
  gameID,
  voteStatus,
  deployedVoteCount,
});

const voteSabotage = (gameID, voteStatus, deployedVoteCount) => ({
  type: VOTE_SABOTAGE,
  voteStatus,
  gameID,
  deployedVoteCount,
});

const resetVotes = (gameID, voteStatus, deployedVoteCount) => ({
  type: RESET_VOTES,
  gameID,
  voteStatus,
  deployedVoteCount,
});

module.exports = {
  voteCure,
  voteSabotage,
  resetVotes,
};
