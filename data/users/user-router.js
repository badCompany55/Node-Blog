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

router.put("/:id", upperCaseName, async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    const updatedUser = await users.update(id, body);
    res.status(200).json(updatedUser);
  } catch {
    res.status(500).json({ error: "There was a problem updating the user" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await users.remove(id);
    res.status(200).json(deletedUser);
  } catch {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
