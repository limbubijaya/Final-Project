const knex = require("../db");
const bcrypt = require("bcrypt");
const post = "post";
const localUser = "local_user";
const follower = "follower";
const likes = "likes";
const comments = "comments";
const game = "game";

class Posts {
  constructor() {}

  async searchForGameInPost(word) {
    try {
      console.log(word);
      const gameSearch = await knex(game)
        .select("game_name")
        .where("game_name", "like", `%${word}%`);
      return gameSearch;
    } catch (error) {
      throw error;
    }
  }

  async createPost(display_name, game_name, description, media) {
    try {
      const user = await knex(localUser)
        .where("display_name", display_name)
        .first();

      const games = await knex(game).where("game_name", game_name).first();
      const postCreated = await knex(post).insert([
        {
          user_id: user.id,
          game_id: games.id,
          description: description,
          media: media,
        },
      ]);
      if (postCreated) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts() {
    let listOfAllPost = [];
    const allPost = await knex(post).select("*");
    for (let i = 0; i < allPost.length; i++) {
      const userInfo = await knex(localUser)
        .where("id", allPost[i].user_id)
        .first();
      const postGameName = await knex(game)
        .where("id", allPost[i].game_id)
        .first();
      listOfAllPost.push({
        ...allPost[i],
        display_name: userInfo.display_name,
        game_name: postGameName.game_name,
      });
    }
    //console.log(listOfAllPost);
    const randomAllPost = listOfAllPost.sort(() => 0.5 - Math.random());
    return randomAllPost;
  }
  async getPostByFollowing(display_name) {
    console.log(display_name);
    const user = await knex(localUser)
      .where("display_name", display_name)
      .first();

    const followers = await knex(follower)
      .select("*")
      .where("the_follower_user_id", user.id);

    let followersPost = [];
    for (let i = 0; i < followers.length; i++) {
      const followerUser = await knex(localUser)
        .where("id", followers[i].being_followed_user_id)
        .first();
      const posts = await knex(post)
        .select("*")
        .where("user_id", followers[i].being_followed_user_id)
        .orderBy("id", "desc")
        .limit(2);

      for (let j = 0; j < posts.length; j++) {
        followersPost.push({
          ...posts[j],
          display_name: followerUser.display_name,
          profile_pic: followerUser.profile_pic,
        });
      }
    }
    const randomFollowerPosts = followersPost.sort(() => 0.5 - Math.random());
    return randomFollowerPosts;
  }

  async getUserPost(post_id, display_name) {
    const user = await knex(localUser)
      .where("display_name", display_name)
      .first();
    const posts = await knex(post).select("*").where("id", post_id).first();
    posts.profile_pic = user.profile_pic;
    const isUserFollowingThePostUser = await knex(follower)
      .where("being_followed_user_id", posts.user_id)
      .where("the_follower_user_id", user.id);
    if (isUserFollowingThePostUser.length > 0) {
      posts.isUserFollowingThePostUser = true;
      return posts;
    } else {
      posts.isUserFollowingThePostUser = false;
      return posts;
    }
  }

  async likePost(postId, displayName) {
    try {
      const user = await knex(localUser)
        .where("display_name", displayName)
        .first();

      console.log("postId", postId);
      console.log("user_id", user.id);

      const existingLike = await knex(likes)
        .where("post_id", postId)
        .where("user_id", user.id)
        .first();

      if (existingLike) {
        const likeCount = await knex(likes)
          .where("post_id", postId)
          .where("user_id", user.id)
          .del();
        console.log("likeCount", likeCount);
        return false;
      } else {
        await knex(likes).insert({
          post_id: postId,
          user_id: user.id,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getUserLikedPost(postId, displayName) {
    const user = await knex(localUser)
      .where("display_name", displayName)
      .first();

    const userLiked = await knex(likes)
      .select("*")
      .where("post_id", postId)
      .where("user_id", user.id);

    return userLiked != null;
  }

  async getPostLikeCount(postId) {
    const likeCount = await knex(likes)
      .where("post_id", postId)
      .count("id as count")
      .first();
    return likeCount.count;
  }
  async showComment(post_id) {
    try {
      const comment = await knex(comments)
        .select("*")
        .where("post_id", post_id);

      let allComments = [];
      for (let i = 0; i < comment.length; i++) {
        const commentUser = await knex(localUser)
          .where("id", comment[i].user_id)
          .first();

        allComments.push({
          ...comment[i],
          display_name: commentUser.display_name,
          profile_pic: commentUser.profile_pic,
        });
      }
      return allComments;
    } catch (error) {
      throw error;
    }
  }

  async postComment(post_id, display_name, comment) {
    try {
      const user = await knex(localUser)
        .where("display_name", display_name)
        .first();

      const existingComment = await knex(comments)
        .where("post_id", post_id)
        .where("user_id", user.id)
        .first();

      if (existingComment) {
        return false;
      }

      const commentPosted = await knex(comments).insert([
        {
          post_id: post_id,
          user_id: user.id,
          comment: comment,
        },
      ]);
      if (commentPosted) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Posts;
