import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { GameContext } from "../contexts/GameContext";
import { Actions } from "../contexts/gameStateReducer";
import { LETTER_STATUS, Result } from "../lib/types";
import { checkGuess, useLog } from "../lib/utils";
import { Key } from "./Key";
import isEqual from "lodash.isequal";
const keys = [
  [..."qwertyuiop".split(""), "-"],
  [..."asdfghjkl".split("")],
  ["Enter", ..."zxcvbnm".split(""), "Backspace"],
];

const chars = "abcdefghijklmnopqrstuvwxyz";
const validKeys = [
  ...chars.split(""),
  ...chars.toUpperCase().split(""),
  "-",
  "Enter",
  "Backspace",
];
function Keyboard() {
  const { gameState, dispatch: _dispatch } = useContext(GameContext);
  const dispatch = useCallback(_dispatch, [_dispatch]);
  const [attemptedLetters, setAttemptedLetters] = useState({});

  const _handleClick = (key: string) => {
    if (!validKeys.includes(key)) return;
    if (gameState.finishAttempt) return;
    if (gameState.evaluatingAnswer) return;

    if (key === "Enter") {
      dispatch({
        type: Actions.SET_USER_HAS_SUBMIT_ANSWER,
        data: {
          hasUserSubmitAnswer: true,
        },
      });
      return;
    }

    if (key === "Backspace") {
      dispatch({
        type: Actions.DEL_LAST_GUESS_CHAR,
      });
      return;
    }

    if (gameState.guess.length === gameState.word.length) return;

    dispatch({
      type: Actions.ADD_GUESS_CHAR,
      data: {
        char: key.toUpperCase(),
      },
    });

    // console.info("Im inside handleClick");
  };
  const handleClick = useCallback(_handleClick, [_handleClick]);

  // useEffect(() => {
  //   // console.log(attemptedLetters);
  // }, [attemptedLetters]);
  useEffect(() => {
    return () => {
      // console.log("cleaning keyboard");
      // dispatch({
      //   type: Actions.RESET_STATE,
      // });
      setAttemptedLetters({});
    };
  }, [dispatch]);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      handleClick(event.key);
    };
    document.addEventListener("keydown", listener);

    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleClick]);
  // useLog(gameState.finishAnimation);

  useEffect(() => {
    // console.log("hye");
    // debugger;
    // console.log("Attempted Letter:", gameState.attemptedLetters);
    setAttemptedLetters(gameState.attemptedLetters);

    return () => {
      setAttemptedLetters({});
    };
  }, [gameState.attemptedLetters]);

  return (
    <div className="on-screen-keyboard notranslate mx-auto mt-1 flex max-w-full items-center justify-center">
      <div className="keys max-w-full">
        {keys.map((row, i) => (
          <div className="flex max-w-full items-center justify-center" key={i}>
            {row.map((key) => (
              <Key
                key={key}
                value={key}
                handleClick={handleClick}
                status={
                  attemptedLetters[key.toUpperCase()]
                    ? attemptedLetters[key.toUpperCase()]
                    : LETTER_STATUS.DEFAULT
                }
                disabled={gameState.evaluatingAnswer}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Keyboard;

// // ? part of solution 1
//   const [b, setB] = useState("");
//   const [userHasPressEnter, setUserHasPressEnter] = useState(false);

//   useEffect(() => {
//     if (userHasPressEnter) {
//       // let result = checkGuess(gameState.guess, gameState.word);
//       // console.info(JSON.stringify(a))
//       // console.table(a)

//       // if (gameState.guess.length !== gameState.word.length) {
//       //   // means guess word length is yet to be satisfies
//       //   setUserHasPressEnter((e) => false);
//       //   return;
//       // }

//       dispatch({
//         type: Actions.SET_USER_HAS_SUBMIT_ANSWER,
//         data: {
//           hasUserSubmitAnswer: true,
//         },
//       });
//       // setB("");
//       setUserHasPressEnter((e) => false);
//     }
//   }, [userHasPressEnter, gameState.word, gameState.guess, dispatch]);

//   // ? // part of solution 2
//   // const [b, _setB] = useState('')
//   // const bRef = useRef(b);
//   // const setB = (data: any) => {
//   //     bRef.current = data
//   //     _setB(data)
//   // }

//   // const ref = useRef(null)
//   // console.log(validKeys)
//   // useLog(b)

//   useEffect(() => {
//     // console.log(b)

//     // prevent from over filling the guess
//     if (b.length <= gameState.word.length) {
//       dispatch({
//         type: Actions.SET_GUESS,
//         data: {
//           guess: b,
//         },
//       });
//     } else {
//       setB((b) => b.split("").slice(0, gameState.word.length).join(""));
//     }
//   }, [b, gameState.word, dispatch]);

//   useLog(gameState.guess);

//   useEffect(() => {
//     // console.log(document)

//     const a = (event: KeyboardEvent) => {
//       // why?
//       // see https://stackoverflow.com/questions/55265255/react-usestate-hook-event-handler-using-initial-state

//       // ? Solution 1
//       if (validKeys.includes(event.key)) {
//         handleClick(event.key);
//       }

//       // ? // solution 2
//       // if (validKeys.includes(event.key)) {
//       //     if (event.key === 'Backspace') {
//       //         setB(bRef.current.split('').slice(0, bRef.current.length - 1).join(''))
//       //         return
//       //     }
//       //     setB(bRef.current + event.key)
//       // }
//     };
//     document.addEventListener("keydown", a);

//     return () => {
//       console.info("unmounting");
//       document.removeEventListener("keydown", a);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleClick = (key: string) => {
//     if (gameState.isCorrect || gameState.numberOfTry >= gameState.tryLimit) {
//       setB("");
//       console.log("hey");

//       return;
//     }

//     if (key === "Backspace") {
//       setB((b: string) =>
//         b
//           .split("")
//           .slice(0, b.length - 1)
//           .join("")
//       );
//       return;
//     }

//     if (key === "Enter") {
//       // submit guess value for checking
//       setUserHasPressEnter((e) => true);
//       return;
//     }

//     // if (gameState.guess.length === gameState.word.length) {
//     //     // prevent over word
//     //     console.log('h')
//     //     return
//     // }

//     if (validKeys.includes(key)) {
//       setB((b) => b + key.toUpperCase());
//     }
//   };
