import React, { useCallback, useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { Actions } from "../contexts/gameStateReducer";
import { LETTER_STATUS, Result } from "../lib/types";
import { useLog } from "../lib/utils";
import { classNames } from "./MenuDropdown";

function GuessLetter({
  letter,
  placeholder = false,
  delay = 0,
}: {
  letter: Result;
  placeholder?: boolean;
  delay?: number;
}) {
  const [hasAnimate, setHasAnimate] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const { dispatch: _dispatch } = useContext(GameContext);
  const dispatch = useCallback(_dispatch, [_dispatch]);

  const animationDuration = 250 + delay;
  //   console.log(delay);
  // useLog(delay);
  useEffect(() => {
    const a = setTimeout(() => {
      setHasAnimate(true);
    }, animationDuration);

    return () => {
      clearTimeout(a);
    };
  }, [animationDuration]);
  useEffect(() => {
    const a = setTimeout(() => {
      setShowStatus(true);
      // if (letter.status !== LETTER_STATUS.DEFAULT && !placeholder) {
      //   dispatch({
      //     type: Actions.ADD_CHARS_TO_ATTEMPTED_LETTERS,
      //     data: {
      //       letter: letter.letter,
      //       status: letter.status,
      //     },
      //   });
      // }
    }, delay);

    return () => {
      clearTimeout(a);
    };
  }, [delay]);

  return (
    <span
      style={{
        animationDelay: `${delay}ms`,
      }}
      className={classNames(
        `
        ${!hasAnimate && !placeholder && `animate-bounce-in`}
      guess-letter @l m-0.5 flex h-14 w-14 items-center justify-center rounded border-[3px] border-gray-200 bg-white text-xl 
      font-bold
      transition-colors
        `,
        letter.status === LETTER_STATUS.CORRECT &&
          showStatus &&
          " border-green-500 bg-green-400 text-white",
        letter.status === LETTER_STATUS.INCORRECT &&
          showStatus &&
          !placeholder &&
          " border-gray-500 bg-gray-400 text-white",
        letter.status === LETTER_STATUS.MISPLACED &&
          showStatus &&
          " border-yellow-500 bg-yellow-400 text-white",
        letter.status === LETTER_STATUS.DEFAULT &&
          !placeholder &&
          " border-gray-300 bg-gray-50",
        !placeholder && !showStatus && " border-gray-300 bg-gray-100"
      )} // style={{
      //     background:
      //         placeholder
      //             ? 'grey'
      //             :
      //             letter.status === LETTER_STATUS.INCORRECT
      //                 ? 'grey'
      //                 : letter.status === 'CORRECT'
      //                     ? 'green'
      //                     : letter.status === 'MISPLACED'
      //                         ? 'yellow'
      //                         : 'lightgrey',
      //     display: 'inline-block',
      //     margin: '5px',
      //     width: 55,
      //     height: 55
      // }}
    >
      {!placeholder && letter.letter}
    </span>
  );
}

export default GuessLetter;
