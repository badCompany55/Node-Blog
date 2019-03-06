const express = require("express");
const posts = require("../helpers/postDb.js");
const router = express.Router();

module.exports = router;

router.get("/", async (req, res) => {
  try {
    const allPosts = await posts.get();
    res.status(200).json({ posts: allPosts });
  } catch {
    res.status(500).json({ error: "Unable to get the requested posts" });
  }
});
