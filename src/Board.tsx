import React from 'react'
import { Button, Grid } from 'semantic-ui-react'
import { IPlayer } from './App'
import './Board.css'
import { PlayerName } from './constants'
import { firebaseApi } from './FirebaseApi'

interface BoardProps {
  data: string[]
  player: IPlayer
}

export const Board = (boardProps: BoardProps): React.ReactElement => {
  const { data, player } = boardProps
  const [turn, setTurn] = React.useState<boolean | undefined>(player.turn)

  React.useEffect(() => {
      firebaseApi.getPlayerTurn(player.name, setTurn)  
  }, [player.name])
  
  // check for a winner
  React.useEffect(() => {
    let winner: PlayerName | undefined = undefined

    const setResult = (cell: string): void => {
      const opponent = player.name === PlayerName.PLAYER2 ? PlayerName.PLAYER1 : PlayerName.PLAYER2
      winner = cell === player.value ? player.name : opponent
      if (winner === player.name) {
        firebaseApi.updateWins(player.name, player.wins)
      } else {
        firebaseApi.updateLosses(player.name, player.losses)
         // Disable the board after winner is determined
        firebaseApi.updatePlayerTurn(player.name, false)
      }  
    }

    //check for ties
    const emptyCellIndex = data.findIndex((cell) => !cell)
    if (emptyCellIndex < 0 && !winner) {
      firebaseApi.updateTies(player.ties)
    }
 
    if(!winner) {
      //horizontal check
      for (let i = 0; i <= 6; i += 3) {
        if (data[i] && data[i] === data[i + 1] && data[i] === data[i + 2]) {
          setResult(data[i])
          break
        }
      }

      //vertical check
      for (let i = 0; i <= 2; i++) {
        if (data[i] && data[i] === data[i + 3] && data[i] === data[i + 6]) {
          setResult(data[i])
          break
        }
      }

      //diagonal check
      for (let i = 0; i <= 2; i += 2) {
        if (i === 0) {
          if (data[i] && data[i] === data[4] && data[i] === data[8]) {
            setResult(data[i])
            break
          }
        } else {
          if (data[i] && data[i] === data[4] && data[i] === data[6]) {
            setResult(data[i])
            break
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleClick = (index: number, value: string): void => {
    firebaseApi.updateBoard(index, value)
    // Set turn of the current player to false
    firebaseApi.updatePlayerTurn(player.name, false)
    // Set turn of an opponent to true
    firebaseApi.updatePlayerTurn(player.name === PlayerName.PLAYER1 ? PlayerName.PLAYER2 : PlayerName.PLAYER1, true)
  }

  const renderBoard = (boardData: string[]): React.ReactElement[] => {
    const boardFields = boardData.map((value, index) => {
      return (
        <Grid.Column key={index}>
          <Button
            disabled={!turn || !!value}
            className='box'
            onClick={() => handleClick(index, player.value)}
          >
            {value}
          </Button>
        </Grid.Column>
      )
    })

    return boardFields
  }

  return (
    <Grid.Row>
      <Grid columns={3}>{renderBoard(data)}</Grid>
    </Grid.Row>
  )
}
