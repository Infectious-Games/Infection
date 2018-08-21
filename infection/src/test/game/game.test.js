import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import Game from '../../components/game';
import WaitingForTeam from '../../views/game/waiting/waitingForTeam';




test('should render Game', () => {
  const game = renderer
    .create(<Game/>)
    .toJSON();
  expect(game).toMatchSnapshot();
});

test('should render WaitingForTeam if all players are not present', () => {
  const wait = renderer
    .create(<WaitingForTeam></WaitingForTeam>)
    .toJSON();
  expect(wait).toMatchSnapshot();
});

describe('should match the current state of the game', () => {
  const game = renderer.create(<Game/>);
  const gameStart = game.getInstance();
  
  test('should render Scientist if team is assembled, round one has not started, and user is not an infiltrator', () => {

    gameStart.setState({ teamAssembled: true });

    expect(game).toMatchSnapshot();
  });

  test('should render Infiltrator if team is assembled, round one has not started, and user is an infiltrator', () => {

    gameStart.setState({ 
      teamAssembled: true,
      infiltrator: true 
    });

    expect(game).toMatchSnapshot();
  });

  test('should render Infiltrator if team is assembled, round one has not started, and user is an infiltrator', () => {

    gameStart.setState({
      teamAssembled: true,
      infiltrator: true
    });

    expect(game).toMatchSnapshot();
  });

  test('should render a waiting view if user not leader and a round has started', () => {

    gameStart.setState({
      teamAssembled: true,
      round: 1,
      leader: 'test'
    });

    expect(game).toMatchSnapshot();
  });

  test('should render a list of players if user is leader and a round has started', () => {

    gameStart.setState({
      username: 'test',
      teamAssembled: true,
      round: 1,
      leader: 'test',
      team: ['test', 'test1', 'test2', 'test3'],
    });

    expect(game).toMatchSnapshot();
  });

  test('should render a waiting view if not selected for mission', () => {

    gameStart.setState({
      teamAssembled: true,
      round: 1,
      missionActive: true,
    });

    expect(game).toMatchSnapshot();
  });

  test('should render the mission view if selected for mission', () => {

    gameStart.setState({
      username: 'test',
      teamAssembled: true,
      round: 1,
      missionActive: true,
      missionRoster: ['test'],

    });

    expect(game).toMatchSnapshot();
  });

  test('should render the mission success view if mission is successful', () => {

    gameStart.setState({
      teamAssembled: true,
      round: 1,
      missionActive: true,
      missionResults: ['success', undefined, undefined],
    });

    expect(game).toMatchSnapshot();
  });

  test('should render the mission fail view if mission is a failure', () => {

    gameStart.setState({
      teamAssembled: true,
      round: 2,
      missionActive: true,
      missionResults: ['success', 'fail', undefined],
    });

    expect(game).toMatchSnapshot();
  });

  test('should render Scientist\'s win view if the Scientist\'s win the game', () => {

    gameStart.setState({
      teamAssembled: true,
      round: 3,
      missionActive: true,
      missionResults: ['success', 'fail', 'success'],
      gameOver: true,

    });

    expect(game).toMatchSnapshot();
  });

  test('should render Infiltrator\'s win view if the Infiltrator\'s win the game', () => {

    gameStart.setState({
      teamAssembled: true,
      round: 3,
      missionActive: true,
      missionResults: ['success', 'fail', 'success'],
      gameOver: true,
      scientistsWin: false,

    });

    expect(game).toMatchSnapshot();
  });



});
