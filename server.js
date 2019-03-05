const express = require("express");
const server = express();
const cors = require("cors");
const logger = require("morgan");
const helm = require("helmet");
const postRouter = require("./data/posts/post-router.js");
const userRouter = require("./data/users/user-router.js");

server.use(express.json(), logger("dev"), helm(), cors());
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send(`
		<h2>Zachs Blog Application</h2>
		<p>Welcome. Thanks for visiting. Feel free to look around and explore!!</p>
	`);
});

module.exports = server;
