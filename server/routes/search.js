const express = require("express");
const router = express.Router();
const Search = require("../model/search");
const search = new Search();

router.post("/byDisplayName", async (req, res) => {
  try {
    //const posts = await Search.searchPost(req.body.display_name);
    console.log(req.body.display_name);
    const users = await Search.searchUsers(req.body.display_name);
    res.status(200).json({ users: users });
  } catch (err) {
    console.error("Error getting your inforamtion:", err);
    res.status(500).json({ error: "Failed to get your inforamtion" });
  }
});

router.post("/profilePost", async (req, res) => {
  try {
    console.log(req.body.display_name);
    const yourProfilePost = await profile.getProfilePost(req.body.display_name);
    res.status(200).json({ yourProfilePost: yourProfilePost });
  } catch (err) {
    console.error("Error getting your inforamtion:", err);
    res.status(500).json({ error: "Failed to get your inforamtion" });
  }
});
module.exports = router;
