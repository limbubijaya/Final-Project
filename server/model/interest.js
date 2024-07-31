const knex = require("../db");
const bcrypt = require("bcrypt");
const genre = "genre";
const game = "game";

class Interest {
  constructor() {
    this.interests = [];
  }
  async getAllInterest() {
    const genreNames = await knex(genre).select("genre_name"); //array
    const gameNames = await knex(game).select("game_name"); //array
    this.interests = genreNames.concat(gameNames);
    return this.interests;
  }
  async searchInterest(word) {
    const genreNames = await knex(genre)
      .select("genre_name")
      .where("genre_name", "like", `%${word}%`);
    const gameNames = await knex(game)
      .select("game_name")
      .where("game_name", "like", `%${word}%`);
    return genreNames.concat(gameNames);
  }
}

module.exports = Interest;
