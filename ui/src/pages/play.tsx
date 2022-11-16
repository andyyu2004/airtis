import { SearchDropdown } from "../components/search-dropdown";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { GameSpec, RoundSpec } from "../state";
import { useQuery } from "@tanstack/react-query";
import { api, Movie } from "../api";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Countdown from "react-countdown";
import { useTimer } from "react-timer-hook";

export type RoundProps = {
  movies: Movie[];
  roundSpec: RoundSpec;
  setRound: React.Dispatch<React.SetStateAction<number>>;
  setScore: React.Dispatch<React.SetStateAction<number>>;
};

export const Round = ({
  movies,
  roundSpec,
  setRound,
  setScore,
}: RoundProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const targetMovie = movies.find(m => m.id === roundSpec.targetMovieId)!;

  const checkResult = () => {
    // advance to next round
    setRound(round => round + 1);
    // if no movie selected (due to timeout) it will be a lose
    const result = selectedMovie?.id === targetMovie.id ? "win" : "lose";
    if (result === "win") {
      // add 1 score to the result
      setScore(score => score + 1);
    }
    setSelectedMovie(null);
  };

  const timeoutSeconds = import.meta.env.DEV ? 5000 : 15000;

  const { seconds } = useTimer({
    autoStart: true,
    expiryTimestamp: new Date(Date.now() + timeoutSeconds),
    onExpire: checkResult,
  });

  return (
    <div>
      <div className="flex flex-col gap-5">
        <div>Time: {seconds}</div>
        {/* <div className="w-[512px] h-[512px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/25/Blisk-logo-512-512-background-transparent.png')]"></div> */}
        <div>
          <img className="w-[512px] h-[512px]" src={targetMovie.posterUrl} />
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

  const ref = useRef<Countdown>(null);
  const countdownSeconds = import.meta.env.DEV ? 800 : 3000;
  console.log(countdownSeconds);

  const [until, setUntil] = useState(Date.now() + countdownSeconds);

  useEffect(() => {
    setUntil(Date.now() + countdownSeconds);
    // doesn't autostart a second time without this explicit call for some reason
    ref.current?.start();
  }, [round]);

  return (
    <Countdown autoStart date={until} ref={ref} className="text-6xl">
      <div className="space-y-2">
        <div className="text-3xl">
          Round <span className="font-semibold">{round + 1}</span>
        </div>
        <div className="text-2xl">
          Score <span className="font-medium">{score}</span>
        </div>
        {round < gameSpec.rounds.length ? (
          <>
            <div>Round {round + 1}</div>
            <div>Score {score}</div>
            <Round
              movies={movies}
              setRound={setRound}
              roundSpec={gameSpec.rounds[round]}
              setScore={setScore}
            />
          </>
        ) : (
          <Navigate to="/result" state={{ score, numRounds: NUM_ROUNDS }} />
        )}
      </div>
    </Countdown>
  );
};

const NUM_ROUNDS = 5;

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
  console.log(gameSpec);

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
