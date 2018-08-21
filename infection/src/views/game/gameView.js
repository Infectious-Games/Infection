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

const GameView = ({ 
  game, 
  choose, 
  handleSelectRosterEntryClick, handleSubmitRoster, 
}) => 
  <Grid className="game">
    <br></br>
    <Header></Header>
    <br></br>
    <Row>
      <Col med={2}></Col>
      <Col med={8}>
        {
          !game.teamAssembled
            ? <WaitingForTeam></WaitingForTeam>
            : !game.round
              ? <Roles infiltrator={game.infiltrator}></Roles>
              : !game.missionActive
                ? <Round
                  game={game}
                  handleSelectRosterEntryClick={handleSelectRosterEntryClick}
                  handleSubmitRoster={handleSubmitRoster}
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
                    : <GameOver scientistsWin={game.scientistsWin}></GameOver>
        }
      </Col>
      <Col med={2}></Col>
    </Row>
    <Row>
      <br></br>
      <br></br>
    </Row>
    <GameStatus missionResults={game.missionResults}></GameStatus>
  </Grid>
  

export default GameView;