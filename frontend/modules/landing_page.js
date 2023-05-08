import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log("From init()");
  // console.log(config.backendEndpoint + '/cities');
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM

  const ele = document.createElement("div");
  ele.className = "col-6 col-lg-3 mb-4";
  ele.innerHTML = `
          <a href="pages/adventures/?city=${id}" id="${id}">
          <div class="tile">
            <img src="${image}" alt="${city}"/>
            <div class="tile-text">
              <h5>${city}</h5> 
              <p>${description}</p>
            </div>
          </div>
          </a>
        `;

  document.getElementById("data").append(ele);
}

export { init, fetchCities, addCityToDOM };
