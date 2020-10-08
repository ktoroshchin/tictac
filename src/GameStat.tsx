import React from 'react'
import { IPlayer } from './App'
import './gameStat.css'

interface GameStatProps {
    player: IPlayer
}

export const GameStat = (gameStatProps: GameStatProps): React.ReactElement => {
    const { player } = gameStatProps
    return (
        <div className='gamestat'>
            <div>Total games played: {player.losses + player.wins + player.ties} </div>
            <div>Number of ties: {player.ties} </div>
            <div>Number of losses: {player.losses} </div>
            <div>Number of wins: {player.wins} </div>
        </div>
    )
}