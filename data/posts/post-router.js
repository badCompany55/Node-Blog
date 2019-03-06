const express = require("express");
const posts = require("../helpers/postDb.js");
const users = require("../users/user-router.js");
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
    singlePost
      ? res.status(200).json(singlePost)
      : res.status(400).json({ error: "The post does not exist" });
  } catch {
    res.status(500).json({ error: `Unable to get post from database` });
  }
});

router.post("/", async (req, res) => {
  try {
    if (req.body.text && req.body.user_id) {
      const newPost = await posts.insert(req.body);
      res.status(201).json(newPost);
    } else {
      res.status(400).json({ error: "Text and user_id is required" });
    }
  } catch {
    res.status(500).json({ error: "Unable to add new post" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (req.body.text && req.body.user_id) {
      const updatedPost = await posts.update(req.params.id, req.body);
      res.status(200).json(updatedPost);
    } else {
      res.status(400).json({ error: "Text and user_id are required" });
    }
  } catch {
    res.status(500).json({ error: "Unable to update post" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const thePost = await posts.getById(req.params.id);
    console.log(thePost);
    if (thePost) {
      const deletePost = await posts.remove(req.params.id);
      res.status(202).json(deletePost);
    } else {
      res
        .status(400)
        .json({ error: `The post with id ${req.params.id} does not exist` });
    }
  } catch {
    res.status(500).json({ error: "Unable to delete post" });
  }
});
