/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('game').del()
  await knex('game').insert([
    {id: 1, game_name: 'valorant'},
    {id: 2, game_name: 'apex legends'},
    {id: 3, game_name: 'league of legends'},
    {id: 4, game_name: 'dota 2'},
    {id: 5, game_name: 'bloons td 6'},
    {id: 6, game_name: 'hades'},
    {id: 7, game_name: 'counter-strike 2'},
    {id: 8, game_name: 'fortnite'}
  ]);
};
