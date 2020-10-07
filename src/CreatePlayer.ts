export default class Player {
    public name: string
    public value: string
    private isActive: boolean
    private wins: number
    private losses: number
    private ties: number
    private gamesPlayed: number

    constructor (name: string, isActive: boolean, wins: number, losses: number, ties: number, gamesPlayed: number, value: string){
        this.name = name
        this.isActive = isActive
        this.wins = wins
        this.losses = losses
        this.ties = ties
        this.gamesPlayed = gamesPlayed 
        this.value = value
    }
}