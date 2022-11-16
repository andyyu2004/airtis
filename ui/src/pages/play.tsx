import { SearchDropdown } from "../components/search-dropdown";
import { useRecoilState, useRecoilValue } from "recoil";
import { roundState, scoreState } from "../state";
import { useQuery } from "@tanstack/react-query";
import { api, Movie } from "../api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export type RoundProps = {
  movies: Movie[];
  targetMovieIdx: number;
};

export const Round = ({ movies, targetMovieIdx }: RoundProps) => {
  const [round, setRound] = useRecoilState(roundState);
  const [score, setScore] = useRecoilState(scoreState);
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const targetMovie = movies[targetMovieIdx];
  console.log(targetMovie);

  const checkResult = () => {
    setRound((round) => round + 1);
    const result = selectedMovie!.id === targetMovie.id ? "win" : "lose";
    if (result === "win") {
      // add 1 score to the result
      setScore((score) => score + 1);
    }
    // navigate("/result", { state: { result } });
  };

  return (
    <div>
      <div className="flex flex-col gap-10">
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

        <button
          disabled={selectedMovie === null}
          onClick={checkResult}
          className="p-2 w-32 text-white font-bold cursor-pointer rounded bg-gray-400 hover:bg-gray-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export const Play = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: api().movies,
  });

  const round = useRecoilValue(roundState);
  const [targetMovieId, setTargetMovieId] = useState(0);

  function changeTarget() {
    setTargetMovieId(Math.floor(Math.random() * (movies?.length ?? 0)));
  }

  useEffect(changeTarget, [movies]);
  const NUM_ROUNDS = 5;
  useEffect(() => {
    changeTarget();
    if (round === NUM_ROUNDS) navigate("/result");
  }, [round]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (!movies) {
    throw new Error();
  }

  console.log("target", targetMovieId);
  return <Round targetMovieIdx={targetMovieId} movies={movies} />;
};
