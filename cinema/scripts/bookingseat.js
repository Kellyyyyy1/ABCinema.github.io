const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.sold)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const ticketSelect = document.getElementById("ticket");

populateUI();

let totalticketPrice = +ticketSelect.value;

// Save selected ticket index and price
function setTicketData(ticketIndex, ticketPrice) {
  sessionStorage.setItem("selectedTicketIndex", ticketIndex);
  sessionStorage.setItem("selectedTicketPrice", ticketPrice);
}

// Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  sessionStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setTicketData(ticketSelect.selectedIndex, ticketSelect.value);
}


// Get data from sesstionstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(sessionStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        console.log(seat.classList.add("selected"));
      }
    });
  }

  const selectedTicketIndex = sessionStorage.getItem("selectedTicketIndex");

  if (selectedTicketIndex !== null) {
    ticketSelect.selectedIndex = selectedTicketIndex;
    console.log(selectedTicketIndex)
  }
}
console.log(populateUI())
// Movie select event
ticketSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setTicketData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("sold")
  ) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});


updateSelectedCount();