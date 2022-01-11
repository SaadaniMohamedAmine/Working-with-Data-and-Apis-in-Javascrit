//javascript and api
console.log("Starting working !");

//fetching one image
getOneImage();
async function getOneImage() {
  const response = await fetch("./assets/cat1.jpg");
  const image = await response.blob();
  document.getElementById("image").src = URL.createObjectURL(image);
}

//fetching multiple image
//links of the images
const links = ["./assets/cat1.jpg", "./assets/cat2.jpeg", "./assets/cat3.jpeg"];
const images = document.getElementById("images");
//style for the div#images
images.style.display = "flex";
images.style.justifyContent = "space-between";

getMultipleImages();
async function getMultipleImages() {
  for (link of links) {
    const response = await fetch(link);
    const data = await response.blob();
    const imageLink = URL.createObjectURL(data);
    const newImage = document.createElement("img");
    newImage.src = imageLink;
    //style
    newImage.style.width = "250px";
    newImage.style.height = "250px";
    images.append(newImage);
  }
}

//fetch a text
const text = document.getElementById("text");
//style
text.style.width = "80%";
text.style.padding = "0.75em";
text.style.textAlign = "center";
getText();
async function getText() {
  const response = await fetch("./poem.txt");
  const data = await response.text();
  text.textContent = data;
}

//Fetch a csv file and using chart.js library to visualize it
window.addEventListener("load", setUp);
async function setUp() {
  const ctx = document.getElementById("chart").getContext("2d");
  const data = await getDataFromCsv();
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.years,
      datasets: [
        {
          label: "Global Average Temperatures 1880-2018",
          data: data.temps,
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 100,
        },
      },
    },
  });
}

async function getDataFromCsv() {
  const response = await fetch("./ZonAnn.Ts+dSST.csv");
  //   const response = await fetch("./testdata.csv");
  const data = await response.text();
  const years = [];
  const temps = [];
  const table = data.split("\n").slice(1);
  table.forEach((item) => {
    const rows = item.split(",");
    years.push(rows[0]);
    temps.push(14 + parseFloat(rows[1]));
  });
  return { years, temps };
}

//using the chart.js to vizualise multiple lines
//using chart.js
window.addEventListener("load", setUp2);
async function setUp2() {
  const ctx = document.getElementById("chart2").getContext("2d");
  const data = await getMultipleLines();
  const { years, temps, north, south } = data;
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Global Average Temperatures 1880-2018",
          data: temps,
          fill: false,
          borderColor: "rgba(255, 99, 132, 1)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 1,
        },
        {
          label:
            "Global Average Temperatures 1880-2018-Northern part of the globe",
          data: north,
          fill: false,
          borderColor: "rgba(241,90,34,1)",
          backgroundColor: "rgba(241,90,34,1)",
          borderWidth: 1,
        },
        {
          label:
            "Global Average Temperatures 1880-2018-Southern part of the globe",
          data: south,
          fill: false,
          borderColor: "rgba(108,122,137,1)",
          backgroundColor: "rgba(108,122,137,1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

getMultipleLines();
async function getMultipleLines() {
  const response = await fetch("./ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  const years = [];
  const temps = [];
  const north = [];
  const south = [];
  const table = data.split("\n").slice(1);
  table.forEach((item) => {
    const d = item.split(`,`);
    years.push(d[0]);
    temps.push(14 + parseFloat(d[1]));
    north.push(14 + parseFloat(d[2]));
    south.push(14 + parseFloat(d[3]));
  });
  //
  return { years, temps, north, south };
}
