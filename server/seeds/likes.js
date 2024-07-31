/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('likes').del()
  await knex('likes').insert([
    {id: 1, post_id: 1, user_id: 2}
  ]);
};
