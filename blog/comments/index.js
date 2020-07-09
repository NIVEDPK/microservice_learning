const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsById = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsById[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentsId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsById[req.params.id] || [];
  comments.push({ id: commentsId, content });
  commentsById[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentsId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

app.post("/events", (req, res) => {
  console.log("Event recieved ", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening to port 4001");
});
