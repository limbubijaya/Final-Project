/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require("bcrypt");

exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("game_genre").del();
  await knex("google_user").del();
  await knex("genre").del();
  await knex("message").del();
  await knex("likes").del();
  await knex("comments").del();
  await knex("post").del();
  await knex("follower").del();
  await knex("local_user").del();
  await knex("game").del();

  await knex("game").insert([
    { game_name: "valorant" },
    { game_name: "apex legends" },
    { game_name: "league of legends" },
    { game_name: "dota 2" },
    { game_name: "bloons td 6" },
    { game_name: "hades" },
    { game_name: "counter-strike 2" },
    { game_name: "fortnite" },
  ]);

  await knex("genre").insert([
    { genre_name: "mmo" },
    { genre_name: "mmog" },
    { genre_name: "rpg" },
    { genre_name: "arpg" },
    { genre_name: "mmorpg" },
    { genre_name: "tbs" },
    { genre_name: "rts" },
    { genre_name: "tps" },
    { genre_name: "fps" },
    { genre_name: "moba" },
    { genre_name: "td" },
    { genre_name: "f2p" },
  ]);

  const saltRounds = 10;
  const myPlaintextPassword = "password";

  const encryptedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  await knex("local_user").insert([
    {
      email: "limbubj@ymail.com",
      password: encryptedPassword,
      display_name: "bijaya",
      profile_pic: "https://i.natgeofe.com/k/75ac774d-e6c7-44fa-b787-d0e20742f797/giant-panda-eating_4x3.jpg",
      bio: "Hi I am bijaya, I am new",
      is_linked_to_google: false,
    },
    {
      email: "limbubj2@ymail.com",
      password: encryptedPassword,
      display_name: "valorant god",
      profile_pic: "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/94d795777116652279c4de73ba19976639c12f5d-1920x1080.jpg?auto=format&fit=fill&q=80&w=1082",
      bio: "Hi I am a pro Valorant Player",
      is_linked_to_google: false,
    },
    {
      email: "john@example.com",
      password: encryptedPassword,
      display_name: "john",
      profile_pic: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800",
      bio: "Hi, I'm John!",
      is_linked_to_google: false,
    },
    {
      email: "jane@example.com",
      password: encryptedPassword,
      display_name: "jane",
      profile_pic: "https://miro.medium.com/v2/resize:fit:698/1*0jjdu52m0MO4SjLWiCVOlg.jpeg",
      bio: "Hello, I'm Jane.",
      is_linked_to_google: false,
    },
  ]);

  await knex("follower").insert([
    { being_followed_user_id: 1, the_follower_user_id: 2 },
    { being_followed_user_id: 2, the_follower_user_id: 1 },
    { being_followed_user_id: 2, the_follower_user_id: 3 },
    { being_followed_user_id: 3, the_follower_user_id: 1 },
    { being_followed_user_id: 1, the_follower_user_id: 3 },
    { being_followed_user_id: 4, the_follower_user_id: 1 },
    { being_followed_user_id: 1, the_follower_user_id: 4 },
  ]);

  await knex("post").insert([
    {
      user_id: 1,
      game_id: 1,
      description: "My Favourite Agent",
      media:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Reyna_%28Valorant%29.png/640px-Reyna_%28Valorant%29.png",
    },
    {
      user_id: 2,
      game_id: 1,
      description: "I love Valorant",
      media:
        "https://t4.ftcdn.net/jpg/03/71/01/31/360_F_371013119_o87usHtqx06jK5IQ3sywV3cMslyx34Hi.jpg",
    },
    {
      user_id: 2,
      game_id: 2,
      description: "Ape Ape Apex",
      media:
        "https://media.contentapi.ea.com/content/dam/apex-legends/images/2021/07/apex-legends-emergence-patch-notes-thumbnail.jpg.adapt.crop191x100.628p.jpg",
    },
    {
      user_id: 3,
      game_id: 3,
      description: "League of Legends is a great game!",
      media:
        "https://dotesports.com/wp-content/uploads/2023/03/League-of-Legends.jpg",
    },
    {
      user_id: 4,
      game_id: 4,
      description: "Dota 2 is my favorite MOBA game.",
      media:
        "https://cdn.akamai.steamstatic.com/apps/dota2/images/dota2_social.jpg",
    },
    {
      user_id: 3,
      game_id: 5,
      description: "Bloons TD 6 is so much fun!",
      media:
        "https://media.wired.com/photos/613a3d656ab67fe10ebfff56/master/pass/Games-Bloons_TD_6_2_SOURCE_Ninja_Kiwi.jpg",
    },
  ]);

  await knex("comments").insert([
    {
      post_id: 2,
      user_id: 2,
      comment: "Nice post",
    },
    {
      post_id: 2,
      user_id: 3,
      comment: "I agree, League of Legends is great!",
    },
    {
      post_id: 3,
      user_id: 1,
      comment: "Dota 2 is a classic MOBA game.",
    },
    {
      post_id: 4,
      user_id: 4,
      comment: "Bloons TD 6 is an awesome tower defense game.",
    },
  ]);

  await knex("likes").insert([
    {
      post_id: 1,
      user_id: 2,
    },
    {
      post_id: 4,
      user_id: 2,
    },
    {
      post_id: 5,
      user_id: 1,
    },
  ]);

  await knex("game_genre").insert([
    { game_id: 1, genre_id: 9 },
    { game_id: 1, genre_id: 12 },
    { game_id: 2, genre_id: 9 },
    { game_id: 2, genre_id: 12 },
    { game_id: 3, genre_id: 4 },
    { game_id: 3, genre_id: 10 },
    { game_id: 3, genre_id: 12 },
    { game_id: 4, genre_id: 4 },
    { game_id: 4, genre_id: 10 },
    { game_id: 4, genre_id: 12 },
    { game_id: 5, genre_id: 7 },
    { game_id: 5, genre_id: 11 },
    { game_id: 6, genre_id: 4 },
    { game_id: 7, genre_id: 9 },
    { game_id: 7, genre_id: 12 },
    { game_id: 8, genre_id: 4 },
    { game_id: 8, genre_id: 8 },
    { game_id: 8, genre_id: 12 },
  ]);
};
