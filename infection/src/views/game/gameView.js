import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import Roles from './roles/roles';
import Round from './round/round';
import Mission from './mission/mission';
import MissionResults from './missionResults/missionResults';
import WaitingForTeam from './waiting/waitingForTeam';
import GameOver from './gameOver/gameOver';
import GameStatus from './gameStatus/gameStatus';
import Header from './shared/header';

const GameView = ({
  game,
  choose,
  handleSelectRosterEntryClick,
  handleSubmitRoster,
  setInGameStatus,
  handleRosterVote,
}) => (
  <Grid className="game">
    <br />
    <Row className="game-header">
      <Col md={5} />
      <Col md={2}>
        <Header
          rosterUnapproved={game.rosterUnapproved}
          leaderSubmitRoster={game.leaderSubmitRoster}
        />
        <br />
      </Col>
      <Col md={5} />
    </Row>
    <Row className="game-view">
      <br />
      <Col md={2} />
      <Col md={8} xs={12} className="game-view-col">
        {!game.teamAssembled ? (
          <WaitingForTeam responsive />
        ) : !game.round ? (
          <Roles
            infiltrator={game.infiltrator}
            infiltrators={game.infiltrators}
            responsive
          />
        ) : !game.missionActive ? (
          <Round
            game={game}
            handleSelectRosterEntryClick={handleSelectRosterEntryClick}
            handleSubmitRoster={handleSubmitRoster}
            handleRosterVote={handleRosterVote}
          />
        ) : !game.missionResults[game.round - 1] ? (
          <Mission
            choose={choose}
            choiceMade={game.choiceMade}
            roster={game.missionRoster}
            username={game.username}
          />
        ) : !game.gameOver ? (
          <Row>
            <MissionResults result={game.missionResults[game.round - 1]} />
          </Row>
        ) : (
          <GameOver infiltratorsWin={game.infiltratorsWin} />
        )}
      </Col>
      <Col md={2} />
    </Row>
    <Row>
      <Col md={4} />
      <Col md={4}>
        <GameStatus missionResults={game.missionResults} />
      </Col>
      <Col md={4} />
    </Row>
    <Row className="game-footer">
      <Col md={3} xs={0} />
      <Col md={6} xs={12}>
        {game.gameOver ? (
          <Button bsStyle="primary" onClick={setInGameStatus}>
            LEAVE GAME
          </Button>
        ) : (
          <div />
        )}
        {/* <GameStatus missionResults={game.missionResults} /> */}
      </Col>
      <Col md={3} xs={0} />
    </Row>
    <br />
    <br />
    <br />
  </Grid>
);

export default GameView;
