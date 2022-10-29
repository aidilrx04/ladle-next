import {
  useContext,
  useEffect,
  SyntheticEvent,
  MouseEvent,
  MouseEventHandler,
  useState,
} from "react";
import GuessHistory from "../components/GuessHistory";
import InputForm from "../components/InputForm";
import OnScreenKeyboard from "../components/Keyboard3";
import Keyboard from "../components/Keyboard";
import ScoreCounter from "../components/ScoreCounter";
import { GameContext, GameProvider } from "../contexts/GameContext";
import { Actions } from "../contexts/gameStateReducer";
import { getWord } from "../lib/utils";
import FinishDialog from "../components/FinishDialog";
import Footer from "../components/Footer";

const Game = ({ word }) => {
  return (
    <div>
      <GameProvider>
        <GameContent word={word} />
      </GameProvider>
    </div>
  );
};

const GameContent = ({ word }) => {
  const { gameState, dispatch } = useContext(GameContext);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // first time loaded
    // console.log(word);
    dispatch({
      type: Actions.SET_WORD,
      data: { word: word.text },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps

    // return () => {
    //   // resetting evverything
    //   console.log("cleaning up");
    //   dispatch({
    //     type: Actions.RESET_STATE,
    //   });
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    // return () => {
    //   dispatch({
    //     type: Actions.RESET_STATE,
    //   });
    // };
  }, [dispatch]);

  const openDialog = () => {
    dispatch({
      type: Actions.SET_SHOW_FINISH_DIALOG,
      data: {
        showFinishDialog: true,
      },
    });
  };

  // useEffect(() => {
  //     console.log(gameState.guess)
  // }, [gameState.guess])

  return (
    <div id="game" className="relative mt-2">
      {/* <button onClick={openDialog}>Open dialog</button> */}
      <FinishDialog openDialog={open} />
      {/* <ScoreCounter /> */}
      <GuessHistory />
      <div className="my-1 flex h-10 items-center justify-center ">
        {gameState.finishAttempt && (
          <button
            onClick={openDialog}
            className={`h-full rounded bg-${
              gameState.isCorrect ? "green-500" : "blue-600"
            }
            px-3 text-white
            hover:brightness-95
            `}
          >
            {gameState.isCorrect ? "SETERUSNYA" : "ULANG SEMULA"}
          </button>
        )}
      </div>
      {/* <InputForm /> */}
      {/* <OnScreenKeyboard /> */}
      <Keyboard />
      <Footer />
      {/* {gameState.finishAttempt && <NextDialog />} */}
    </div>
  );
};

function NextDialog() {
  const { gameState, dispatch } = useContext(GameContext);

  const handleClick = async (e: SyntheticEvent) => {
    e.preventDefault();
    // e.target.disabled = true;
    console.log("fetching next word");

    const word = await getWord();
    console.log(word);

    dispatch({
      type: Actions.RESET_FOR_NEXT_WORD,
    });
    dispatch({
      type: Actions.SET_WORD,
      data: {
        word: word.text,
      },
    });

    // e.target.disabled = true;
  };
  return <button onClick={handleClick}>Next</button>;
}

export const getServerSideProps = async () => {
  const word = await getWord();

  return {
    props: {
      word,
    },
  };
};

export default Game;
