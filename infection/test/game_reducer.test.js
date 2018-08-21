const { expect } = require('chai');
const { scientistRoundWin, infiltratorRoundWin, restartGame } = require('../backend/redux/game/actionCreator_game');
const reducer = require('../backend/redux/game/reducer_game');
const { initialState } = require('../backend/redux/game/initialState_game');

describe('game reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(initialState, {})).to.deep.equal({
      round: 0,
      scientistWins: 0,
      infiltratorWins: 0
    });
  });
  it('should handle SCIENTIST_ROUND_WIN', () => {
    expect(reducer(initialState, scientistRoundWin())).to.deep.equal({
      round: 1,
      scientistWins: 1,
      infiltratorWins: 0
    });
  });
  it('should handle INFILTRATOR_ROUND_WIN', () => {
    expect(reducer(initialState, infiltratorRoundWin())).to.deep.equal({
      round: 1,
      scientistWins: 0,
      infiltratorWins: 1
    });
  });
  it('should increment Infiltrator team wins that already have a win using INFILTRATOR_ROUND_WIN', () => {
    expect(reducer({round: 1, scientistWins: 0, infiltratorWins: 1}, infiltratorRoundWin())).to.deep.equal({
      round: 2,
      scientistWins: 0,
      infiltratorWins: 2
    });
  });
  it('should increment Scientist team wins that already have a win using SCIENTIST_ROUND_WIN', () => {
    expect(reducer({round: 1, scientistWins: 1, infiltratorWins: 0}, scientistRoundWin())).to.deep.equal({
      round: 2,
      scientistWins: 2,
      infiltratorWins: 0
    });
  });
  it('should handle RESTART_GAME', () => {
    expect(reducer({round: 2, scientistWins: 2, infiltratorWins: 3}, restartGame())).to.deep.equal({
      round: 0,
      scientistWins: 0,
      infiltratorWins: 0
    });
  });
});