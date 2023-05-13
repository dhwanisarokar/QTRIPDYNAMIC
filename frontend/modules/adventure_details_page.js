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
    name,
    subtitle,
    images,
    content,
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

  let slides = ``;
  let indicators = ``;

  images.forEach((imgURL, idx) => {
    const activeClass = idx === 0 ? "active" : '';
    slides += `
      <div class="carousel-item ${activeClass}">
        <img src="${imgURL}" class="d-block w-100 activity-card-image" alt="${idx}">
      </div>
    `;

    indicators += `
      <button type="button" 
        data-bs-target="#adventuresImgSlides" 
        data-bs-slide-to="${idx}" 
        ${idx === 0 ? 'class="active" aria-current="true"' : ''} 
        aria-label="Slide ${idx+1}">
      </button>
    `;
  })
  
  document.getElementById("photo-gallery").innerHTML = `
    <div id="adventuresImgSlides" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">${indicators}</div>
      <div class="carousel-inner">${slides}</div>
      <button class="carousel-control-prev" type="button" data-bs-target="#adventuresImgSlides" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#adventuresImgSlides" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure);
  const {available, costPerHead} = adventure;

  const soldOutDOM = document.getElementById("reservation-panel-sold-out");
  soldOutDOM.style.display = "none";

  const reservationDOM = document.getElementById("reservation-panel-available");
  reservationDOM.style.display = "none";

  if(available){
    reservationDOM.style.display = "block";

    document.getElementById("reservation-person-cost").textContent = costPerHead;
  }
  else {
    soldOutDOM.style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  document.getElementById("reservation-cost").textContent = adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".

  document.getElementById("myForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formElems = e.target.elements;
    // console.log(formElems);

    const formData = {
      name : formElems.name.value,
      date : formElems.date.value,
      person : formElems.person.value,
      adventure : adventure.id,
    }
    console.log(formData);

    const res = await fetch(`${config.backendEndpoint}/reservations/new`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    console.log(result);
    if(result.success) alert("Success!");
    else alert("Failed!");

  });

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";
  }
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
