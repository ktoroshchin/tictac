import * as firebase from 'firebase'
import { Dispatch, SetStateAction } from 'react'
import { firebaseConfig } from './firebaseConfig'

class FirebaseApi {
  private app: firebase.app.App;
  private database: firebase.database.Database;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.database = this.app.database();
  }

  public fetchBoard(updateBoard: React.Dispatch<React.SetStateAction<string[]>>): void {
    this.database.ref('board').on('value', (snapshot) => {
      updateBoard(Object.values(snapshot.val()))
    })
  }

  public updateBoard(index: number, value: string): void {
    this.database.ref('board').update({
      [index]: value
    })
  }

  public isPlayerActive(playerName: string, setPlayerStatus: Dispatch<SetStateAction<boolean | undefined>>): void {
    this.database.ref(playerName).once('value').then((snapshot) => {
      setPlayerStatus(snapshot.val().isActive)
    })
  }

  public updatePlayerStatus(playerName: string, status: boolean): void {
    this.database.ref(playerName).update({
      isActive: status
    })
  }
}

export const firebaseApi: FirebaseApi = new FirebaseApi()