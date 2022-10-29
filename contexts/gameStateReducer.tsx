import { exists } from "fs";
import { Reducer } from "react";
import { GameState, LETTER_STATUS, Result } from "../lib/types";
import { setGameStats } from "../lib/utils";
import { defaultGameState } from "./GameContext";

export enum Actions {
  SET_WORD = "SET_WORD",
  SET_GUESS = "SET_GUESS",
  SET_IS_CORRECT = "SET_IS_CORRECT",
  SET_USER_HAS_SUBMIT_ANSWER = "SET_USER_HAS_SUBMIT_ANSWER",
  SET_FINNISH_ATTEMPT = "SET_FINNISH_ATTEMPT",
  SET_FINISH_ANIMATION = "SET_FINISH_ANIMATION",
  SET_EVALUATING_ANSWER = "SET_EVALUATING_ANSWER",
  SET_SHOW_FINISH_DIALOG = "SET_SHOW_FINISH_DIALOG",
  SET_GET_NEXT_WORD = "SET_GET_NEXT_WORD",

  ADD_RESULT = "ADD_RESULT",
  ADD_GUESS_CHAR = "ADD_GUESS_CHAR",
  ADD_CHARS_TO_ATTEMPTED_LETTERS = "ADD_CHAR_TO_ATTEMPTED_LETTERS",

  DEL_LAST_GUESS_CHAR = "DEL_LAST_GUESS_CHAR",

  INC_SCORE = "INC_SCORE",
  INC_NUM_OF_TRY = "INC_NUM_OF_TRY",

  RESET_STATE = "RESET_STATE",
  RESET_FOR_NEXT_WORD = "RESET_FOR_NEXT_WORD",
  SET_RETRY_GAME = "SET_RETRY_GAME",
  SET_BEST_SCORE = "SET_BEST_SCORE",
  SET_GAME_STATS = "SET_GAME_STATS",
  SET_SCORE = "SET_SCORE",
  ADD_STATS_HISTORY = "ADD_STATS_HISTORY",
  SET_ATTEMPTED_LETTERS = "SET_ATTEMPTED_LETTERS",
}

export const gameStateReducer: Reducer<
  GameState,
  { type: Actions; data?: any }
> = (previousState, { type, data }): GameState => {
  switch (type) {
    // SET_*

    case Actions.SET_WORD: {
      return { ...previousState, word: data.word };
    }
    case Actions.SET_GUESS: {
      return { ...previousState, guess: data.guess };
    }
    case Actions.SET_IS_CORRECT: {
      return { ...previousState, isCorrect: data.isCorrect };
    }
    case Actions.SET_USER_HAS_SUBMIT_ANSWER: {
      return {
        ...previousState,
        hasUserSubmitAnswer: data.hasUserSubmitAnswer,
      };
    }
    case Actions.SET_FINNISH_ATTEMPT: {
      return {
        ...previousState,
        finishAttempt: data.finnishAttempt,
      };
    }
    case Actions.SET_EVALUATING_ANSWER: {
      return {
        ...previousState,
        evaluatingAnswer: data.evaluatingAnswer,
      };
    }
    case Actions.SET_FINISH_ANIMATION: {
      return {
        ...previousState,
        finishAnimation: data.finishAnimation,
      };
    }
    case Actions.SET_SHOW_FINISH_DIALOG: {
      return { ...previousState, showFinishDialog: data.showFinishDialog };
    }
    case Actions.SET_GET_NEXT_WORD: {
      return {
        ...previousState,
        getNextWord: data.getNextWord,
      };
    }
    case Actions.SET_RETRY_GAME: {
      return {
        ...previousState,
        retryGame: data.retryGame,
      };
    }
    case Actions.SET_BEST_SCORE: {
      return {
        ...previousState,
        gameStats: {
          ...previousState.gameStats,
          bestScore: data.bestScore,
        },
      };
    }
    case Actions.SET_GAME_STATS: {
      setGameStats(data.gameStats);
      return {
        ...previousState,
        gameStats: data.gameStats,
      };
    }
    case Actions.SET_SCORE: {
      return {
        ...previousState,
        score: data.score,
      };
    }
    case Actions.SET_ATTEMPTED_LETTERS: {
      return {
        ...previousState,
        attemptedLetters: data.attemptedLetters,
      };
    }

    // ADD_*
    case Actions.ADD_RESULT: {
      return {
        ...previousState,
        guessHistory: [...previousState.guessHistory, data.result],
      };
    }
    case Actions.ADD_GUESS_CHAR: {
      return {
        ...previousState,
        guess: previousState.guess + data.char,
      };
    }
    case Actions.ADD_CHARS_TO_ATTEMPTED_LETTERS: {
      // find a similar letter
      // maybe with different status
      // produce status hierarchy here

      const newAttemptedLetters: { [letter: string]: LETTER_STATUS } =
        previousState.attemptedLetters ?? {};

      const oldAttemptedLetters: Result[] = Object.entries(
        newAttemptedLetters
      ).map(([letter, status]) => ({ letter, status }));
      const newEntries: Result[] = data.chars as Result[];
      const sortedNewEntries = [...oldAttemptedLetters, ...newEntries].sort(
        (a, b) => {
          const priority = (status: LETTER_STATUS): number =>
            status === LETTER_STATUS.CORRECT
              ? 4
              : status === LETTER_STATUS.MISPLACED
              ? 3
              : status === LETTER_STATUS.INCORRECT
              ? 2
              : 1;

          const statusA = priority(a.status);
          const statusB = priority(b.status);
          if (statusA === statusB) return 0;
          if (statusA > statusB) return 1;
          if (statusA < statusB) return -1;
          return 0;
        }
      );

      sortedNewEntries.forEach(({ letter, status }) => {
        newAttemptedLetters[letter] = status;
      });

      // console.log(newAttemptedLetters);
      // ? hahaha buto react xnk update bile xde spread operator
      console.log("hmmmm");
      return {
        ...previousState,
        attemptedLetters: { ...newAttemptedLetters },
      };
    }
    case Actions.ADD_STATS_HISTORY: {
      return {
        ...previousState,
        gameStats: {
          ...previousState.gameStats,
          history: [...previousState.gameStats.history, data.statsHistory],
        },
      };
    }

    // DEL_*
    case Actions.DEL_LAST_GUESS_CHAR: {
      return {
        ...previousState,
        guess: previousState.guess
          .split("")
          .slice(0, previousState.guess.length - 1)
          .join(""),
      };
    }

    // INC_*
    case Actions.INC_SCORE: {
      return {
        ...previousState,
        score: previousState.score + 1,
      };
    }
    case Actions.INC_NUM_OF_TRY: {
      return {
        ...previousState,
        numberOfTry: previousState.numberOfTry + 1,
      };
    }

    // RESET_*
    case Actions.RESET_STATE: {
      console.log("resetting state");
      return { ...defaultGameState };
      console.log("b");
    }
    case Actions.RESET_FOR_NEXT_WORD: {
      return {
        ...previousState,
        guess: "",
        word: "",
        guessHistory: [],
        numberOfTry: 0,
        isCorrect: false,
        hasUserSubmitAnswer: false,
        finishAttempt: false,
        attemptedLetters: {},
        evaluatingAnswer: false,
        finishAnimation: false,
        showFinishDialog: false,
      };
    }

    default:
      return previousState;
  }
};
