const knex = require("../db");
const post = "post";
const localUser = "local_user";
const follower = "follower";
const likes = "likes";
const comments = "comments";
const game = "game";

class Profile {
  constructor() {
    this.profile = [];
  }
  async getProfileInfo(display_name) {
    try {
      const userInfo = await knex(localUser)
        .where("display_name", display_name)
        .first();

      if (!userInfo) {
        return { error: "User not found" };
      }

      const followerCount = await knex(follower)
        .where("being_followed_user_id", userInfo.id)
        .count("id as count");

      const followingCount = await knex(follower)
        .where("the_follower_user_id", userInfo.id)
        .count("id as count");

      userInfo.followingCount = followingCount[0].count;
      userInfo.followerCount = followerCount[0].count;

      return userInfo;
    } catch (error) {
      console.error("Error getting profile info:", error);
      return { error: "An error occurred while fetching profile information" };
    }
  }

  async getProfilePost(display_name) {
    try {
      const user = await knex(localUser)
        .where("display_name", display_name)
        .first();

      if (!user) {
        return { error: "User not found" };
      }

      const userPost = await knex(post)
        .select("*")
        .where("user_id", user.id)
        .orderBy("id", "desc");
      return userPost;
    } catch (error) {
      console.error("Error getting profile post:", error);
      return { error: "An error occurred while fetching profile post" };
    }
  }

  async checkIfUserIsFollowing(display_name, myDisplayName) {
    try {
      const user = await knex(localUser)
        .where("display_name", display_name)
        .first();
      const currentUser = await knex(localUser)
        .where("display_name", myDisplayName)
        .first();

      const isUserFollowingThePostUser = await knex(follower)
        .where("being_followed_user_id", user.id)
        .where("the_follower_user_id", currentUser.id);
      if (isUserFollowingThePostUser.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Error checking is user following the profile:", error);
      return {
        error: "An error occurred while checking is user following the profile",
      };
    }
  }

  async postFollower(display_name, myDisplayName) {
    try {
      const user = await knex(localUser)
        .where("display_name", display_name)
        .first();
      const currentUser = await knex(localUser)
        .where("display_name", myDisplayName)
        .first();
      console.log(user.id, currentUser.id);

      const followResponse = await knex(follower).insert([
        {
          being_followed_user_id: user.id,
          the_follower_user_id: currentUser.id,
        },
      ]);
      if (followResponse) {
        return true;
      } else {
        return false;
      }
    } catch (error) {}
  }

  async unfollowUser(display_name, myDisplayName) {
    try {
      const user = await knex(localUser)
        .where("display_name", display_name)
        .first();
      const currentUser = await knex(localUser)
        .where("display_name", myDisplayName)
        .first();
  
      const unfollowResponse = await knex(follower)
        .where("being_followed_user_id", user.id)
        .where("the_follower_user_id", currentUser.id)
        .del();
  
      if (unfollowResponse > 0) {
        return { success: true };
      } else {
        return { success: false, error: "Failed to unfollow user" };
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
      return { success: false, error: "An error occurred while unfollowing user" };
    }
  }
}

module.exports = Profile;
