import { useEffect, useMemo, useState } from "react";
import GuessHistory from "../components/GuessHistory2";
import { LETTER_STATUS } from "../lib/types";
import { getWord, useLog } from "../lib/utils";
// import Keyboard from 'react-simple-keyboard'
// // import "react-simple-keyboard/build/css/index.css";

const words = [
  'BEING',
  'About',
  'Alert',
  'Catch',
  'Crime',
  'CCEEC',
  'ab'
]



const Game = ({ word: serverWord }) => {

  const [guess, setGuess] = useState('');
  const [word, setWord] = useState('')
  const [guessHistory, setGuessHistory] = useState<object[][]>([])
  const [numOfTry, setNumOfTry] = useState(0)
  const tryLimit = 6;
  const [isCorrectlyGuessed, setIsCorrectlyGuessed] = useState(false);
  const [score, setScore] = useState(0)
  const [hasIncScore, setHasIncScore] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const gh = useMemo(() => guessHistory, [guessHistory])

  // //keyboard
  // const [input, setInput] = useState("");
  // const [layout, setLayout] = useState("default");
  // const keyboard = useRef();

  // const onChange = input => {
  //   setInput(input);
  //   console.log("Input changed", input);
  // };

  // const handleShift = () => {
  //   const newLayoutName = layout === "default" ? "shift" : "default";
  //   setLayout(newLayoutName);
  // };

  // const onKeyPress = button => {
  //   console.log("Button pressed", button);

  //   /**
  //    * If you want to handle the shift and caps lock buttons
  //    */
  //   if (button === "{shift}" || button === "{lock}") handleShift();
  // };

  // const onChangeInput = event => {
  //   const input = event.target.value;
  //   setInput(input);
  //   keyboard.current.setInput(input);
  // };

  useLog(guess)
  useLog(guessHistory)
  useEffect(() => {
    // on start
    setWord(serverWord.text.toUpperCase())
    console.log(serverWord)
    // setWord(words[Math.floor(Math.random() * words.length)].toUpperCase())
    // getWord()
    // console.log(serverWord)
  }, [])

  useEffect(() => {
    if (isCorrectlyGuessed && !hasIncScore) {
      setHasIncScore(true)
      setScore(score + 1)
    }
  }, [isCorrectlyGuessed, score, hasIncScore])

  useEffect(() => {
    console.log(numOfTry, isCorrectlyGuessed)

    if (numOfTry === tryLimit && !isCorrectlyGuessed) {
      // console.log('limit reached')      
      setIsGameOver(true)
      // alert('limit reached')
    }
  }, [numOfTry, tryLimit, isCorrectlyGuessed])

  const handleSubmit = (e) => {
    e.preventDefault();

    if (guess.length !== word.length) {
      alert('please fill all the shit')
      return;
    }

    let result: { letter: string, status: LETTER_STATUS }[] = []

    console.log(numOfTry)

    setNumOfTry(numOfTry + 1)
    // setGuessHistory([...guessHistory, guess])
    if (word === guess) {
      console.log('Correct')
      for (let letter of guess) {
        result.push({
          letter,
          status: LETTER_STATUS.CORRECT
        })
      }
      setIsCorrectlyGuessed(true)
    }

    else {

      // guess is not correct
      // need to find letter that are correct/misplaced


      const wordLetters = word.split('');
      const guessLetters = guess.split('');
      const letterIndex: any = {}
      const takenIndex: any = {}

      wordLetters.forEach((l, i) => {
        letterIndex[l] = letterIndex[l] ? [...letterIndex[l], i] : [i]
        takenIndex[l] = []
      })


      // console.log(letterIndex)
      // console.log(takenIndex)

      for (let i = 0, letter; i < guessLetters.length; i++) {
        letter = guessLetters[i]
        console.log(letter)
        if (wordLetters.includes(letter)) {
          // letter might be correctly placed or misplace

          // get index
          let l = takenIndex[letter].length > 0 ? takenIndex[letter][takenIndex[letter].length - 1] + 1 : 0;

          // console.log(wordLetters.indexOf(letter))
          const lIndex = wordLetters.indexOf(letter, l)
          if (lIndex >= 0) {
            // console.log('found shit')
            takenIndex[letter].push(lIndex)

            if (lIndex === i) {
              // means correct place
              result.push({
                letter,
                status: LETTER_STATUS.CORRECT
              })
            }
            else {
              // misplaces
              result.push({
                letter,
                status: LETTER_STATUS.MISPLACED
              })
            }

          }
          else {
            // console.log('not found T_T')
            result.push({
              letter,
              status: LETTER_STATUS.INCORRECT
            })
          }

        }
        else {
          result.push({
            letter,
            status: LETTER_STATUS.INCORRECT
          })
        }
      }

      // console.log('Incorrect')
      // for (let letter of guess) {
      //   userResult.push({
      //     letter,
      //     status: LETTER_STATUS.INCORRECT
      //   })
      // }
    }
    // console.log(userResult)
    // guessHistory.push(userResult)
    setGuessHistory([...guessHistory, result])
  }

  const goToNextWord = async (e) => {

    e.preventDefault()
    e.target.disabled = true
    const newWord = await getWord();
    console.log(newWord)
    setWord(newWord.text.toUpperCase())
    setGuess('')
    setGuessHistory([])
    setIsCorrectlyGuessed(false)
    setNumOfTry(0)
    setHasIncScore(false)

    e.target.disabled = false
  }
  return (
    <div className="app">
      <h1>Guessing Game</h1>

      <p>
        Score: {score}
      </p>

      <GuessHistory guessHistory={gh} tryLimit={tryLimit} word={word} />

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter your guess" value={guess} onChange={(e) => setGuess(e.target.value.toUpperCase())} disabled={numOfTry === tryLimit || isCorrectlyGuessed} />
      </form>
      <button style={{ display: isCorrectlyGuessed ? 'block' : 'none' }} onClick={goToNextWord}>
        Next
      </button>

      {/* <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
      />
      <Keyboard
        keyboardRef={r => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        layout={
          {
            'default': [
              ' q w e r t y u i o p - ',
              ' a s d f g h j k l {enter}',
              ' z x c v b n m    ',
              '{space}'
            ]
          }
        }
      /> */}

      {isGameOver && <h2>Game OVER!</h2>}
    </div >
  )
}


export default Game;

export const getServerSideProps = async () => {
  const word = await getWord()
  // console.log(word)

  return {
    props: {
      word
    }
  }
}




