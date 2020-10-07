import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import './Board.css';
import Player from './CreatePlayer'
import { firebaseApi } from './FirebaseApi';

interface Board {
  data: string[]
  player: Player
}

export const Board = (board: Board): React.ReactElement => {
  const [turn, setTurn] = React.useState()
  const { data, player } = board

  console.log(player)
  const handleClick = (index: number, value: string) => {
    firebaseApi.updateBoard(index, value)
  }

  const renderBoard = (boardData: string[]): React.ReactElement[] => {
    const boardFields = boardData.map((value, index) => {
      return (
        <Grid.Column key={index}>
          <Button
            disabled={!!value} 
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
        <Grid columns={3}>
            {renderBoard(data)}
        </Grid>
    </Grid.Row>
  );
};
