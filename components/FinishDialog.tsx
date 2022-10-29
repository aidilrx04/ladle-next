import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { GameContext } from "../contexts/GameContext";
import { Actions } from "../contexts/gameStateReducer";
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { getGameStats, getWord } from "../lib/utils";

export default function FinishDialog({ openDialog = false }) {
  const [open, setOpen] = useState(openDialog);
  const { gameState, dispatch } = useContext(GameContext);
  const [disable, setDisable] = useState(gameState.getNextWord);

  useEffect(() => {
    setDisable(gameState.getNextWord);
  }, [gameState.getNextWord]);
  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  const handleNext = async () => {
    if (disable) return;
    setDisable(true);

    dispatch({
      type: Actions.SET_GET_NEXT_WORD,
      data: {
        getNextWord: true,
      },
    });

    // const word = await getWord();
    // console.log(word);

    // dispatch({
    //   type: Actions.RESET_FOR_NEXT_WORD,
    // });
    // dispatch({
    //   type: Actions.SET_WORD,
    //   data: {
    //     word: word.text,
    //   },
    // });
    setDisable(false);
  };

  const handleRetry = () => {
    if (disable) return;

    dispatch({
      type: Actions.SET_RETRY_GAME,
      data: {
        retryGame: true,
      },
    });
  };

  const handleClose = () => {
    if (disable) return;

    setDisable(true);
    dispatch({
      type: Actions.SET_SHOW_FINISH_DIALOG,
      data: {
        showFinishDialog: false,
      },
    });
    setDisable(false);
  };

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={gameState.showFinishDialog} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={handleClose}
      >
        {/* <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" /> 
          <div></div>
        </Transition.Child> */}

        <div className="fixed inset-0 z-10 overflow-y-auto bg-white text-black">
          <div className="flex min-h-full items-center justify-center p-4 text-center ">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 "
              enterTo="opacity-100 translate-y-0 "
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 "
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="relative min-w-[350px] transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="bg-white">
                  <Dialog.Title className="px-3 py-2">
                    {/* {gameState.isCorrect ? "Correct!" : "Game Over 😞"} */}
                    <div className="flex items-center justify-end">
                      <button
                        disabled={disable}
                        onClick={handleClose}
                        className="m-1 
                        rounded-full
                        outline-8 outline-gray-100 transition-all hover:bg-gray-100
                        hover:outline
                        "
                      >
                        <XMarkIcon height={20} />
                      </button>
                    </div>
                  </Dialog.Title>

                  <div className="description">
                    {gameState.isCorrect ? (
                      <>
                        <div className="p-2 px-3 pb-10">
                          <div className="statisticc">
                            <DialogWordStat word={gameState.word} />
                            <div className="stats mt-2 border-t">
                              <div className="text-md text-center uppercase">
                                Statistik
                              </div>
                              <div className="stats-content flex items-center justify-center">
                                <Stat
                                  value={gameState.numberOfTry}
                                  label="Jumlah Cubaan"
                                />
                                <Stat value={gameState.score} label="Skor" />
                                <Stat
                                  value={gameState.gameStats.bestScore}
                                  label="Skor Tertinggi"
                                />
                              </div>
                            </div>
                          </div>
                          <FindWordMeaning word={gameState.word} />
                        </div>
                        <hr />
                        <div className="dialog-footer flex items-center justify-end p-3">
                          <button
                            disabled={disable}
                            onClick={handleClose}
                            className="
                          mx-1 flex items-center justify-center rounded bg-blue-600 px-3 py-2 uppercase text-white
                          hover:brightness-95
                          active:scale-95
                          "
                          >
                            <XMarkIcon height={20} />
                            <span className="mx-1">TUTUP</span>
                          </button>
                          <button
                            disabled={disable}
                            onClick={handleNext}
                            className="
                          mx-1 flex items-center justify-center rounded bg-green-500 px-3 py-2 uppercase text-white
                          hover:brightness-95
                          active:scale-95
                          "
                          >
                            <span className="mx-1">SETERUSNYA</span>
                            <ChevronRightIcon height={20} />
                          </button>
                        </div>
                      </>
                    ) : (
                      gameState.finishAttempt && (
                        <div className="not-correct">
                          <div className="game-over mx-5 mb-4 rounded text-center text-2xl font-bold uppercase tracking-widest text-red-500 drop-shadow-md">
                            PERMAINAN TAMAT!
                          </div>
                          <hr className="mx-3 mb-2" />
                          <DialogWordStat word={gameState.word} />
                          <hr className="mx-3" />
                          <div className="stats-container my-1">
                            <div className="stats-title text-md text-center uppercase">
                              STATISTIK
                            </div>
                            <div className="stats flex items-center justify-around">
                              <Stat value={gameState.score} label="Skor" />
                              <Stat
                                value={gameState.gameStats.bestScore}
                                label="Skor Tertinggi"
                              />
                            </div>
                          </div>

                          <hr className="mx-3" />
                          <FindWordMeaning word={gameState.word} />
                          <hr className="my-2" />
                          <div className="dialog-footer my-2 flex items-center justify-end px-3 py-2">
                            <button
                              disabled={disable}
                              className="flex items-center justify-center rounded bg-blue-500 py-2 px-3 text-white transition-all hover:brightness-95"
                              onClick={handleRetry}
                            >
                              <ArrowPathIcon height={20} />
                              <span className="mx-1">ULANG SEMULA</span>
                            </button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className=" mx-2 rounded  p-2">
      <div className="mb-1 text-center text-3xl font-semibold">{value}</div>
      <div className=" text-center text-[12px] uppercase text-gray-700">
        {label}
      </div>
    </div>
  );
}

function FindWordMeaning({ word }: { word: string }) {
  return (
    <p className="mt-2 text-center">
      <a
        href={`https://prpm.dbp.gov.my/Cari1?keyword=${word}`}
        target="_blank"
        rel="noreferrer"
        className="text-blue-500 underline outline-none"
      >
        Klik untuk mencari maksud perkataan ini
      </a>
    </p>
  );
}

function DialogWordStat({ word }: { word: string }) {
  return (
    <div className="word mb-5 text-center">
      <small className="m-0 block text-[14px] uppercase">Perkataan</small>
      <div className="m-0 text-2xl font-semibold uppercase tracking-widest text-green-400">
        {word}
      </div>
    </div>
  );
}
