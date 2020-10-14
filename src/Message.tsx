import React from 'react'
import { Header } from 'semantic-ui-react'
import { IPlayer, IPlayerStatus } from './App'
import { PlayerName } from './constants'
import './message.css'

interface MessageProps {
    player?: IPlayer
    gameIsFull?: boolean
    playerStatus: IPlayerStatus
}

export const Message = (messageProps: MessageProps): React.ReactElement => {
    const { player, gameIsFull, playerStatus } = messageProps

    const renderMessage = (currentPlayer?: IPlayer, gameIsFull?: boolean): React.ReactElement => {
        const gameMessage = gameIsFull ? 'hidden' : ''

        const warning = (currentPlayer?: IPlayer): React.ReactElement => {
            const opponentIsActive: boolean | undefined = currentPlayer?.name === PlayerName.PLAYER1 ? playerStatus.player2 : playerStatus.player1
            if(!opponentIsActive) {
                return (
                    <div>
                        <div>
                            <div>Your opponent is NOT online.</div>
                        </div>
                        <div>Wait for another player, if you just started the game</div>
                        <div>If opponent left during the game, click 'Game Full Reset' button to start a new session and wait for player2 to join the game </div>
                    </div>
                )
            } else {
                return <></>
            }
        }

        return (
            <div>
                <Header textAlign='center'>You are {player?.name} </Header>
            <div className={`message ${gameMessage}`}>
                <Header textAlign='center'>{warning(player)} </Header>
            </div>
            </div>
        )
    }

    return renderMessage(player, gameIsFull)
}