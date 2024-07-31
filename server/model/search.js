const knex = require("../db");
const bcrypt = require("bcrypt");
const post = "post";
const localUser = "local_user";
const follower = "follower";
const likes = "likes";
const comments = "comments";
const game = "game";

class Search {
  constructor() {}

  static async searchUsers(display_name_alike) {
    const users = await knex(localUser)
      .select("*")
      .where("display_name", "like", `%${display_name_alike}%`);

    return users;
  }
  static async searchUser(display_name) {
    const user = await knex(localUser)
      .select("*")
      .where({ display_name: display_name })
      .first();
    if (!user) {
      throw Error("searched User Not found!");
    }
    return user;
  }
  static async searchPost(display_name) {
    try {
      const user = await this.searchUser(display_name);

      const posts = await knex(post).select("*").where("user_id", user.id);
      console.log(posts);
      return posts;
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Search;
