import React from 'react';
import { Grid } from 'semantic-ui-react';
import './Board.css';

interface Board {
  data: string[]
}

export const Board = (board: Board): React.ReactElement => {
  const renderBoard = (data: string[]): React.ReactElement[] => {
    const boardFields = data.map((value, index) => {
      return (
        <Grid.Column 
            key={index} 
            onClick={() => {}}
        >
          <div className='box'>{value}</div>
        </Grid.Column>
      )
    })

    return boardFields
  }

  return (
    <Grid.Row>
        <Grid columns={3}>
            {renderBoard(board.data)}
        </Grid>
    </Grid.Row>
  );
};
