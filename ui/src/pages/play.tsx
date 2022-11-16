import { SearchDropdown } from "../components/search-dropdown";

import { useQuery } from "@tanstack/react-query";
import { api, Movie } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export type RoundProps = {
  movies: Movie[];
  targetMovieIdx: number;
};

export const Round = ({ movies, targetMovieIdx }: RoundProps) => {
  const navigate = useNavigate();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const targetMovie = movies[targetMovieIdx];
  console.log(targetMovie);

  const checkResult = () => {
    const result =
      selectedMovie!.tmdbId === targetMovie.tmdbId ? "win" : "lose";
    navigate("/result", { state: { result } });
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
        {selectedMovie && (
          <button
            onClick={checkResult}
            className="p-2 w-32 text-white font-bold cursor-pointer rounded bg-gray-800 hover:bg-gray-600"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export const Play = () => {
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

  const targetMovieId = Math.floor(Math.random() * movies.length);
  return <Round targetMovieIdx={targetMovieId} movies={movies} />;
};
