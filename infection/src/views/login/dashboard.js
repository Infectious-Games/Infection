/* eslint-disable */
import React from 'react';
import {
  Grid,
  Row,
  Col,
  Image,
  Media,
  Well,
  Modal,
  Button,
} from 'react-bootstrap';

import Clearance from './clearance';
import JoinGame from './joinGame';
import StartGame from './startGame';
import Logout from './logout';
import id from '../../images/id_bg-40pct-prod.png';
import logo from '../../images/Logo-vector.png';

const Dashboard = ({
  activatePal,
  clearance,
  game,
  gamesPlayed,
  handleChange,
  handleSubmit,
  losses,
  newGame,
  photo,
  setNumOfPlayers,
  username,
  wins,
}) => (
  <Grid className="dashboard">
    <div className="static-modal">
      <Modal.Dialog>
        <Modal.Header>
          <Modal.Title>
            <Row className="clearance-lvl">
              <Clearance clearance={clearance} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Media className="user-info">
            <Media.Left align="left">
              <img max0width={130} height={130} src={photo} alt="thumbnail" />
            </Media.Left>
            <Media.Body align="center">
              <h2>
                <b>{username}</b>
              </h2>
              <h4>
                <b>Games Played: </b>
                {gamesPlayed}
              </h4>
              <h4>
                <b>Wins: </b>
                {wins}
                <b> / Losses: </b>
                {losses}
              </h4>
            </Media.Body>
          </Media>
        </Modal.Body>
        <Modal.Body>
          <Row className="start-game">
            {newGame ? (
              <Row>
                <br />
                <h4 className="game-code">Game Code: {newGame}</h4>
              </Row>
            ) : (
              <Col md={6}>
                <StartGame
                  activatePal={activatePal}
                  setNumOfPlayers={setNumOfPlayers}
                />
              </Col>
            )}

            <Col md={6}>
              <JoinGame
                game={game}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
              />
            </Col>
          </Row>
          <Row>
            <Modal.Header />
          </Row>
          <br />
          <Logout />
        </Modal.Body>
      </Modal.Dialog>
    </div>
    ;
  </Grid>
);

export default Dashboard;
