import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import { Actions } from "../contexts/gameStateReducer";
import { LETTER_STATUS } from "../lib/types";
import Guess from "./Guess";
import GuessLetter from "./GuessLetter";

function GuessHistory() {
  const { gameState, dispatch } = useContext(GameContext);

  // useEffect(() => {
  //   return () => {
  //     dispatch({
  //       type: Actions.RESET_STATE,
  //     });
  //   };
  // }, [dispatch]);
  // useEffect(() => {
  //   console.log(gameState.guessHistory);
  // }, [gameState.guessHistory]);

  return (
    <div id="guesses">
      {gameState.guessHistory.map((guess, i) => {
        return <Guess key={i} guess={guess} placeholder={false} />;
      })}

      {!gameState.finishAttempt && !gameState.evaluatingAnswer && (
        <Guess>
          {gameState.guess
            .split("")
            .map((e) => ({ letter: e, status: LETTER_STATUS.DEFAULT }))
            .map((e, i) => (
              <GuessLetter letter={e} key={i} />
            ))}
          {Array(
            gameState.word.length - gameState.guess.length < 0
              ? 0
              : gameState.word.length - gameState.guess.length
          )
            .fill(0)
            .map((e) => (
              <GuessLetter
                key={Math.random()}
                letter={{ letter: "0", status: LETTER_STATUS.DEFAULT }}
                placeholder={true}
              />
            ))}
        </Guess>
      )}

      {/* PLACEHOLDER */}

      {gameState.finishAttempt &&
        // !gameState.evaluatingAnswer &&
        gameState.guessHistory.length < gameState.tryLimit && (
          <Guess guess={gameState.word.split("")} placeholder={true} />
        )}

      {Array(
        gameState.tryLimit - gameState.guessHistory.length - 1 < 0
          ? 0
          : gameState.tryLimit -
              gameState.guessHistory.length -
              1 +
              (gameState.evaluatingAnswer
                ? gameState.guessHistory.length < gameState.tryLimit
                  ? 1
                  : 0
                : 0)
      )
        .fill(0)
        .map((_, i) => {
          return (
            <Guess
              guess={gameState.word.split("")}
              key={i}
              placeholder={true}
            />
            // <div key={Math.random()} className="guess">
            //     {
            //         Array(gameState.word.length)
            //             .fill(0)
            //             .map((__) => {
            //                 return (
            //                     <span
            //                         key={Math.random()}
            //                         className="guess-letter"
            //                         style={{
            //                             background: 'grey',
            //                             display: 'inline-block',
            //                             margin: '5px',
            //                             width: 50,
            //                             height: 75
            //                         }}
            //                     >
            //                     </span>
            //                 )
            //             })
            //     }
            // </div>
          );
        })}
    </div>
  );
}

export default GuessHistory;
