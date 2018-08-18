import React from 'react';
import infectionLogo from '../../images/Infection.jpg';
import Login from '../../components/login';

const Welcome = ({ login }) => {
 return <div>
    <header className="welcome-header">
      <img src={infectionLogo} className="App-infection-logo" alt="logo" />
      <h1 className="welcome-title">Welcome to the team!</h1>
        <p>Our mission is to stop infectious outbreaks threatening the United States</p>
    </header>
    <Login login={login}></Login>
  </div>
}

export default Welcome;