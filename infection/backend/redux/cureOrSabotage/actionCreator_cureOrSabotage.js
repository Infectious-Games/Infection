const { VOTE_CURE, VOTE_SABOTAGE, RESET_VOTES } = require('./actions_cureOrSabotage');

const voteCure = (voteStatus, deployedVoteCount) => ({
  type: VOTE_CURE,
  voteStatus,
  deployedVoteCount
});

const voteSabotage = (voteStatus, deployedVoteCount) => ({
  type: VOTE_SABOTAGE,
  voteStatus,
  deployedVoteCount
});

const resetVotes = (voteStatus, deployedVoteCount) => ({
  type: RESET_VOTES,
  voteStatus,
  deployedVoteCount
})

module.exports = {
  voteCure,
  voteSabotage, 
  resetVotes
};