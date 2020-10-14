import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Button, Container } from 'semantic-ui-react'
import { IPlayer, IPlayerStatus } from './App'
import { Board } from './Board'
import { PlayerName } from './constants'
import { firebaseApi } from './FirebaseApi'
import './Game.css'
import { GameStat } from './GameStat'
import { Message } from './Message'

interface GameProps {
  board: string[]
  gameIsFull?: boolean
  playerStatus: IPlayerStatus
  player?: IPlayer
}

export const Game = (gameProps: GameProps): React.ReactElement => {
  const { board, gameIsFull, playerStatus, player } = gameProps
  return (
        <div className='main_content'>
          <Message
            player={player}
            gameIsFull={gameIsFull}
            playerStatus={playerStatus}
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
          <Container >
            <Button
              disabled={gameIsFull}
              color='red'
              onClick={() => {
                firebaseApi.emergencyReset(board)
                window.location.reload()
              }}
            >
              Game Full Reset
            </Button>
            <Button 
              color='blue' 
              onClick={() => {
                firebaseApi.resetBoard(board)
                firebaseApi.updatePlayerTurn(PlayerName.PLAYER1, true)
                firebaseApi.updatePlayerTurn(PlayerName.PLAYER2, true)
              }}
            >
              Start new game
            </Button>
          </Container>
        </div>
  )
}
