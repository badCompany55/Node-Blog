const express = require("express");
const users = require("../helpers/userDb.js");
const router = express.Router();

function upperCaseName(req, res, next) {
  if (req.body.name) {
    name = req.body.name.toUpperCase();
    req.body.name = name;
  } else {
    res.status(400).json({ error: "Name is required" });
  }
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
    theUser
      ? res.status(200).json(theUser)
      : res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ error: `Error retrieving user.` });
  }
});

router.get("/:id/posts", async (req, res) => {
  try {
    const theUser = await users.getById(req.params.id);
    if (theUser) {
      const userPosts = await users.getUserPosts(req.params.id);
      if (userPosts.length > 0) {
        res.status(200).json(userPosts);
      } else {
        console.log(theUser);
        res
          .status(404)
          .json({ message: `${theUser.name} does not have any posts` });
      }
    } else {
      res.status(404).json({ error: "The user does not exist" });
    }
  } catch {
    res.status(500).json({
      error: `Failed to retrieve user.`
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
    const user = await users.getById(id);
    if (user) {
      if (body.name) {
        const updatedUser = await users.update(id, body);
        res.status(200).json(updatedUser);
      } else {
        res.status(400).json({ error: "The name is required" });
      }
    } else {
      res
        .status(400)
        .json({ error: `The user with id: ${id}, does not exist` });
    }
  } catch {
    res.status(500).json({ error: "There was a problem updating the user" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const deletedUser = await users.remove(id);
    deletedUser === 1
      ? res.status(200).json(deletedUser)
      : res.status(400).json({ error: "The user doesn't exist" });
  } catch {
    res.status(500).json({ error: "Failed to delete user" });
  }
});

module.exports = router;
