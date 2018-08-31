/* eslint-disable */
import React from 'react';
import { Grid, Row, Col, Image, Media } from 'react-bootstrap';

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
    <br />
    <Row>
      <Col md={4} />
      <Col md={4}>
        <Row xsHidden>
          <Col sm={5} />
          <Col sm={2} xsHidden>
            <Image src={logo} responsive xsHidden />
          </Col>
          <Col sm={5} />
        </Row>

        <Row className="user-id" responsive>
          <Row responsive>
            <Image src={id} />
          </Row>
          <Row className="player-info">
            <Col md={1} />
            <Col md={10}>
              <Row className="clearance">
                <Clearance clearance={clearance} />
              </Row>
              <Media className="user-info">
                <Media.Left align="left">
                  <img width={130} height={130} src={photo} alt="thumbnail" />
                </Media.Left>
                <Media.Body align="center">
                  <h4>
                    <b>{username}</b>
                  </h4>
                  <h6>
                    <b>Games Played:</b>
                    {gamesPlayed}
                  </h6>
                  <h6>
                    <b>Wins:</b>
                    {wins}
                    <b> / Losses:</b>
                    {losses}
                  </h6>
                  {/* <h5>Losses: {losses}</h5> */}
                </Media.Body>
              </Media>
            </Col>
            <Col md={1} />
          </Row>

          <Row className="start-game" responsive>
            {newGame ? (
              <Row>
                <br />
                <h4 className="game-code">Game Code: {newGame}</h4>
              </Row>
            ) : (
              <StartGame
                activatePal={activatePal}
                setNumOfPlayers={setNumOfPlayers}
              />
            )}
          </Row>
          <Row className="join-game" responsive>
            <JoinGame
              game={game}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </Row>
        </Row>
        <Row responsive>
          <Logout />
        </Row>
      </Col>
      <Col md={4} />
    </Row>

    {/* <Col md={2} xs={0} /> */}
    {/* <Col md={8} xs={12} className="user-id-card"> */}
    {/* <Row> */}
    {/* <Row className="user-id-card"> */}
    {/* <Image src={id} /> */}
    {/* </Row> */}

    {/* <Row> */}
    {/* <Col md={1} /> */}
    {/* <Col md={10}> */}
    {/* <Clearance clearance={clearance} /> */}
    {/* <Media className="user-info"> */}
    {/* <Media.Left align="middle"> */}
    {/* <img width={300} height={300} src={photo} alt="thumbnail" /> */}
    {/* </Media.Left> */}
    {/* <Media.Body> */}
    {/* <h3>Name: {username}</h3> */}
    {/* <h3>Games Played: {gamesPlayed}</h3> */}
    {/* <h3>Wins: {wins}</h3> */}
    {/* <h3>losses: {losses}</h3> */}
    {/* </Media.Body> */}
    {/* </Media> */}
    {/* </Col> */}
    {/* <Col md={1} /> */}
    {/* </Row> */}

    {/* </Row> */}

    {/* <Row className="start-game"> */}
    {/* {newGame ? ( */}
    {/* // <Row> */}
    {/* <br /> */}
    {/* <h4 className="game-code">Game Code: {newGame}</h4> */}
    {/* </Row> */}
    {/* // ) : ( */}
    {/* // <StartGame */}
    {/* // activatePal={activatePal} */}
    {/* // setNumOfPlayers={setNumOfPlayers} */}
    {/* // /> */}
    {/* // )} */}
    {/* </Row> */}
    {/* <Row className="join-game"> */}
    {/* <JoinGame */}
    {/* // game={game} */}
    {/* // handleChange={handleChange} */}
    {/* // handleSubmit={handleSubmit} */}
    {/* // /> */}
    {/* </Row> */}
    {/* <Row className="logout"> */}
    {/* <Logout /> */}
    {/* </Row> */}
    {/* </Col> */}
    {/* <Col md={2} xs={0} /> */}
    <br />
  </Grid>
);

export default Dashboard;
