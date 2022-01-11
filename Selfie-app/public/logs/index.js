//all.html scripts
console.log("All the selfies uploaded !!");
const selfies = document.getElementById("selfies");
getData();
async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  //Dom manipulation

  data.forEach((item) => {
    const div = document.createElement("div");
    div.innerHTML = `<img src=${item.image} class="card-img-top" alt="...">
      <div class="card-body bg-dark text-light">
      <h5 class="card-title">${item.mood}</h5>
      <p class="card-text">Latitude: ${item.lat} <br /> Longitude: ${
      item.lon
    }</p>
      <p>Date: ${new Date(item.timestamp).toString()}</p>
      </div>`;
    div.style.width = "16rem";
    div.classList.add = "col-3";
    div.style.padding = "0.75em";

    selfies.append(div);
  });
}
