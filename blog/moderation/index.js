const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  console.log("Event recieved ", req.body.type);
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    console.log()
    const status = data.content.includes("orange") ? "Rejected" : "Approved";

    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, () => {
  console.log("Listening to port 4003");
});
