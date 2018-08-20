const { createStore } = require('redux');
const { expect } = require('expect');
const { voteCure, voteSabotage, resetVotes } = require('../cureOrSabotage/actionCreator_cureOrSabotage');
const initialState = require('../cureOrSabotage/initialState_cureOrSabotage');
const reducer = require('../cureOrSabotage/reducer_cureOrSabotage');


describe('cureOrSabotage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle VOTE_CURE', () => {
    expect(reducer(voteCure())).toEqual({
      voteStatus: 0,
      deployedVoteCount: 1
    });
  });
  it('should handle VOTE_SABOTAGE', () => {
    expect(reducer(voteSabotage())).toEqual({
      voteStatus: 1,
      deployedVoteCount: 2
    });
  });
  it('should handle VOTE_CURE after VOTE_SABOTAGE and not alter voteStatus', () => {
    expect(reducer(voteCure())).toEqual({
      voteStatus: 1,
      deployedVoteCount: 3
    });
  });
  it('should handle RESET_VOTES', () => {
    expect(reducer(resetVotes())).toEqual({
      voteStatus: 0,
      deployedVoteCount: 0
    });
  });
});
