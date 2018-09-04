import React from 'react';

import HasLeaderSubmitredRoster from './rosterVote/roster/hasLeaderSubmittedRoster';
import Fail from '../missionResults/fail';

const Round = ({
  game,
  handleSelectRosterEntryClick,
  handleSubmitRoster,
  handleRosterVote,
}) =>
  // ?TODO: change line 13, server will update game state on client instead
  game.missionFailed ? (
    // game.rosterUnapproved === 3 ? (

    <Fail />
  ) : (
    <HasLeaderSubmitredRoster
      game={game}
      handleSelectRosterEntryClick={handleSelectRosterEntryClick}
      handleSubmitRoster={handleSubmitRoster}
      handleRosterVote={handleRosterVote}
    />
  );

export default Round;
