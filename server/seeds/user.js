/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  const saltRounds = 10;
  const myPlaintextPassword = 'password';

  const encryptedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  await knex('local_user').del()
  await knex('local_user').insert([
    {id: 1, email: 'limbubj@ymail.com', password: encryptedPassword, display_name: 'bijaya', 
      profile_pic: 'test', bio: 'hi i am bijaya', is_linked_to_google: false},
    {id: 2, email: 'test', password: encryptedPassword, display_name: 'test', 
      profile_pic: 'test', bio: 'hi i am test', is_linked_to_google: false},
  ]);
};
