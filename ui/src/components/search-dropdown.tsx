import { useRef, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Movie } from "../api";

type Props = {
  movies: Movie[];
  selectedMovie?: Movie | null;
  setSelectedMovie: React.Dispatch<Movie>;
};

// FIXME add some fake movies to the completion bar

export function SearchDropdown({
  movies,
  selectedMovie,
  setSelectedMovie,
}: Props) {
  const [query, setQuery] = useState("");
  const filteredMovies =
    query === ""
      ? []
      : movies.filter(movie => {
          return movie.title.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox value={selectedMovie} onChange={setSelectedMovie}>
      <div className="relative text-left">
        <Combobox.Label className="p-1">Guess the movie:</Combobox.Label>
        <Combobox.Input
          className="py-2 px-3 text-sm leading-5 focus:ring-0 h-10 w-full rounded border border-gray-300"
          onChange={event => setQuery(event.target.value)}
          displayValue={(movie: Movie | undefined) => movie?.title ?? ""}
        />
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          {filteredMovies.length > 0 && (
            <Combobox.Options className="absolute mt-1 max-h-32 w-full overflow-auto rounded bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredMovies.map(movie => (
                <Combobox.Option
                  className="bg-gray-100 cursor-pointer hover:bg-gray-200 p-2"
                  key={movie.id}
                  value={movie}
                >
                  {movie.title}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </Transition>
      </div>
    </Combobox>
  );
}
