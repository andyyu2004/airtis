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
    const movies: { title: string; posterUrl: string }[] = [
      {
        title: "Mission Impossible",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221115230900_00000_mission_impossible_When_an_IMF_mission_ends_badly_the_world_is_faced_with_dire_consequences_As_Ethan_Hunt_takes_it_upon_himself_to_fulfill_his_original_briefing.png",
      },
      {
        title: "Titanic",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002140_00000_titanic_van_gogh_style.png",
      },
      {
        title: "The Lion King",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002705_00000_the_lion_king_baroque_style.png",
      },
      {
        title: "Spider Man",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002705_00001_spider_man_classicism.png",
      },
      {
        title: "Iron Man",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116002931_00000_man_in_iron_suit_expressionism.png",
      },
      {
        title: "Mary Poppins",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116022600_00000_lady_with_an_umbrella_in_space_trending_on_artstation.png",
      },
      {
        title: "Black Adam",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/blackadamtest.jpeg",
      },
      {
        title: "Terrifier",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/terrifiertest.jpeg",
      },
      {
        title: "The Terminator",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/terminator.jpeg",
      },
      {
        title: "Lord of the Rings",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/lotr.jpeg",
      },
      {
        title: "Snow White",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/snowwhite",
      },
      {
        title: "The Godfather",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/godfather",
      },
      {
        title: "Jurassic Park",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/jpark.jpeg",
      },
      {
        title: "Indiana Jones",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/indianajones.jpeg",
      },
      {
        title: "Harry Potter",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/hpandstone.jpeg",
      },
      {
        title: "The Shawshank Redemption",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/shawshank.jpeg",
      },
      {
        title: "Schindler's List",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/schindler.jpeg",
      },
      {
        title: "Batman",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/darkknight2.jpeg",
      },
      {
        title: "Fight Club",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/fightclub.jpeg",
      },
      {
        title: "Pulp Fiction",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/pulp.jpeg",
      },
      {
        title: "Inglorious Basterds",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/basterds.jpeg",
      },
      {
        title: "Forrest Gump",
        posterUrl: "https://pictionarai.s3.amazonaws.com/img/gump.jpeg",
      },
    ];

    return movies.map((movie, id) => ({ id, ...movie }));
  }

  return { movies };
}
