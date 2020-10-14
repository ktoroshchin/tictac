import * as firebase from 'firebase'
import { Dispatch, SetStateAction } from 'react'
import { IPlayer } from './App'
import { PlayerName } from './constants'
import { firebaseConfig } from './firebaseConfig'

class FirebaseApi {
  private app: firebase.app.App
  private database: firebase.database.Database

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig)
    this.database = this.app.database()
  }

  public getBoard(updateBoard: React.Dispatch<React.SetStateAction<string[]>>): void {
    this.database.ref('board').on('value', (snapshot) => {
      updateBoard(Object.values(snapshot.val()))
    })
  }

  public updateBoard(index: number, value: string): void {
    this.database.ref('board').update({
      [index]: value
    })
  }

  public resetBoard(board: string[]): void {
    let newBoard: { [key: number]: string } = {}
    board.forEach((cell, index) => (newBoard[index] = ''))
    this.database.ref('board').update({ ...newBoard })
  }

  public getPlayer(playerName: string, setPlayer: Dispatch<SetStateAction<IPlayer | undefined>>): void {
    this.database.ref(playerName).on('value', (snapshot) => {
      setPlayer(snapshot.val())
    })
  }

  public isPlayerActive(playerName: string, setPlayerStatus: Dispatch<SetStateAction<boolean | undefined>>): void {
    this.database.ref(playerName).on('value', (snapshot) => {
      setPlayerStatus(snapshot.val().isActive)
    })
  }

  public updatePlayerStatus(playerName: string, status: boolean): void {
    this.database.ref(playerName).update({
      isActive: status
    })
  }

  public updatePlayerTurn(playerName: string, turn: boolean): void {
    this.database.ref(playerName).update({
      turn: turn,
    })
  }

  public getPlayerTurn(playerName: string, setTurn: Dispatch<SetStateAction<boolean | undefined>>): void {
    this.database.ref(playerName).on('value', (snapshot) => {
      setTurn(snapshot.val().turn)
    })
  }

  public resetPlayer(playerName: string): void {
    const newPlayer = {
      isActive: false,
      gamesPlayed: 0,
      losses: 0,
      ties: 0,
      turn: 0,
      wins: 0,
    }
    this.database.ref(playerName).update({ ...newPlayer })
  }

  public emergencyReset(board: string[]): void {
    this.updateGameFullStatus(false)
    this.resetPlayer(PlayerName.PLAYER1)
    this.resetPlayer(PlayerName.PLAYER2)
    this.resetBoard(board)
  }

  public updateWins(playerName: string, wins: number): void {
    this.database.ref(playerName).update({ wins: wins + 1 })
  }

  public getWins(playerName: string, setWins: Dispatch<SetStateAction<number>>): void {
    this.database.ref(playerName).on('value', (snapshot) => {
      setWins(snapshot.val().wins)
    })
  }

  public updateTies(ties: number): void {
    this.database.ref(PlayerName.PLAYER1).update({ ties: ties + 1 })
    this.database.ref(PlayerName.PLAYER2).update({ ties: ties + 1 })
  }

  public getTies(playerName: string, setTies: Dispatch<SetStateAction<number>>): void {
    this.database.ref(playerName).on('value', (snapshot) => {
      setTies(snapshot.val().ties)
    })
  }

  public updateLosses(playerName: string, losses: number): void {
    this.database.ref(playerName).update({ losses: losses + 1 })
  }

  public getLosses(playerName: string, setLosses: Dispatch<SetStateAction<number>>): void {
    this.database.ref(playerName).on('value', (snapshot) => {
      setLosses(snapshot.val().losses)
    })
  }

  public getGameFullStatus(setGameStatus: Dispatch<SetStateAction<boolean>> ): void {
    this.database.ref('game').on('value', (snapshot) => {
      setGameStatus(snapshot.val().isFull)
    })
  }

  public updateGameFullStatus(status?: boolean): void {
    this.database.ref('game').update({ isFull: status })
  }
}

export const firebaseApi: FirebaseApi = new FirebaseApi()
