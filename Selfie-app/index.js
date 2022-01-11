//server side
//exercise
const fs = require("fs");
const express = require("express");
const { json } = require("express");
const port = 3000;

const app = express();
const Datastore = require("nedb");

//middleware
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

//database nedb-setup
const db = new Datastore("database.db");
db.loadDatabase();
//test
// db.insert({ name: "Mohamed", age: 27, career: "Web Developer" });

//routes of this app
app.get("/api", (req, res) => {
  db.find({}, (err, data) => {
    if (err) throw err;
    res.json(data);
  });
});
app.post("/api", (req, res) => {
  console.log("Post request for /api");
  const coords = req.body;
  db.insert({ ...coords, timestamp: Date.now() });
  res.json({
    status: 200,
    mood: coords.mood,
    latitude: coords.lat,
    longitude: coords.lon,
    image: coords.image,
    timestamp: Date.now(),
  });
});

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server is running on port ${port}..`);
});
