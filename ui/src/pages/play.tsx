import { SearchDropdown } from "../components/search-dropdown";

import { useQuery } from "@tanstack/react-query";
import { api, Movie } from "../api";
import { useState } from "react";

export const Play = () => {
  const {
    isLoading,
    error,
    data: movies,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: api().movies,
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred</div>;
  if (!movies) {
    throw new Error();
  }

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="w-[512px] h-[512px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/25/Blisk-logo-512-512-background-transparent.png')]"></div>
        {selectedMovie && <img src={selectedMovie.posterUrl} />}
        {selectedMovie && <div>{selectedMovie.posterUrl} </div>}
        <SearchDropdown
          movies={movies}
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
        />
      </div>
    </div>
  );
};
