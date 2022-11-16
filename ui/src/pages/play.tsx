import { SearchDropdown } from "../components/search-dropdown";

const Play = () => {
  return (
    <div>
      <div className="flex flex-col gap-10">
        <div className="w-[512px] h-[512px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/2/25/Blisk-logo-512-512-background-transparent.png')]"></div>
        <SearchDropdown />
      </div>
    </div>
  );
};

export default Play;
