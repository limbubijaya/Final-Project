/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('genre').del()
  await knex('genre').insert([
    {id: 1, genre_name: 'mmo'},
    {id: 2, genre_name: 'mmog'},
    {id: 3, genre_name: 'rpg'},
    {id: 4, genre_name: 'arpg'},
    {id: 5, genre_name: 'mmorpg'},
    {id: 6, genre_name: 'tbs'},
    {id: 7, genre_name: 'rts'},
    {id: 8, genre_name: 'tps'},
    {id: 9, genre_name: 'fps'},
    {id: 10, genre_name: 'moba'},
    {id: 11, genre_name: 'td'},
    {id: 12, genre_name: 'f2p'}
  ]);
};
