import React, { useContext } from 'react'
import { GameContext } from '../contexts/GameContext'

function ScoreCounter() {

    const { gameState } = useContext(GameContext)

    return (
        <div className="score">
            <b>Score: {gameState.score} </b>
        </div>
    )
}

export default ScoreCounter