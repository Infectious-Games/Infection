import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

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
    <Row>
      <Col md={5}></Col>
      <Col md={2}>
        <Header></Header>
      </Col>
      <Col md={5}>
        <VoteStatus rosterApproved={game.rosterApproved}></VoteStatus>
      </Col>
    </Row>
    <br></br>
    <Row>
      <Col md={2}></Col>
      <Col md={8}>
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
                        setInGameStatus={setInGameStatus}
                        infiltratorsWin={game.infiltratorsWin}
                      ></GameOver>
        }
      </Col>
      <Col md={2}></Col>
    </Row>
    <Row>
      <br></br>
      
      <br></br>
    </Row>
    <GameStatus missionResults={game.missionResults}></GameStatus>
  </Grid>
  

export default GameView;