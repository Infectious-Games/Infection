const { createStore } = require('redux');
const { expect } = require('expect');
const { VOTE_CURE, VOTE_SABOTAGE, RESET_VOTES } = require('../cureOrSabotage/actions_cureOrSabotage');
const { voteCure, voteSabotage, resetVotes } = require('../cureOrSabotage/actionCreator_cureOrSabotage');
const initialState = require('../cureOrSabotage/initialState_cureOrSabotage');
const reducer = require('../cureOrSabotage/reducer_cureOrSabotage');


describe('cureOrSabotage reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
  it('should handle VOTE_CURE');
  it('should handle VOTE_SABOTAGE');
  it('should handle RESET_VOTES');
});
