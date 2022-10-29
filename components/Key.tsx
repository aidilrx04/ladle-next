import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "../contexts/GameContext";
import { LETTER_STATUS } from "../lib/types";
import { useLog } from "../lib/utils";
import { classNames } from "./MenuDropdown";

export const Key = ({
  value,
  handleClick,
  status = LETTER_STATUS.DEFAULT,
  ...rest
}) => {
  // console.log(value, value === "Enter");
  // console.log(value, value === "Backspace");
  const [keyStatus, setKeyStatus] = useState(status);

  useEffect(() => {
    return () => {
      setKeyStatus(LETTER_STATUS.DEFAULT);
    };
  }, []);

  useEffect(() => {
    setKeyStatus(status);
  }, [status]);
  // useLog(status);
  return (
    <button
      className={classNames(
        `m-0 flex h-12 flex-shrink items-center justify-center rounded border border-gray-200 bg-white text-xs
        shadow-md
        outline-none
        transition-all 
        active:scale-95
        disabled:hover:scale-100 
        sm:rounded-lg 
        sm:font-bold
        md:my-1
        md:mx-[.2rem]
        md:h-16
        md:text-lg
        `,
        value === "Enter" || value === "Backspace" ? "w-24" : "w-14",
        keyStatus !== LETTER_STATUS.DEFAULT
          ? "text-white hover:brightness-110 disabled:hover:bg-inherit"
          : false,
        keyStatus === LETTER_STATUS.CORRECT ? "bg-green-400" : false,
        keyStatus === LETTER_STATUS.MISPLACED ? "bg-yellow-400" : false,
        keyStatus === LETTER_STATUS.INCORRECT ? "bg-gray-400" : false,
        keyStatus === LETTER_STATUS.DEFAULT
          ? "bg-white hover:bg-gray-100 disabled:hover:bg-white"
          : false
      )}
      // disabled
      key={value}
      onClick={() => {
        handleClick(value);
      }}
      {...rest}
    >
      {/* <span
        className={classNames(
          value === "Enter" ? "mx-2" : false,
          value === "Backspace" ? "mx-2" : false
        )}
      > */}
      {value === "Backspace"
        ? "Delete"
        : value === "Enter"
        ? "Enter"
        : value.toUpperCase()}
      {/* </span> */}
    </button>
  );
};
