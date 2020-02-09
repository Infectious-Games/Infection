import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import './App.css';
import axios from 'axios';
import Login from './components/login';
import Game from './components/game';

// player photo images
import PlayerPhoto1 from './images/player-photo-1.png';
import PlayerPhoto2 from './images/player-photo-2.jpg';
import PlayerPhoto3 from './images/player-photo-3.png';
import PlayerPhoto4 from './images/player-photo-4.jpg';
import PlayerPhoto5 from './images/player-photo-5.png';
import PlayerPhoto6 from './images/player-photo-6.png';
import PlayerPhoto7 from './images/player-photo-7.png';
import PlayerPhoto8 from './images/player-photo-8.png';
import PlayerPhoto9 from './images/player-photo-9.jpeg';
import PlayerPhoto10 from './images/player-photo-10.jpg';
import PlayerPhoto11 from './images/player-photo-11.png';
import PlayerPhoto12 from './images/player-photo-12.jpg';
import PlayerPhoto13 from './images/player-photo-13.svg';
import PlayerPhoto14 from './images/player-photo-14.jpg';
import PlayerPhoto15 from './images/player-photo-15.png';
import PlayerPhoto16 from './images/player-photo-16.gif';

class App extends Component {
  constructor(props) {
    super(props);
    this.setInGameStatus = this.setInGameStatus.bind(this);
    this.changePhoto = this.changePhoto.bind(this);
    this.setLoggedIn = this.setLoggedIn.bind(this);

    this.state = {
      inGame: false,
      loggedIn: false,
      username: undefined,
      clearanceLevel: 'unclassified',
      gamesPlayed: 0,
      losses: 0,
      wins: 0,
      photo: PlayerPhoto1,
      images: [
        PlayerPhoto1,
        PlayerPhoto2,
        PlayerPhoto3,
        PlayerPhoto4,
        PlayerPhoto5,
        PlayerPhoto6,
        PlayerPhoto7,
        PlayerPhoto8,
        PlayerPhoto9,
        PlayerPhoto10,
        PlayerPhoto11,
        PlayerPhoto12,
        PlayerPhoto13,
        PlayerPhoto14,
        PlayerPhoto15,
        PlayerPhoto16,
      ],
      photoIndex: 0,
    };
  }

  // pass a function to setInGameStatus to set state.
  setInGameStatus() {
    const { inGame } = this.state;
    this.setState({ inGame: !inGame });
  }

  // pass to Game and Login
  setLoggedIn(profile) {
    const {
      clearanceLevel,
      gamesPlayed,
      losses,
      photo,
      photoIndex,
      username,
      wins,
    } = profile;
    this.setState({
      loggedIn: true,
      username,
      clearanceLevel,
      gamesPlayed,
      losses,
      wins,
      photo,
      photoIndex,
    });
  }

  // change user photo
  changePhoto() {
    const { photoIndex, images } = this.state;
    // if last image, go back to first image
    if (photoIndex + 1 === images.length) {
      this.setState({ photoIndex: 0, photo: images[0] }, () => {
        this.updatePhoto();
      });
      // go to next image
    } else {
      this.setState(
        {
          photoIndex: photoIndex + 1,
          photo: images[photoIndex + 1],
        },
        () => {
          this.updatePhoto();
        }
      );
    }
  }

  // update photo in db
  updatePhoto() {
    const { username, photo, photoIndex } = this.state;
    const update = { username, photo, photoIndex };
    axios.post('/updatePhoto', update).catch(err => console.error(err));
  }

  render() {
    const user = this.state;
    const { inGame } = this.state;
    return (
      <Grid className="App">
        {inGame ? (
          <Game
            setInGameStatus={this.setInGameStatus}
            setLoggedIn={this.setLoggedIn}
          />
        ) : (
          <Login
            setInGameStatus={this.setInGameStatus}
            setLoggedIn={this.setLoggedIn}
            changePhoto={this.changePhoto}
            user={user}
          />
        )}
      </Grid>
    );
  }
}

export default App;
