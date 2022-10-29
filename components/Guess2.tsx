import { useEffect } from "react";
import GuessLetter from "./GuessLetter2";

export default function Guess({ guess, placeholder = false }) {
    // useEffect(() => {
    //     // console.log(guess)
    // }, [])
    // console.log('placegolder', placholder)
    return <div key={Math.random()} className="guess">
        {placeholder === false
            ? guess.map(l => (
                <GuessLetter key={Math.random()} letter={l} />
            ))
            : guess.split('').map(() => (
                <GuessLetter key={Math.random()} letter={'0'} placeholder />
            ))}
    </div>;
}


