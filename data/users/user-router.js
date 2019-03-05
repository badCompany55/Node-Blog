const express = require("express");
const users = require("../helpers/userDb.js");
const router = express.Router();

function upperCaseName(req, res, next) {
  name = req.body.name.toUpperCase();
  req.body.name = name;
  next();
}

router.get("/", async (req, res) => {
  try {
    const theUsers = await users.get();
    res.status(200).json(theUsers);
  } catch (err) {
    res.status(500).json({ error: "Failed to get all users" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const theUser = await users.getById(req.params.id);
    res.status(200).json(theUser);
  } catch (err) {
    res
      .status(500)
      .json({ error: `The user with id ${req.params.id} does not exisit` });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const userPosts = await users.getUserPosts(req.params.id);
    res.status(200).json(userPosts);
  } catch {
    res.status(500).json({
      error: `Failed to get posts for user with id of ${req.params.id}`
    });
  }
});

router.post("/", upperCaseName, async (req, res) => {
  try {
    const theUser = await users.insert(req.body);
    res.status(201).json(theUser);
  } catch {
    res.status(500).json({ error: "Failed to add new user" });
  }
});

module.exports = router;
