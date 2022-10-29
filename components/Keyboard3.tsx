import React, { useEffect, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";

function OnScreenKeyboard() {
  const keyboard = useRef(null);

  const [userGuess, setUserGuess] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleKeyPress = (btn) => {
    console.log(btn);

    // keyboard.current.setInput(inputRef.current)
    // console.log(keyboard)
    console.log(inputRef.current);
  };

  return (
    <div>
      <input
        ref={inputRef}
        name="text"
        placeholder="Enter guess"
        onChange={(e) => {
          //   keyboard.current.setInput(e.target.value);
        }}
      />
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layout={{
          default: [
            "qwertyuiop".split("").join(" "),
            "asdfghjkl".split("").join(" "),
            `{enter} ${"zxcvbnm".toUpperCase().split("").join(" ")} {bksp}`,
          ],
        }}
        display={{
          "{bksp}": "Delete",
          "{enter}": "Enter",
        }}
        theme={"hg-theme-default"}
        debug={true}
        onKeyPress={handleKeyPress}
        onChange={(e) => {
          console.log("CHANGED: ", e);
        }}
        buttonAttributes={[
          {
            buttons: "b B",
            value: "B",
            attribute: "BITCH",
          },
        ]}
        useButtonTag
        physicalKeyboardHighlight
        physicalKeyboardHighlightBgColor="black"
        physicalKeyboardHighlightTextColor="blue"
      />
    </div>
  );
}

export default OnScreenKeyboard;
