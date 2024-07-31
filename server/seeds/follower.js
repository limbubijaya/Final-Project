/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('follower').del()
  await knex('follower').insert([
    {id: 1, being_followed_user_id: 1, the_follower_user_id: 2},
    {id: 2, being_followed_user_id: 2, the_follower_user_id: 1},
  ]);
};
