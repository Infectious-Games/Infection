render() {
  const game = this.state;
  return !game.teamAssembled
    ? <WaitingForTeam></WaitingForTeam>
    : game.round === 0
      ? <Roles infiltrator={game.infiltrator}></Roles>
      : !game.missionActive
        ? <Round
          game={game}
          handleSelectRosterEntryClick={this.handleSelectRosterEntryClick.bind(this)}
          handleSubmitRoster={this.handleSubmitRoster.bind(this)}
        ></Round>
        : game.missionResults[game.round - 1] === undefined
          ? <Mission
            choose={this.handleOnMissionClick.bind(this)}
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