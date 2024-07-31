/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('game_genre').del()
  await knex('game_genre').insert([
    {id: 1, game_id: 1, genre_id: 9},
    {id: 2, game_id: 1, genre_id: 12},
    {id: 3, game_id: 2 , genre_id: 9},
    {id: 4, game_id: 2 , genre_id: 12},
    {id: 5, game_id: 3 , genre_id: 4},
    {id: 6, game_id: 3 , genre_id: 10},
    {id: 7, game_id: 3 , genre_id: 12},
    {id: 8, game_id: 4 , genre_id: 4},
    {id: 9, game_id: 4 , genre_id: 10},
    {id: 10, game_id: 4 , genre_id: 12},
    {id: 11, game_id: 5 , genre_id: 7},
    {id: 12, game_id: 5 , genre_id: 11},
    {id: 13, game_id: 6 , genre_id: 4},
    {id: 14, game_id: 7 , genre_id: 9},
    {id: 15, game_id: 7 , genre_id: 12},
    {id: 16, game_id: 8 , genre_id: 4},
    {id: 17, game_id: 8 , genre_id: 8},
    {id: 18, game_id: 8 , genre_id: 12}
  ]);
};
