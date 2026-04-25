const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.static(__dirname));

app.get("/student", (req, res) => {
  res.json({
    name: "Faneesh Boya",
    course: "B.E CSE Student",
    bio: "Passionate developer learning full stack development.",
    skills: ["HTML", "CSS", "JavaScript"],
    email: "faneesh@email.com"
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});