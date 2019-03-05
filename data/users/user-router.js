const express = require("express");
const users = require("../helpers/userDb.js");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const theUsers = await users.get();
    res.status(200).json(theUsers);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

module.exports = router;
