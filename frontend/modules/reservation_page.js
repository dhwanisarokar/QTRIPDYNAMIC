import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const res = await fetch(`${config.backendEndpoint}/reservations/`);
  
    const data = await res.json();
    return data;

  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  
  //Conditionally render the no-reservation-banner and reservation-table-parent
  if(reservations.length > 0){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

    reservations.forEach(reservation => {
      let reservationDate = new Date(reservation.date).toLocaleDateString("en-IN");
      let reservationTime = new Date(reservation.time).toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        second: "numeric",
        minute: "numeric",
        hour: "numeric",
        hour12: true
      });
      reservationTime = reservationTime.split(" at").join(",");
      // console.log(reservationTime)

      let button = `
        <div class="reservation-visit-button" id="${reservation.id}">
          <a href="../detail/?adventure=${reservation.adventure}">Vist Adventure</a>
        </div>
      `;
      let rowEle = document.createElement("tr");
      rowEle.innerHTML = `
        <th>${reservation.id}</th>
        <td>${reservation.name}</td>
        <td>${reservation.adventureName}</td>
        <td>${reservation.person}</td>
        <td>${reservationDate}</td>
        <td>${reservation.price}</td>
        <td>${reservationTime}</td>
        <td>${button}</td>
      `;
      document.getElementById("reservation-table").append(rowEle);
    })
}

export { fetchReservations, addReservationToTable };
