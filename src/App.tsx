import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Container } from "semantic-ui-react";
import "./App.css";
import { Board } from "./Board";
import Player from "./CreatePlayer";
import { firebaseApi } from "./FirebaseApi";

// export interface IPlayer {
//   name: string;
//   isActive: boolean;
//   wins: number;
//   losses: number;
//   ties: number;
//   gamesPlayed: number;
// }

export const App = (): React.ReactElement => {
  const playerName = {
    player1: "player1",
    player2: "player2",
  };

  const [board, setBoard] = React.useState<string[]>([]);
  const [player1Status, setPlayer1Status] = React.useState<boolean | undefined>(undefined);
  const [player2Status, setPlayer2Status] = React.useState<boolean | undefined>(undefined);
 // const [gameStatus, setGameStatus] = React.useState<number>(0);
  const [player, setPlayer] = React.useState<Player | undefined>(undefined);

  const createPlayer = (name: string): void => {
    const value = name === playerName.player1 ? 'X' : 'O' 
    const player = new Player(name, true, 0, 0, 0, 0, value);
    setPlayer(player);
    firebaseApi.updatePlayerStatus(name, true);
  };

  const setUpGame = (): void => {
    if (player) return;

    if (player1Status === false || player2Status === false)
      createPlayer(
        player1Status === false ? playerName.player1 : playerName.player2
      );
  };

  React.useEffect(() => {
    firebaseApi.fetchBoard(setBoard);
    firebaseApi.isPlayerActive(playerName.player1, setPlayer1Status);
    firebaseApi.isPlayerActive( playerName.player2, setPlayer2Status);
  }, [playerName.player1, playerName.player2]);

  setUpGame();

  return (
    <Container>
      {
        player ? <Board data={board} player={player} /> : <></>
      }
    </Container>
  );
};
