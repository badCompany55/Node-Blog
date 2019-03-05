const express = require("express");
const users = require("../helpers/userDb.js");
const router = express.Router();

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

module.exports = router;
