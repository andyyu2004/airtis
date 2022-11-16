export type TmdbId = number;

export type Movie = {
  tmdbId: TmdbId;
  title: string;
  posterUrl: string;
};

export interface API {
  movies(): Promise<Movie[]>;
}

export function api(): API {
  return makeMockAPI();
}

function makeMockAPI(): API {
  async function movies(): Promise<Movie[]> {
    return [
      {
        tmdbId: 603,
        title: "The Matrix",
        posterUrl: "https://www.pngmart.com/files/22/Matrix-Movie-PNG-HD.png",
      },
      {
        tmdbId: 436270,
        title: "Black Adam",
        posterUrl:
          "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c194a240-b488-4bed-a003-f8faf99de199/de3thjp-4fe6edbe-57ec-4a12-9217-571df851bd53.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2MxOTRhMjQwLWI0ODgtNGJlZC1hMDAzLWY4ZmFmOTlkZTE5OVwvZGUzdGhqcC00ZmU2ZWRiZS01N2VjLTRhMTItOTIxNy01NzFkZjg1MWJkNTMucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.bzJ3s85PzeTxq0j9Wl_htHjvie8jW1kNfqNoN_lrZ-E",
      },
      {
        tmdbId: 420818,
        title: "The Lion King",
        posterUrl:
          "https://drive.google.com/file/d/10cyMruJkrZg-Ju2SObO5RQCjmJBXfe5d/view?ts=637434c0",
      },
    ];
  }

  return { movies };
}
