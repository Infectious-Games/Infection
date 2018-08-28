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
}) => 
  <Grid className="game">
    <br></br>
    <Row className='game-header'>
      <Col md={5}></Col>
      <Col md={2}>
        <Header></Header>
      </Col>
      <Col md={5}>
        <VoteStatus rosterApproved={game.rosterApproved}></VoteStatus>
      </Col>
    </Row>
    <br></br>
    <Row className='game-view'>
      <Col md={2}></Col>
      <Col md={8} xs={12} className='game-view-col'>
        {
          !game.teamAssembled
            ? <WaitingForTeam></WaitingForTeam>
            : !game.round
              ? <Roles 
                  infiltrator={game.infiltrator}
                  infiltrators={game.infiltrators}
                ></Roles>
              : !game.missionActive
                ? <Round
                    game={game}
                    handleSelectRosterEntryClick={handleSelectRosterEntryClick}
                    handleSubmitRoster={handleSubmitRoster}
                    handleRosterVote={handleRosterVote}
                ></Round>
                : !game.missionResults[game.round - 1]
                  ? <Mission
                      choose={choose}
                      choiceMade={game.choiceMade}
                      roster={game.missionRoster}
                      username={game.username}
                  ></Mission>
                  : !game.gameOver
                    ? <MissionResults
                        result={game.missionResults[game.round - 1]}
                    ></MissionResults>
                    : <GameOver
                        infiltratorsWin={game.infiltratorsWin}
                      ></GameOver>
        }
      </Col>
      <Col md={2}></Col>
    </Row>
    <Row>
      <br></br>
    </Row>
    <Row className='game-footer'>
      <Col md={3} xs={0}></Col>
      <Col md={6} xs={12}>
        {
          game.gameOver
            ? <Button
              bsStyle="primary"
              onClick={setInGameStatus}
            >
              LEAVE GAME
              </Button>
            : <div></div>
        }
        <GameStatus missionResults={game.missionResults}></GameStatus>
      </Col>
      <Col md={3} xs={0}>
      </Col>
    </Row>
  </Grid>
  

export default GameView;