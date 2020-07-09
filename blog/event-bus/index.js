const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event); // PostsService
  axios.post("http://localhost:4001/events", event); //CommentService
  axios.post("http://localhost:4002/events", event); //Query-Service

  res.send({ status: "OK" });
});

app.listen(4005, () => {
  console.log("app is listening to 4005 port");
});
