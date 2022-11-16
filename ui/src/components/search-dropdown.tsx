import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { Movie } from "../api";

type Props = {
  movies: Movie[];
};

export function SearchDropdown({ movies }: Props) {
  const [selectedMovie, setSelectedMovie] = useState();
  const [query, setQuery] = useState("");

  const filteredMovies =
    query === ""
      ? []
      : movies.filter((movie) => {
          return movie.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedMovie} onChange={setSelectedMovie}>
      <Combobox.Input
        className=" py-2 px-3 text-sm leading-5 focus:ring-0 h-10 w-full rounded border border-gray-300"
        onChange={(event) => setQuery(event.target.value)}
      />
      <Combobox.Options>
        {filteredMovies.map((movie) => (
          <Combobox.Option key={movie.tmdbId} value={movie.title}>
            {movie.title}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
