import { SearchDropdown } from "../components/search-dropdown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GameSpec, RoundSpec } from "../state";
import { useQuery } from "@tanstack/react-query";
import { api, Movie } from "../api";
import { Fragment, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { useTimer } from "react-timer-hook";
import { Dialog, Transition } from "@headlessui/react";

export type RoundProps = {
  movies: Movie[];
  roundSpec: RoundSpec;
  roundNumber: number;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setCorrectGuesses: React.Dispatch<React.SetStateAction<number>>;
};

type RoundResult = "correct" | "incorrect" | "timeout";

export const Round = ({
  movies,
  roundSpec,
  roundNumber,
  setRound,
  setScore,
  setCorrectGuesses,
}: RoundProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const targetMovie = movies.find(m => m.id === roundSpec.targetMovieId)!;
  const [showPopup, setShowPopup] = useState(false);
  const [roundResult, setRoundResult] = useState("incorrect");

  const timeoutSeconds = import.meta.env.DEV ? 8000 : 20000;

  const { seconds, pause } = useTimer({
    autoStart: true,
    expiryTimestamp: new Date(Date.now() + timeoutSeconds),
    onExpire: checkResult,
  });

  function checkResult() {
    // if no movie selected (due to timeout) it will be a lose
    const result = selectedMovie?.id === targetMovie.id ? "win" : "lose";
    pause();
    if (result === "win") {
      // FIXME naive score computation: lose one point for every second used
      setScore(score => score + (timeoutSeconds / 1000 - seconds));
      setCorrectGuesses(correctGuesses => correctGuesses + 1);
      setRoundResult("correct");
    } else if (selectedMovie) {
      setRoundResult("incorrect");
    } else {
      setRoundResult("timeout");
    }
    setSelectedMovie(null);

    // last round don't need to show popup
    if (roundNumber < NUM_ROUNDS) {
      setShowPopup(true);
    }
  }

  const closeModal = () => {
    setShowPopup(false);
  };

  // the idea of this calculation is to get less blurry as time ticks down becoming fully unblurry when 1/3 of the time is left
  const blurMultiplier =
    Math.max(seconds * 1000 - timeoutSeconds / 3, 0) / timeoutSeconds;

  const goToNextRound = () => {
    closeModal();
    // advance to next round
    setRound(round => round + 1);
  };

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>Time: {seconds}</div>
        {/* <div className="w-[512px] h-[512px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/25/Blisk-logo-512-512-background-transparent.png')]"></div> */}
        <div>
          <img
            className="w-[512px] h-[512px]"
            src={targetMovie.posterUrl}
            style={{ filter: `blur(${30 * blurMultiplier}px)` }}
          />
        </div>
        {/* {<div>{targetMovie.posterUrl} </div>} */}
        <SearchDropdown
          movies={movies}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
        <div className="flex justify-end">
          <button
            disabled={selectedMovie == null}
            onClick={checkResult}
            className="p-2 w-32 text-white font-bold cursor-pointer rounded bg-blue-700 hover:bg-blue-600 disabled:bg-slate-400"
          >
            Submit
          </button>
        </div>
      </div>
      {showPopup && (
        <Transition appear show={showPopup} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={() => {}}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      {roundResult === "correct"
                        ? "You are correct!"
                        : roundResult === "incorrect"
                        ? `Not quite! The right answer was ${targetMovie.title}`
                        : `Time's up! The right answer was ${targetMovie.title}`}
                    </Dialog.Title>

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={goToNextRound}
                      >
                        {`Got it, Go to ${
                          roundNumber === NUM_ROUNDS - 1
                            ? "result"
                            : "next round"
                        }`}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </div>
  );
};

export const Play = ({
  movies,
  gameSpec,
}: {
  gameSpec: GameSpec;
  movies: Movie[];
}) => {
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [correctGuesses, setCorrectGuesses] = useState(0);

  const ref = useRef<Countdown>(null);
  const countdownSeconds = import.meta.env.DEV ? 800 : 3000;

  const [until, setUntil] = useState(Date.now() + countdownSeconds);

  useEffect(() => {
    setUntil(Date.now() + countdownSeconds);
    // doesn't autostart a second time without this explicit call for some reason
    ref.current?.start();
  }, [round]);

  return (
    <Countdown autoStart date={until} ref={ref} className="text-6xl">
      <div className="space-y-2">
        {round < gameSpec.rounds.length ? (
          <>
            <div className="text-3xl">
              Round <span className="font-semibold">{round + 1}</span>
            </div>
            <div className="text-2xl">
              Score <span className="font-medium">{score}</span>
            </div>
            <Round
              roundNumber={round}
              movies={movies}
              setRound={setRound}
              roundSpec={gameSpec.rounds[round]}
              setScore={setScore}
              setCorrectGuesses={setCorrectGuesses}
            />
          </>
        ) : (
          <Navigate
            to="/result"
            state={{ score, correctGuesses, numRounds: NUM_ROUNDS }}
          />
        )}
      </div>
    </Countdown>
  );
};

const NUM_ROUNDS = 7;

function generateGameSpec(movies: Movie[]): GameSpec {
  if (movies.length < NUM_ROUNDS) {
    throw new Error("Not enough movies");
  }

  const rounds: RoundSpec[] = [];
  while (rounds.length < NUM_ROUNDS) {
    const targetMovieId = movies[Math.floor(Math.random() * movies.length)].id;
    if (rounds.find(r => r.targetMovieId === targetMovieId)) {
      continue;
    }
    rounds.push({ targetMovieId });
  }

  return { rounds };
}

export const Game = () => {
  const {
    isLoading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: api().movies,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (!movies) {
    throw new Error();
  }

  const gameSpec = generateGameSpec(movies);

  return (
    <>
      {movies.map(movie => (
        // hack to make all the images for the game preload in cache
        // otherwise loading next round is slow
        <img key={movie.id} style={{ display: "none" }} src={movie.posterUrl} />
      ))}
      <Play movies={movies} gameSpec={gameSpec} />
    </>
  );
};
