import React from "react";
import { LETTER_STATUS, Result } from "../lib/types";
import GuessLetter from "./GuessLetter";

function Guess({
  guess = [],
  placeholder = false,
  children,
}: {
  guess?: Result[] | string[];
  placeholder?: boolean;
  children?: any;
}) {
  return (
    <div className="guess flex justify-center">
      {children
        ? children
        : !placeholder
        ? (guess as Result[]).map((letter, i) => {
            return (
              <GuessLetter
                key={i}
                letter={letter}
                placeholder={placeholder}
                delay={i * 500}
              />
            );
          })
        : guess.map((letter, i) => {
            return (
              <GuessLetter
                key={i}
                letter={{ letter: "1", status: LETTER_STATUS.DEFAULT }}
                placeholder={placeholder}
              />
            );
          })}
    </div>
  );
}

export default Guess;
