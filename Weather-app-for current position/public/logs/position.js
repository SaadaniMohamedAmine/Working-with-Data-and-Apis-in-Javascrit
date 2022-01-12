//js
console.log("Position page script");

if ("geolocation" in navigator) {
  console.log("Location is available");
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const { latitude, longitude } = pos.coords;
    document.getElementById("lat").textContent = latitude;
    document.getElementById("lon").textContent = longitude;

    //mapping the data with leflet.js
    const map = L.map("map").setView([0, 0], 1);
    const attribution =
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(map);
    const marker = L.marker([0, 0]).addTo(map);
    marker.setLatLng([latitude, longitude]);
  });
} else {
  console.log("Location is not availble");
}
