/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('message').del()
  await knex('message').insert([
    {id: 1, sender_user_id: 1, receiver_user_id: 2, message_file_link: 'test.com'}
  ]);
};
