import React from 'react';
import infectionLogo from '../Infection.jpg';

const Welcome = (props) => {
 return <div>
    <header className="welcome-header">
      <img src={infectionLogo} className="App-infection-logo" alt="logo" />
      <h1 className="welcome-title">Welcome to the team!</h1>
        <p>Our mission is to stop infectious outbreaks threatening the United States</p>
    </header>
    <div>login Component</div>
    {/* <login></login> */}
  </div>
}

export default Welcome;