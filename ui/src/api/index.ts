export type TmdbId = number;

export type Movie = {
  id: TmdbId;
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
        id: 2,
        title: "Mission Impossible",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221115230900_00000_mission_impossible_When_an_IMF_mission_ends_badly_the_world_is_faced_with_dire_consequences_As_Ethan_Hunt_takes_it_upon_himself_to_fulfill_his_original_briefing.png",
      },
      {
        id: 3,
        title: "Titanic",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002140_00000_titanic_van_gogh_style.png",
      },
      {
        id: 4,
        title: "The Lion King",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002705_00000_the_lion_king_baroque_style.png",
      },
      {
        id: 5,
        title: "Spider Man",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002705_00001_spider_man_classicism.png",
      },
      {
        id: 6,
        title: "Iron Man",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002931_00000_man_in_iron_suit_expressionism.png",
      },
      {
        id: 7,
        title: "Mary Poppins",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116022600_00000_lady_with_an_umbrella_in_space_trending_on_artstation.png",
      },
      {
        id: 8,
        title: "Black Adam",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/blackadamtest.jpeg",
      },
    ];
  }

  return { movies };
}
