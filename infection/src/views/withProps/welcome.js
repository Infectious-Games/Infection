import React from 'react';
import infectionLogo from '../../Infection.jpg';
import Login from '../../components/hasState/login';

const Welcome = (props) => {
 return <div>
    <header className="welcome-header">
      <img src={infectionLogo} className="App-infection-logo" alt="logo" />
      <h1 className="welcome-title">Welcome to the team!</h1>
        <p>Our mission is to stop infectious outbreaks threatening the United States</p>
    </header>
    <Login login={props}></Login>
  </div>
}

export default Welcome;