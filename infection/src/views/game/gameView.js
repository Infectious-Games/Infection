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
import VoteStatus from './voteStatus/voteStatus';

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
        <Header />
      </Col>
      <Col md={5}>
        <VoteStatus rosterApproved={game.rosterApproved} />
      </Col>
    </Row>
    <br />
    <Row className="game-view">
      <Col md={2} />
      <Col md={8} xs={12} className="game-view-col">
        {!game.teamAssembled ? (
          <WaitingForTeam />
        ) : !game.round ? (
          <Roles
            infiltrator={game.infiltrator}
            infiltrators={game.infiltrators}
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
          <MissionResults result={game.missionResults[game.round - 1]} />
        ) : (
          <GameOver infiltratorsWin={game.infiltratorsWin} />
        )}
      </Col>
      <Col md={2} />
    </Row>
    <Row>
      <br />
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
        <GameStatus missionResults={game.missionResults} />
      </Col>
      <Col md={3} xs={0} />
    </Row>
  </Grid>
);

export default GameView;
