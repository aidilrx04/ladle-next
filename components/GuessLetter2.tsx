import { LETTER_STATUS } from "../lib/types";

export default function GuessLetter({ letter, placeholder = false }) {
    return <span key={Math.random()} className="guess-letter" style={{
        background: placeholder
            ? 'grey'
            : letter.status === LETTER_STATUS.CORRECT
                ? 'green'
                : letter.status === LETTER_STATUS.MISPLACED
                    ? 'yellow'
                    : 'grey',
        display: 'inline-block',
        margin: '5px',
        width: 50,
        height: 75
    }}>
        <span>
            {!placeholder ? letter.letter : '0'}
        </span>
    </span>;
}