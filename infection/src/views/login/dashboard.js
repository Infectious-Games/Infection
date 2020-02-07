/* eslint-disable */
import React from 'react';
import { Grid, Row, Col, Image, Media, Modal, Button } from 'react-bootstrap';

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
      <Modal.Dialog style={{ maxHeight: 'calc(100vh)', overflowY: 'auto' }}>
        <Modal.Header>
          <Modal.Title>
            <Row className="clearance-lvl">
              <Clearance clearance={clearance} />
            </Row>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Media className="user-info">
            <Media.Left align="top">
              <img max0width={90} height={90} src={photo} alt="thumbnail" />
            </Media.Left>
            <Media.Body align="middle">
              <h4>
                <b>{username}</b>
              </h4>
              <h6>
                <b>Games Played: </b>
                {gamesPlayed}
              </h6>
              <h6>
                <b>Wins: </b>
                {wins}
                <b> / Losses: </b>
                {losses}
              </h6>
            </Media.Body>
          </Media>
        </Modal.Body>
        <Modal.Body>
          <Row className="start-game">
            {newGame ? (
              <Row>
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
          <Row />
          <br />
          <Logout />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  </Grid>
);

export default Dashboard;
