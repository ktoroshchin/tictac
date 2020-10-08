import React from "react";
import { Header } from "semantic-ui-react";
import { IPlayer } from "./App";

interface MessageProps {
    player?: IPlayer
    isOpponentActive?: boolean
}

export const Message = (messageProps: MessageProps) => {
    const { player, isOpponentActive } = messageProps

    const warning = isOpponentActive ? '' : <div>
        <div>Your opponent is NOT online.</div>
        <div>
            <div>Wait for another player, if you just started the game</div>
            <div>If opponent left during the game, click 'Game Full Reset' button to start a new session </div>
        </div>
    </div>

    return (
        <div>
            <Header textAlign='center'>You are {player?.name} </Header>
            <Header textAlign='center'>{warning} </Header>
        </div>
    )
}