import { Dispatch } from "react"
import { Actions } from "../contexts/gameStateReducer"

export enum LETTER_STATUS {
    CORRECT = 'CORRECT',
    MISPLACED = 'MISPLACED',
    INCORRECT = 'INCORRECT',
    DEFAULT = 'DEFAULT'
}

export type Result = { letter: string, status: LETTER_STATUS }


export type GameStats = {
    bestScore: number
    history: {
        numberOfTry: number,
        word: string,
        guessHistory: Result[][],
        isCorrect: boolean
    }[]
}

export interface GameState {
  guess: string;
  word: string;
  guessHistory: Result[][];
  numberOfTry: number;
  tryLimit: number;
  score: number;
  isCorrect: boolean;
  hasUserSubmitAnswer: boolean;
  finishAttempt: boolean;
  evaluatingAnswer: boolean;
  attemptedLetters: {
    [key: string]: LETTER_STATUS;
  };
  animationDuration: number;
  finishAnimation: boolean;
  showFinishDialog: boolean;
  getNextWord: boolean;
  retryGame: boolean;
  gameStats: GameStats;
}

export interface GameContextState {
  gameState: GameState;
  dispatch: Dispatch<{ type: Actions; data?: any }>;
}