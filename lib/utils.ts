import { useEffect } from "react"
import { db } from "./firebase"
import { GameStats, LETTER_STATUS, Result } from "./types"

export function useLog(state: any) {
    useEffect(() => {
        const varToString = (varObj: any) => Object.keys(varObj)[0]
        console.log(state)
        // console.log(varToString({ state }) + ":", state)
    }, [state])
}

export const getWord = async () => {
    const wordsRef = db.collection('words')
    const randomID = wordsRef.doc().id;

    const queryRef = wordsRef.where('id', '>=', randomID).limit(10)

    const res = await queryRef.get();
    // console.log(res)

    const randomDoc = res.docs[Math.floor(Math.random() * res.docs.length)].data();

    // console.log(randomDoc)
    return randomDoc
}

export const checkGuess = (_guess: string, _word: string): void | Result[] => {
    // for strict comparison
    // both word and guess must be UPPPER CASE
    const guess = _guess.toUpperCase()
    const word = _word.toUpperCase()

    if (guess.length !== word.length) {
        console.error('Guess length is not the same as the word length. try to delete or add a few letters')
        return
    }

    let result: Result[] = []

    if (guess === word) {
        console.info('Correct')
        for (let letter of guess) {
            result.push({
                letter,
                status: LETTER_STATUS.CORRECT
            })
        }

        return result
    }

    // ! NOT performance friendly
    const wordLetters = word.split('');
    const guessLetters = guess.split('');
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

    console.log('Incorrect')

    return result
}

export const getGameStats = (): GameStats=> {
    const defaultGameStats: GameStats = {
        bestScore: 0,
        history: []
    }
    const gameStatsInString = localStorage.getItem('gameStats');
    const gameStats = gameStatsInString ? JSON.parse(gameStatsInString) as GameStats : defaultGameStats

    return gameStats
}

export const setGameStats = (newStats) => {
    const gameStats = getGameStats();
    localStorage.setItem('gameStats', JSON.stringify({...gameStats, ...newStats}))
}