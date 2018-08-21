const { expect } = require('expect');
const { SCIENTIST_ROUND_WIN, INFILTRATOR_ROUND_WIN } = require('../rounds/actions_rounds');
const reducer = require('../game/reducer_game');
const { initialState } = require('../game/initialState_game');

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).toEqual({
      round: 0,
      scientistWins: 0,
      infiltratorWins: 0
    });
  });
  it('should handle SCIENTIST_ROUND_WIN', () => {
    expect(reducer(initialState, SCIENTIST_ROUND_WIN)).toEqual({
      round: 1,
      scientistWins: 1,
      infiltratorWins: 0
    });
  });
  it('should handle INFILTRATOR_ROUND_WIN', () => {
    expect(reducer(initialState, INFILTRATOR_ROUND_WIN)).toEqual({
      round: 1,
      scientistWins: 0,
      infiltratorWins: 1
    });
  });
  it('should increment Infiltrator team wins that already have a win using INFILTRATOR_ROUND_WIN', () => {
    expect(reducer({round: 1, scientistWins: 0, infiltratorWins: 1}, INFILTRATOR_ROUND_WIN)).toEqual({
      round: 2,
      scientistWins: 0,
      infiltratorWins: 2
    });
  });
  it('should increment Scientist team wins that already have a win using INFILTRATOR_ROUND_WIN', () => {
    expect(reducer({round: 1, scientistWins: 1, infiltratorWins: 0}, SCIENTIST_ROUND_WIN)).toEqual({
      round: 2,
      scientistWins: 2,
      infiltratorWins: 0
    });
  });
  it('should handle RESTART_GAME', () => {
    expect(reducer({round: 2}, RESTART_GAME)).toEqual({
      round: 0,
      scientistWins: 0,
      infiltratorWins: 0
    });
  });
});