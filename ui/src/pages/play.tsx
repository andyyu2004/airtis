import { SearchDropdown } from "../components/search-dropdown";

import { useQuery } from "@tanstack/react-query";
import { api } from "../api";

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

  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="w-[512px] h-[512px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/25/Blisk-logo-512-512-background-transparent.png')]"></div>
        <SearchDropdown movies={movies} />
      </div>
    </div>
  );
};
