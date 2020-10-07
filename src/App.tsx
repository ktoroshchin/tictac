import React from 'react';
import { Container } from 'semantic-ui-react';
import { Board } from './Board';
import { firebaseApi } from './FirebaseApi';
import './App.css'
import 'semantic-ui-css/semantic.min.css'

export const App = (): React.ReactElement => {
  const [board, setBoard] = React.useState<string[]>([]);

  React.useEffect(() => {
    firebaseApi.fetchBoard(setBoard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Board data={board} />
    </Container>
  )
};
