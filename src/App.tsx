import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Container } from 'semantic-ui-react'
import './App.css'
import { Board } from './Board'
import { CellValue, PlayerName } from './constants'
import { firebaseApi } from './FirebaseApi'
import { GameStat } from './GameStat'
import { Message } from './Message'

export interface IPlayer {
  name: PlayerName
  value: CellValue
  isActive: boolean
  wins: number
  losses: number
  ties: number
  gamesPlayed: number
  turn: boolean
}

export const App = (): React.ReactElement => {
  const [board, setBoard] = React.useState<string[]>([])
  const [player1Status, setPlayer1Status] = React.useState<boolean | undefined>(undefined)
  const [player2Status, setPlayer2Status] = React.useState<boolean | undefined>(undefined)
  const [player, setPlayer] = React.useState<IPlayer | undefined>(undefined)

  const createPlayer = (name: string): void => {
    firebaseApi.updatePlayerStatus(name, true)
    // Player 1 always goes first
    if (name === PlayerName.PLAYER1) firebaseApi.updatePlayerTurn(name, true)
  }

  const setUpGame = (): void => {
    if (player) return
    if (player1Status === false || player2Status === false) {
      const name = player1Status === false ? PlayerName.PLAYER1 : PlayerName.PlAYER2
      firebaseApi.getPlayer(name, setPlayer)
      createPlayer(name)
    }
  }

  React.useEffect(() => {
    firebaseApi.getBoard(setBoard)
    firebaseApi.isPlayerActive(PlayerName.PLAYER1, setPlayer1Status)
    firebaseApi.isPlayerActive(PlayerName.PlAYER2, setPlayer2Status)
  }, [player1Status, player2Status])

  React.useEffect(() => {
    window.onbeforeunload = confirmExit
    function confirmExit() {
      firebaseApi.emergencyReset(board)
    }
  })

  setUpGame()

  return (
    <div className='main_content'>
      <Message
        player={player}
        isOpponentActive={player?.name === PlayerName.PLAYER1 ? player2Status : player1Status}
      />
      <Container className='board_gamestat'>
        {player ? (
          <>
            <Board data={board} player={player} />
            <GameStat player={player} />
          </>
        ) : (
          <></>
        )}
      </Container>
      <Container>
        <Button
          disabled={player1Status && player2Status}
          color='red'
          onClick={() => {
            firebaseApi.emergencyReset(board)
            window.location.reload()
          }}
        >
          Game Full Reset
        </Button>
        <Button 
          color="blue" 
          onClick={() => {
            firebaseApi.resetBoard(board)
            firebaseApi.updatePlayerTurn(PlayerName.PLAYER1, true)
            firebaseApi.updatePlayerTurn(PlayerName.PlAYER2, true)
          }}
        >
          Start new game
        </Button>
      </Container>
    </div>
  )
}
