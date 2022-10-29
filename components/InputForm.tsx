import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { GameContext } from '../contexts/GameContext'
import { Actions } from '../contexts/gameStateReducer';
import { LETTER_STATUS, Result } from '../lib/types';
import { useLog } from '../lib/utils';

function InputForm() {

    const { gameState, dispatch } = useContext(GameContext)
    const [userGuess, setUserGuess] = useState('');

    useLog(userGuess)
    useLog(gameState.word)
    useLog(gameState.numberOfTry)

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()

        if (userGuess.length !== gameState.word.length) {
            alert("please fill all the sjit")
            return
        }


        let result: Result[] = []

        if (userGuess === gameState.word) {
            console.log('Correct')

            for (let letter of userGuess) {
                result.push({
                    letter,
                    status: LETTER_STATUS.CORRECT
                })
            }

            // okay to dispatch multi
            // they will be batch together
            // since this is in React event handler
            dispatch({
                type: Actions.SET_GUESS,
                data: { guess: userGuess }
            })
            dispatch({
                type: Actions.ADD_RESULT,
                data: { result: result }
            })
            dispatch({
                type: Actions.INC_SCORE
            })
            dispatch({
                type: Actions.INC_NUM_OF_TRY
            })

            return;
        }


        // ! NOT performance friendly
        const wordLetters = gameState.word.split('');
        const guessLetters = userGuess.split('');
        const letterIndex: any = {}
        const takenIndex: any = {} // to avoid infinite duplicate letters

        wordLetters.forEach((l, i) => {
            letterIndex[l] = letterIndex[l] ? [...letterIndex[l], i] : [i]
            takenIndex[l] = []
        })
        // END

        for (let i = 0; i < guessLetters.length; i++) {
            const letter = guessLetters[i]

            if (wordLetters.includes(letter)) {
                // letter exist in guess
                // but might be correctly place or misplace

                // used as starting search pos
                const lastTakenLetterIndex = takenIndex[letter].length > 0
                    ? takenIndex[letter][takenIndex[letter].length - 1] + 1
                    : 0

                const searchLetterIndex = wordLetters.indexOf(letter, lastTakenLetterIndex)
                if (searchLetterIndex >= 0) {
                    takenIndex[letter].push(searchLetterIndex)

                    if (searchLetterIndex === i) {
                        // letter is correctly in pos
                        result.push({
                            letter,
                            status: LETTER_STATUS.CORRECT
                        })
                    }
                    else {
                        // letter is misplaced
                        result.push({
                            letter,
                            status: LETTER_STATUS.MISPLACED
                        })
                    }
                } else {
                    // letter is duplicate
                    // more than it should be
                    result.push({
                        letter,
                        status: LETTER_STATUS.INCORRECT
                    })
                }
            }
            else {
                // character is not in word
                result.push({
                    letter,
                    status: LETTER_STATUS.INCORRECT
                })
            }
        }

        // same case as above
        dispatch({
            type: Actions.SET_GUESS,
            data: { guess: userGuess }
        })
        dispatch({
            type: Actions.ADD_RESULT,
            data: { result: result }
        })
        dispatch({
            type: Actions.INC_NUM_OF_TRY
        })
    }

    return (
        <form id="input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder='Enter your guess'
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
            />
        </form>
    )
}

export default InputForm