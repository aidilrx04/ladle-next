import { createContext, Dispatch, Reducer, useEffect, useReducer } from "react";
import {
  GameContextState,
  GameState,
  GameStats,
  LETTER_STATUS,
  Result,
} from "../lib/types";
import {
  checkGuess,
  getGameStats,
  getWord,
  setGameStats,
  useLog,
} from "../lib/utils";
import { Actions, gameStateReducer } from "./gameStateReducer";

export const defaultGameState: GameState = {
  guess: "",
  word: "",
  guessHistory: [],
  numberOfTry: 0,
  tryLimit: 6,
  score: 0,
  isCorrect: false,
  hasUserSubmitAnswer: false,
  finishAttempt: false,
  evaluatingAnswer: false,
  attemptedLetters: {},
  animationDuration: 500,
  finishAnimation: false,
  showFinishDialog: false,
  getNextWord: false,
  retryGame: false,
  gameStats: {
    bestScore: 0,
    history: [],
  },
};

export const GameContext = createContext<GameContextState>({
  gameState: defaultGameState,
  dispatch: ({ type, data }) => {},
});

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameStateReducer, defaultGameState);
  const isCorrect = (result: Result[]) =>
    result.every((res) => res.status === LETTER_STATUS.CORRECT);

  //
  // game logic is handled here
  // useEffect(() => {
  //   console.log(gameState);
  //   // debugger;
  // }, [gameState]);

  useLog(gameState.word);

  // handle state when init and unmount
  useEffect(() => {
    // console.log(gameState);
    return () => {
      console.log("GameContext: reset everything");
      dispatch({
        type: Actions.RESET_STATE,
      });
      dispatch({
        type: Actions.SET_ATTEMPTED_LETTERS,
        data: { attemptedLetters: {} },
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // handle answer submission
  // and animation
  useEffect(() => {
    let listener;
    if (gameState.hasUserSubmitAnswer) {
      const result = checkGuess(gameState.guess, gameState.word);

      if (!result) {
        // answer has yet to completed
        console.log("nice try. but no.");
        dispatch({
          type: Actions.SET_USER_HAS_SUBMIT_ANSWER,
          data: {
            userHasSubmitAnswer: false,
          },
        });
        return;
      }

      // guess length is good.
      // doesnt matter if it correct or not
      // start animation
      // once finish, update everything :D
      // sounds good

      // okay to dispatch multi
      // they will be batch together
      // since this is in React event handler

      // add result to guess history
      // * required for letter animation
      dispatch({
        type: Actions.ADD_RESULT,
        data: {
          result: result,
        },
      });

      dispatch({
        type: Actions.SET_EVALUATING_ANSWER,
        data: {
          evaluatingAnswer: true,
        },
      });
      // ! duration is temp only
      let totalDuration =
        gameState.word.length * gameState.animationDuration - 250;

      // console.log(totalDuration);
      // console.log("hey, setting animation here");
      listener = setTimeout(() => {
        // console.log("animation answer finish");

        dispatch({
          type: Actions.SET_FINISH_ANIMATION,
          data: {
            finishAnimation: true,
          },
        });
      }, totalDuration);

      // ? handle when animation and evaluating answer is finish
      // // if correct
      // // increase score
    }
    return () => {
      // clearinggs
      // console.log("clearing");
      clearTimeout(listener);
    };
  }, [
    gameState.animationDuration,
    gameState.guess,
    gameState.hasUserSubmitAnswer,
    gameState.word,
  ]);

  // handle shit when animation is finished
  useEffect(() => {
    if (
      gameState.hasUserSubmitAnswer &&
      gameState.finishAnimation &&
      gameState.evaluatingAnswer
    ) {
      console.log("animatoin is finish");

      // only reset userSubmit state once animation is finished
      // reset back for the next time user
      // press enter
      dispatch({
        type: Actions.SET_USER_HAS_SUBMIT_ANSWER,
        data: {
          hasUserSubmitAnswer: false,
        },
      });

      dispatch({
        type: Actions.SET_FINISH_ANIMATION,
        data: {
          finishAnimation: false,
        },
      });
      dispatch({
        type: Actions.SET_EVALUATING_ANSWER,
        data: {
          evaluatingAnswer: false,
        },
      });

      // for keyboard highlighting
      console.log("heeee");
      dispatch({
        type: Actions.ADD_CHARS_TO_ATTEMPTED_LETTERS,
        data: {
          chars: [...gameState.guessHistory[gameState.guessHistory.length - 1]],
        },
      });

      // only reset guess once animation is finish
      // for the next attempt
      dispatch({
        type: Actions.SET_GUESS,
        data: {
          guess: "",
        },
      });

      // only set when animation is finished
      dispatch({
        type: Actions.INC_NUM_OF_TRY,
      });

      if (
        isCorrect(gameState.guessHistory[gameState.guessHistory.length - 1])
      ) {
        dispatch({
          type: Actions.SET_IS_CORRECT,
          data: {
            isCorrect: true,
          },
        });

        // finish attempt for the word
        // since the answer is correct
        dispatch({
          type: Actions.SET_FINNISH_ATTEMPT,
          data: {
            finnishAttempt: true,
          },
        });

        console.log("Answer is correct");
      }
    }
  }, [
    gameState.evaluatingAnswer,
    gameState.finishAnimation,
    gameState.guessHistory,
    gameState.hasUserSubmitAnswer,
  ]);

  // handle number of attempt user can try
  useEffect(() => {
    const numberOfTry = gameState.numberOfTry;
    // console.log(numberOfTry);
    if (numberOfTry === gameState.tryLimit) {
      console.log("exceeded");

      dispatch({
        type: Actions.SET_FINNISH_ATTEMPT,
        data: {
          finnishAttempt: true,
        },
      });
    }
  }, [gameState.numberOfTry, gameState.tryLimit]);

  useEffect(() => {
    if (gameState.finishAttempt) {
      dispatch({
        type: Actions.SET_SHOW_FINISH_DIALOG,
        data: {
          showFinishDialog: true,
        },
      });
    }
  }, [gameState.finishAttempt]);

  // handle things when user has finished the attempt
  // useEffect(() => {
  //   let a;
  //   if (gameState.finishAttempt) {
  //     if (gameState.isCorrect) {
  //       // console.log(gameState.guess.length * 500);
  //       console.log("corrected :D");

  //       // increase score
  //       // alert("Correct :D");
  //       dispatch({
  //         type: Actions.INC_SCORE,
  //       });
  //     } else {
  //       // console.log("incorrected T_T");
  //       // alert(`The word was ${gameState.word.toUpperCase()}`)
  //     }
  //   }

  //   return () => {
  //     clearTimeout(a);
  //   };
  // }, [gameState.finishAttempt, gameState.isCorrect, gameState.word]);

  useEffect(() => {
    if (gameState.finishAttempt) {
      // save current result
      const statsHistory = {
        word: gameState.word,
        numberOfTry: gameState.numberOfTry,
        guessHistory: gameState.guessHistory,
        isCorrect: gameState.isCorrect,
      };
      if (gameState.isCorrect) {
        dispatch({
          type: Actions.INC_SCORE,
        });
      }
      dispatch({
        type: Actions.ADD_STATS_HISTORY,
        data: {
          statsHistory: statsHistory,
        },
      });
    }
  }, [
    gameState.finishAttempt,
    gameState.guessHistory,
    gameState.isCorrect,
    gameState.numberOfTry,
    gameState.word,
  ]);

  useEffect(() => {
    // const gameStats = getGameStats();

    if (gameState.score > gameState.gameStats.bestScore) {
      dispatch({
        type: Actions.SET_BEST_SCORE,
        data: {
          bestScore: gameState.score,
        },
      });
      // setGameStats({ bestScore: gameState.score });
    }
  }, [gameState.gameStats.bestScore, gameState.score]);

  useEffect(() => {
    if (gameState.finishAnimation) {
      dispatch({
        type: Actions.SET_FINISH_ANIMATION,
        data: {
          finishAnimation: false,
        },
      });
    }
  }, [gameState.finishAnimation]);

  useEffect(() => {
    // setGameStats(gameState.gameStats);
  }, [gameState.gameStats]);

  useEffect(() => {
    if (gameState.getNextWord || gameState.retryGame) {
      getWord()
        .then((word) => {
          dispatch({
            type: Actions.RESET_FOR_NEXT_WORD,
          });
          dispatch({
            type: Actions.SET_WORD,
            data: { word: word.text },
          });

          dispatch({
            type: Actions.SET_GET_NEXT_WORD,
            data: { getNextWord: false },
          });

          if (gameState.retryGame) {
            dispatch({
              type: Actions.SET_SCORE,
              data: { score: 0 },
            });
          }

          dispatch({
            type: Actions.SET_SHOW_FINISH_DIALOG,
            data: { showFinishDialog: false },
          });
        })
        .catch(() => {
          console.error("ERROR: couldnt fetch word from db");
        });
    }
  }, [gameState.getNextWord, gameState.retryGame]);

  // useEffect(() => {
  //   if (gameState.retryGame) {
  //     getWord()
  //       .then((word) => {
  //         dispatch({
  //           type: Actions.RESET_FOR_NEXT_WORD,
  //         });

  //         dispatch({
  //           type: Actions.SET_RETRY_GAME,
  //           data: { retryGame: false },
  //         });
  //         dispatch({
  //           type: Actions.SET_WORD,
  //           data: {
  //             word: word.text,
  //           },
  //         });

  //         dispatch({
  //           type: Actions.SET_SCORE,
  //           data: {
  //             score: 0,
  //           },
  //         });
  //         dispatch({
  //           type: Actions.SET_SHOW_FINISH_DIALOG,
  //           data: { showFinishDialog: false },
  //         });
  //       })
  //       .catch((err) => {
  //         console.error("ERROR: Couldnt fetch word from db");
  //       });
  //   }
  // }, [gameState.retryGame]);
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

// console.group();
// console.log("finishAnimation:", gameState.finishAnimation);
// console.log("finishAttempt:", gameState.finishAttempt);
// console.log(!gameState.finishAnimation && gameState.finishAttempt);
// console.groupEnd();
