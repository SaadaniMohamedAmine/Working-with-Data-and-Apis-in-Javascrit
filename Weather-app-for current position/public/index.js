//javascript for client side
console.log("start working !!");

getData();
function getData() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      let lat, lon;
      const coords = pos.coords;
      try {
        lat = coords.latitude;
        lon = coords.longitude;
        //fetch the weather object from the api
        const response = await fetch(`/weather/${lat},${lon}`);
        const data = await response.json();
        //consuming the data of the api of weather
        document.getElementById("city").textContent =
          data.name + "-" + data.sys.country;
        document.getElementById("weather").textContent =
          data.weather[0].main + "-" + data.weather[0].description;
        // document.getElementById("hum").textContent = data.main.humidity;
        document.getElementById("date").textContent = `${moment().format(
          "dddd, MMMM Do YYYY, h:mm:ss a"
        )}`;
        document.getElementById("hour").textContent =
          moment().format("HH:mm:ss");
        document.getElementById("temp").textContent = data.main.temp;
      } catch (err) {
        if (err) throw err;
      }
    });
  } else {
    ///
  }
}
