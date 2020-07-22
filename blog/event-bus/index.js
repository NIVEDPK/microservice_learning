const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-serv:4000/events", event); // PostsService
  axios.post("http://comments-serv:4001/events", event); //CommentService
  axios.post("http://query-serv:4002/events", event); //Query-Service
  axios.post("http://moderation-serv:4003/events", event); //Moderation-Service

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log("app is listening to 4005 port");
});
