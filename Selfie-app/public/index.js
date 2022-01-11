//javascript in status file
console.log("Start working !");

function setup() {
  //setup for p5.js
  noCanvas();

  const capture = createCapture(VIDEO);
  //creating capture object
  capture.size(250, 250);

  let lat, lon;
  const button = document.getElementById("submit");
  button.addEventListener("click", async () => {
    //The mood value
    const input = document.getElementById("mood");
    const mood = input.value;

    //image treatment
    capture.loadPixels();
    //image taken from capture object of p5.js
    const image = capture.canvas.toDataURL();

    const coord = { lat, lon, mood, image };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coord),
    };
    const response = await fetch("/api", options);
    const data = await response.json();
    console.log("Data received from the server is:", data);
    console.log(coord);
  });

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const coords = position.coords;
      const { latitude, longitude } = coords;
      //noising concept
      lat = latitude;
      lon = longitude;
      document.getElementById("lat").textContent = latitude;
      document.getElementById("long").textContent = longitude;
    });
  } else {
    console.log("Geolocation is not available !");
  }
}
