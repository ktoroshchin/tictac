import React from 'react'
import { CellValue, PlayerName } from './constants'
import { firebaseApi } from './FirebaseApi'
import { Game } from './Game'
import { GameIsFullMessage } from './GameIsFullMessage'

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

export interface IPlayerStatus {
  player1?: boolean
  player2?: boolean
}

export const App = (): React.ReactElement => {
    const [board, setBoard] = React.useState<string[]>([])
    const [player1Status, setPlayer1Status] = React.useState<boolean | undefined>(undefined)
    const [player2Status, setPlayer2Status] = React.useState<boolean | undefined>(undefined)
    const [player, setPlayer] = React.useState<IPlayer | undefined>(undefined)
    const [gameIsFull, setGameIsFull] = React.useState<boolean>(false)

    const playerStatus: IPlayerStatus = {
        player1: player1Status,
        player2: player2Status 
    } 

    const createPlayer = (name: string): void => {
        firebaseApi.updatePlayerStatus(name, true)
        // Player 1 always goes first
        if (name === PlayerName.PLAYER1) firebaseApi.updatePlayerTurn(name, true)
      }
    
      const setUpGame = (): void => {
        if (player) return
        if (player1Status === false || player2Status === false) {
          const name = player1Status === false ? PlayerName.PLAYER1 : PlayerName.PLAYER2
          firebaseApi.getPlayer(name, setPlayer)
          createPlayer(name)
        } 

      }

    React.useEffect(() => {
        firebaseApi.getBoard(setBoard)
        firebaseApi.isPlayerActive(PlayerName.PLAYER1, setPlayer1Status)
        firebaseApi.isPlayerActive(PlayerName.PLAYER2, setPlayer2Status)
      }, [])

    //Set full game status to prevent game with > 2 players
    React.useEffect(() => {
      if(player2Status) {
        firebaseApi.updateGameFullStatus(true)
      } 
    }, [player2Status])

    //Watch if game has > 2 players active
    React.useEffect(() => {
      firebaseApi.getGameFullStatus(setGameIsFull)
    },[gameIsFull])

    React.useEffect(() => {
      window.onbeforeunload = confirmExit
      function confirmExit() {
          if(player?.name) firebaseApi.emergencyReset(board)
      }
    })
    
    setUpGame()

    const renderGame = (): React.ReactElement => {
        if(gameIsFull && !player?.name) {
            return <GameIsFullMessage/>
        } else 
          return <Game board={board} gameIsFull={gameIsFull} playerStatus={playerStatus} player={player} />
    }

    return (
        renderGame()
    )
}