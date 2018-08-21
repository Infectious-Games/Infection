const { expect } = require('chai');
const { voteCure, voteSabotage, resetVotes } = require('../backend/redux/cureOrSabotage/actionCreator_cureOrSabotage');
const { initialState } = require('../backend/redux/cureOrSabotage/initialState_cureOrSabotage');

const reducer = require('../backend/redux/cureOrSabotage/reducer_cureOrSabotage');


describe('cureOrSabotage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal({
      voteStatus: 0,
      deployedVoteCount: 0
    });
  });
  it('should handle VOTE_CURE', () => {
    expect(reducer({ voteStatus: 0, deployedVoteCount: 0 }, voteCure())).to.deep.equal({
      voteStatus: 0,
      deployedVoteCount: 1
    });
  });
  it('should handle VOTE_SABOTAGE', () => {
    expect(reducer({ voteStatus: 0, deployedVoteCount: 1 }, voteSabotage())).to.deep.equal({
      voteStatus: 1,
      deployedVoteCount: 2
    });
  });
  it('should handle VOTE_CURE after VOTE_SABOTAGE and not alter voteStatus', () => {
    expect(reducer({ voteStatus: 1, deployedVoteCount: 2 }, voteCure())).to.deep.equal({
      voteStatus: 1,
      deployedVoteCount: 3
    });
  });
  it('should handle RESET_VOTES', () => {
    expect(reducer({ voteStatus: 1, deployedVoteCount: 3 }, resetVotes())).to.deep.equal({
      voteStatus: 0,
      deployedVoteCount: 0
    });
  });
});
