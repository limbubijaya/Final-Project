const express = require("express");
const router = express.Router();
const Profile = require("../model/profile");
const profile = new Profile();

router.post("/profileInfo", async (req, res) => {
  try {
    const yourProfileInfo = await profile.getProfileInfo(req.body.display_name);
    res.status(200).json(yourProfileInfo);
  } catch (err) {
    console.error("Error getting your inforamtion:", err);
    res.status(500).json({ error: "Failed to get your inforamtion" });
  }
});

router.post("/profilePost", async (req, res) => {
  try {
    const yourProfilePost = await profile.getProfilePost(req.body.display_name);
    res.status(200).json({ yourProfilePost: yourProfilePost });
  } catch (err) {
    console.error("Error getting your inforamtion:", err);
    res.status(500).json({ error: "Failed to get your inforamtion" });
  }
});

router.post("/profileCheckFollowing", async (req, res) => {
  try {
    const isUserFollowingThePostUser = await profile.checkIfUserIsFollowing(
      req.body.display_name,
      req.body.myDisplayName
    );
    res
      .status(200)
      .json({ isUserFollowingThePostUser: isUserFollowingThePostUser });
  } catch (err) {
    console.error("Error getting your inforamtion:", err);
    res.status(500).json({ error: "Failed to get your inforamtion" });
  }
});

router.post("/postFollower", async (req, res) => {
  try {
    const followResponse  = await profile.postFollower(
      req.body.display_name,
      req.body.myDisplayName
    );
    res.status(200).json(followResponse);
  } catch (err) {
    console.error("Error posting your follow:", err);
    res.status(500).json({ error: "Failed to post your follow" });
  }
});

router.post("/postUnfollow", async (req, res) => {
    try {
      const unfollowResponse = await profile.unfollowUser(
        req.body.display_name,
        req.body.myDisplayName
      );
      res.status(200).json(unfollowResponse);
    } catch (err) {
      console.error("Error unfollowing user:", err);
      res.status(500).json({ error: "Failed to unfollow user" });
    }
  });
module.exports = router;
