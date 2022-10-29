import Guess from "./Guess2";


export default function GuessHistory({ guessHistory, tryLimit, word }) {
    return (
        <div className="user-guesses">
            {guessHistory.map(guess => {
                // console.log(guess)
                return (
                    <Guess guess={guess} key={Math.random()} />
                );
            })}
            {Array(tryLimit - guessHistory.length < 0
                ? 0
                : tryLimit - guessHistory.length)
                .fill(0)
                .map((_) => {
                    return (
                        <Guess placeholder key={Math.random()} guess={'*'.repeat(word.length)} />
                        // <div key={Math.random()} className="guess guess-placeholder">
                        //     {Array(word.length).fill(0).map(_ => {
                        //         return (
                        //             <span key={Math.random()} className="guess-letter .guess-letter-placeholder" style={{
                        //                 background: 'grey',
                        //                 display: 'inline-block',
                        //                 margin: '5px',
                        //                 width: 50,
                        //                 height: 75
                        //             }}>
                        //             </span>
                        //         );
                        //     })}
                        // </div>
                    );
                })}
        </div>
    );
}

