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
      {
        title: "Curious George",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116023343_00000_a_painting_of_a_monkey_in_a_business_suit.png",
      },
      {
        title: "Goodfellas",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116213906_00003_goodfellas.png",
      },
      {
        title: "Aquaman",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116213906_00000_aquaman.png",
      },
      {
        title: "Star Wars: A New Hope",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00000_star_wars_a_new_hope_impresssionism.png",
      },
      {
        title: "La La Land",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00002_la_la_land_abstractmovie_spaceballs.png",
      },
      {
        title: "Avengers: Age of Ultron",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00001_avengers_age_of_ultron.png",
      },
      {
        title: "V For Vendetta",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00003_v_for_vendetta_movie.png",
      },
      {
        title: "Interstellar",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00004_interstellar_the_movie.png",
      },
      {
        title: "Inception",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00005_inception_the_movie.png",
      },
      {
        title: "Resident Evil",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00006_resident_evil_movie.png",
      },
      {
        title: "High School Musical",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00007_high_school_musical_the_movie.png",
      },
      {
        title: "Charlie and the Chocolate Factory",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116215811_00008_charlie_and_the_chocolate_factory_the_movie.png",
      },
      {
        title: "Cars",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00000_Cars__disney_movie.png",
      },
      {
        title: "Sleeping Beauty",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00001_encanto_disney_movie.png",
      },
      {
        title: "Toy Story",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00002_toy_story_disney_movie.png",
      },
      {
        title: "Transformers",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00003_transformers_movie.png",
      },
      {
        title: "Die Hard with A Vengence",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00004_die_hard_movie.png",
      },
      {
        title: "Skyfall",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00005__skyfall_movie.png",
      },
      {
        title: "Spaceballs",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221632_00006_spaceballs_movie.png",
      },
      {
        title: "Moana",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221923_00000_moana_movie.png",
      },
      {
        title: "Tangled",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221923_00002_tangled_movie.png",
      },
      {
        title: "The Barbie Movie",
        posterUrl:
          "https://pictionarai.s3.amazonaws.com/img/20221116221923_00003_barbie_movie.png",
      },
    ];

    return movies.map((movie, id) => ({ id, ...movie }));
  }

  return { movies };
}
