const express = require("express");
const router = express.Router();
const Posts = require("../model/posts");
const post = new Posts();

router.get("/searchForGameInPost/:gameName", async (req, res) => {
  try {
    const { gameName } = req.params;
    const searchedGame = await post.searchForGameInPost(gameName);
    res.status(200).json({ game: JSON.stringify(searchedGame) });
  } catch (error) {
    console.error("Error searching for game:", error);
    res.status(500).json({ error: "Error searching for game" });
  }
});

router.post("/createPost", async (req, res) => {
  try {
    console.log(
      req.body.display_name,
      req.body.game_name,
      req.body.description,
      req.body.media
    );
    const postCreated = await post.createPost(
      req.body.display_name,
      req.body.game_name,
      req.body.description,
      req.body.media
    );
    console.log(postCreated);
    if (!postCreated) {
      res.status(400).json({ error: "Error creating post" });
    } else {
      res.status(200).json({ created: true });
    }
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Error creating post" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allPosts = await post.getAllPosts();
    res.status(200).json({ allPosts: allPosts });
  } catch (error) {
    console.error("Error getting all posts:", error);
    res.status(500).json({ error: "Error getting all posts" });
  }
});

router.post("/followersPost", async (req, res) => {
  try {
    console.log(req.body.display_name);
    const followerPosts = await post.getPostByFollowing(req.body.display_name);
    res.status(200).json({ followerPosts: followerPosts });
  } catch (err) {
    console.error("Error getting follower posts:", err);
    res.status(500).json({ error: "Failed to get follower posts" });
  }
});

router.post("/getUserPost", async (req, res) => {
  try {
    console.log("routes", req.body.post_id, req.body.display_name);
    const userPost = await post.getUserPost(
      req.body.post_id,
      req.body.display_name
    );
    res.status(200).json(userPost);
  } catch (error) {
    console.error("Error getting user post:", error);
    res.status(500).json({ error: "Failed to get user post" });
  }
});

router.post("/likePost", async (req, res) => {
  try {
    const { postId, display_name } = req.body;
    if (!postId || !display_name) {
      res.status(400).json({ error: "Failed to like post" });
    }
    const liked = await post.likePost(postId, display_name);
    res.status(200).json({ liked: liked });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: "Failed to like post" });
  }
});

router.post("/getPostLikes", async (req, res) => {
  try {
    if (!req.body.postId)
      res.status(400).json({ error: "Failed to get post likes" });

    const likes = await post.getPostLikeCount(req.body.postId);
    console.log("likeCount:", likes);
    res.status(200).json({ likes: likes });
  } catch (error) {
    console.error("Error getting post likes:", error);
    res.status(500).json({ error: "Failed to get post likes" });
  }
});

router.post("/userLikedPost", async (req, res) => {
  try {
    const { postId, display_name } = req.body;

    if (!postId || !display_name) {
      res.status(400).json({ error: "Failed to like post" });
    }

    const isLiked = await post.getUserLikedPost(postId, display_name);
    console.log("route isliked", isLiked);
    res.status(200).json({ isLiked: isLiked });
  } catch (error) {
    console.error("Error checking user liked post:", error);
    res.status(500).json({ error: "Failed to check if user liked post" });
  }
});

router.post("/showComment", async (req, res) => {
  try {
    const allComments = await post.showComment(req.body.postId);
    console.log(allComments);
    res.status(200).json({ allComments: allComments });
  } catch (error) {
    console.error("Error getting post comments:", error);
    res.status(500).json({ error: "Failed to get post comments" });
  }
});

router.post("/postComment", async (req, res) => {
  try {
    const posted = await post.postComment(
      req.body.postId,
      req.body.display_name,
      req.body.comment
    );
    console.log("router", posted);
    if (posted) {
      res.status(200).json({
        posted: posted,
        postId: req.body.postId,
        display_name: req.body.display_name,
        comment: req.body.comment,
      });
    } else {
      res.status(400).json({ error: "Comment already exists" });
    }
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

module.exports = router;
