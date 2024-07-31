/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('post').del()
  await knex('post').insert([
    {id: 1, user_id: 1, game_id: 1, description: 'I love this game', media: 'test'}
  ]);
};
