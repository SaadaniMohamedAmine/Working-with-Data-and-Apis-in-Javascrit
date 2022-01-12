//server side
const express = require("express");
const port = 3001;
const Datastore = require("nedb");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();

//database :instance of nedb ==>create and load
const database = new Datastore("database.db");
database.loadDatabase();

//middleware
app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

//routes middleware
app.get("/weather/:latlong", async (req, res) => {
  console.log("Get request to /weather !");
  const data = req.params.latlong.split(",");
  let lat = eval(data[0]);
  let lon = eval(data[1]);
  //fetching data from api open weather
  const apiUrl = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  const response = await fetch(apiUrl);
  const json = await response.json();
  res.json(json);
});

app.post("/weather", (req, res) => {
  console.log("Data from ui", req.body);
  const { lat, lon } = req.body;
  const response = res.json(req.body);
});
app.listen(port, (err) => {
  console.log(`Server is running on port ${port}`);
});
