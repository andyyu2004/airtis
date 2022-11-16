import { useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { Movie } from "../api";

type Props = {
  movies: Movie[];
  selectedMovie?: Movie | null;
  setSelectedMovie: React.Dispatch<Movie>;
};

// To add some noise to the completion
// https://gist.githubusercontent.com/tiangechen/b68782efa49a16edaf07dc2cdaa855ea/raw/0c794a9717f18b094eabab2cd6a6b9a226903577/movies.csv
const dummyMovies: Movie[] = [
  "Top Gun",
  "27 Dresses",
  "(500) Days of Summer",
  "Across the Universe",
  "A Dangerous Method",
  "A Serious Man",
  "Beginners",
  "Dear John",
  "Enchanted",
  "Film",
  "Fireproof",
  "Four Christmases",
  "Ghosts of Girlfriends Past",
  "Gnomeo and Juliet",
  "Going the Distance",
  "Good Luck Chuck",
  "He's Just Not That Into You",
  "High School Musical 3: Senior Year",
  "I Love You Phillip Morris",
  "It's Complicated",
  "Jane Eyre",
  "Just Wright",
  "Killers",
  "Knocked Up",
  "Leap Year",
  "Letters to Juliet",
  "License to Wed",
  "Life as We Know It",
  "Love Happens",
  "Love & Other Drugs",
  "Made of Honor",
  "Mamma Mia!",
  "Marley and Me",
  "Midnight in Paris",
  "Miss Pettigrew Lives for a Day",
  "Monte Carlo",
  "Music and Lyrics",
  "My Week with Marilyn",
  "New Year's Eve",
  "Nick and Norah's Infinite Playlist",
  "No Reservations",
  "Not Easily Broken",
  "One Day",
  "Our Family Wedding",
  "Over Her Dead Body",
  "Penelope",
  "P.S. I Love You",
  "Rachel Getting Married",
  "Remember Me",
  "Sex and the City",
  "Sex and the City 2",
  "Sex and the City Two",
  "She's Out of My League",
  "Something Borrowed",
  "Tangled",
  "The Back-up Plan",
  "The Curious Case of Benjamin Button",
  "The Duchess",
  "The Heartbreak Kid",
  "The Invention of Lying",
  "The Proposal",
  "The Time Traveler's Wife",
  "The Twilight Saga: New Moon",
  "The Ugly Truth",
  "Twilight",
  "Twilight: Breaking Dawn",
  "Tyler Perry's Why Did I get Married",
  "Valentine's Day",
  "Waiting For Forever",
  "Waitress",
  "WALL-E",
  "Water For Elephants",
  "What Happens in Vegas",
  "When in Rome",
  "Youth in Revolt",
  "You Will Meet a Tall Dark Stranger",
  "Zack and Miri Make a Porno",
].map((title, i) => ({
  id: 10000 + i,
  posterUrl: "",
  title,
}));

export function SearchDropdown({
  movies,
  selectedMovie,
  setSelectedMovie,
}: Props) {
  const [query, setQuery] = useState("");

  const MAX_COMPLETIONS = 10;
  const allMovies = [...movies, ...dummyMovies];
  const filteredMovies =
    query === ""
      ? []
      : allMovies
          .filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, MAX_COMPLETIONS);

  return (
    <Combobox value={selectedMovie} onChange={setSelectedMovie}>
      <div className="relative text-left">
        <Combobox.Input
          autoFocus
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
            <Combobox.Options className="absolute mt-1 max-h-36 w-full overflow-auto rounded bg-white  text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredMovies.map(movie => (
                <Combobox.Option
                  className="font-bold bg-gray-400 text-slate-100 cursor-pointer hover:bg-gray-500 hover:text-white p-2"
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
