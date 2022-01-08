//Fetch json with javascript
console.log("Start working !");

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

//the map from leaflet.js
const map = L.map("map").setView([0, 0], 1);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(map);
// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "iss.jpg",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

let firstTime = true;

async function GetIssPosition() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;
  document.getElementById("lat").textContent = latitude;
  document.getElementById("long").textContent = longitude;
  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    map.setView([latitude, longitude], 2);
    firstTime = false;
  }
}

setInterval(GetIssPosition, 1000);
