import React from 'react';
import { Image } from 'react-bootstrap';

import logo0 from '../../../images/logo-green.png';
import logo1 from '../../../images/logo-yellow.png';
import logo2 from '../../../images/logo-orange.png';
import logo3 from '../../../images/Logo-vector.png';

const Header = ({ missionRosterUnapprovedCount, leaderSubmitRoster }, logo) => {
  !leaderSubmitRoster
    ? (logo = logo3)
    : missionRosterUnapprovedCount === 3
      ? (logo = logo3)
      : missionRosterUnapprovedCount === 2
        ? (logo = logo2)
        : missionRosterUnapprovedCount === 1
          ? (logo = logo1)
          : (logo = logo0);

  return <Image src={logo} width={64} height={64} />;
};

export default Header;
