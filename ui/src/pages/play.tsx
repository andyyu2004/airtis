import { SearchDropdown } from "../components/search-dropdown";

import { useQuery } from "@tanstack/react-query";
import { api, Movie, TmdbId } from "../api";
import { useState } from "react";

export type RoundProps = {
  movies: Movie[];
  targetMovieIdx: number;
};

export const Round = ({ movies, targetMovieIdx }: RoundProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const targetMovie = movies[targetMovieIdx];
  console.log(targetMovie);

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="w-[512px] h-[512px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/25/Blisk-logo-512-512-background-transparent.png')]"></div>
        {<img src={targetMovie.posterUrl} />}
        {<div>{targetMovie.posterUrl} </div>}
        <SearchDropdown
          movies={movies}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
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
