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

router.get("/:id", async (req, res) => {
  try {
    const singlePost = await posts.getById(req.params.id);
    res.status(200).json(singlePost);
  } catch {
    res
      .status(500)
      .json({ error: `Unable to get post with the id of ${req.params.id}` });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await posts.insert(req.body);
    res.status(201).json(newPost);
  } catch {
    res.status(500).json({ error: "Unable to add new post" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await posts.update(req.params.id, req.body);
    res.status(200).json(updatedPost);
  } catch {
    res.status(500).json({ error: "Unable to update post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await posts.remove(req.params.id);
    res.status(202).json(deletePost);
  } catch {
    res.status(500).json({ error: "Unable to delete post" });
  }
});
