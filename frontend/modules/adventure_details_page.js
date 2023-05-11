import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL

  const URLParams = new URLSearchParams(search);
  const adventure = URLParams.get("adventure");
  // Place holder for functionality to work in the Stubs
  return adventure;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try {
    const res = await fetch(
      `${config.backendEndpoint}/adventures/detail/?adventure=${adventureId}`
    );

    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    return null;
  }
  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  const {
    id,
    name,
    subtitle,
    images,
    content,
    available,
    reserved,
    costPerHead,
  } = adventure;

  // add name to DOM
  document.getElementById("adventure-name").textContent = name;

  // subtitle
  document.getElementById("adventure-subtitle").textContent = subtitle;

  // img to DOM
  images.forEach((img) => {
    const imgEle = document.createElement("img");
    imgEle.className = "activity-card-image";
    imgEle.src = img;
    imgEle.alt = name;
    document.getElementById("photo-gallery").append(imgEle);
  });

  // content to DOM
  document.getElementById("adventure-content").textContent = content;

  // document.getElementById("");
  // document.getElementById("");
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  const carouselSlideELe = document.createElement("div");
  carouselSlideELe.className = "carousel slide";
  carouselSlideELe.id = "carouselExampleIndicators";
  carouselSlideELe.setAttribute("data-bs-ride", "carouselExampleIndicators");

  const carousel_indicators = document.createElement("div");
  carousel_indicators.className = "carousel-indicators";
  carousel_indicators.innerHTML = `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  `;
  carouselSlideELe.append(carousel_indicators);

  // creating carousel inner ele
  const carousel_inner = document.createElement("div");
  carousel_inner.className = "carousel-inner";

  // appending carusel item to carousel_inner
  images.forEach((img, idx) => {
    const carousel_item = document.createElement("div");
    carousel_item.className = "carousel-item";
    idx === 0
      ? (carousel_item.className = "carousel-item active")
      : (carousel_item.className = "carousel-item");

    carousel_item.innerHTML = `<img src="${img}" class="d-block w-100 activity-card-image" alt="${idx}">`;
    carousel_inner.append(carousel_item);
  });
  carouselSlideELe.append(carousel_inner);

  // creating prev button
  const carousel_control_prev = document.createElement("button");
  carousel_control_prev.className = "carousel-control-prev";
  carousel_control_prev.setAttribute("type", "button");
  carousel_control_prev.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carousel_control_prev.setAttribute("data-bs-slide", "prev");
  carousel_control_prev.innerHTML = `
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    `;

  carouselSlideELe.append(carousel_control_prev);

  const carousel_control_next = document.createElement("button");
  carousel_control_next.className = "carousel-control-next";
  carousel_control_next.setAttribute("type", "button");
  carousel_control_next.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carousel_control_next.setAttribute("data-bs-slide", "next");
  carousel_control_next.innerHTML = `
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    `;

  carouselSlideELe.append(carousel_control_next);

  document.getElementById("photo-gallery").innerHTML = "";
  document.getElementById("photo-gallery").append(carouselSlideELe);
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
