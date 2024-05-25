// Sample makeup artist data (replace with actual data from server)
var artists = [
    { id: 1, name: "Artist 1", location: "Location 1" },
    { id: 2, name: "Artist 2", location: "Location 2" },
    { id: 3, name: "Artist 3", location: "Location 3" }
];

// Function to display makeup artists
function displayArtists() {
    var artistList = document.getElementById("artist-list");
    artistList.innerHTML = "";

    artists.forEach(function(artist) {
        var artistCard = document.createElement("div");
        artistCard.classList.add("card");
        artistCard.innerHTML = "<h3>" + artist.name + "</h3>" +
                               "<p><strong>Location:</strong> " + artist.location + "</p>";
        artistCard.addEventListener("click", function() {
            openBookingModal(artist);
        });
        artistList.appendChild(artistCard);
    });
}

// Function to open booking modal with selected artist
function openBookingModal(artist) {
    var modal = document.getElementById("booking-modal");
    modal.style.display = "block";

    var closeModal = document.getElementsByClassName("close")[0];
    closeModal.onclick = function() {
        modal.style.display = "none";
    };

    var bookingForm = document.getElementById("booking-form");
    bookingForm.onsubmit = function(event) {
        event.preventDefault();
        var date = document.getElementById("date").value;
        var time = document.getElementById("time").value;
        var location = document.getElementById("location").value;
        submitBookingRequest(artist, date, time, location);
        modal.style.display = "none";
    };
}

// Function to submit booking request
function submitBookingRequest(artist, date, time, location) {
    console.log("Booking Request:");
    console.log("Artist:", artist.name);
    console.log("Date:", date);
    console.log("Time:", time);
    console.log("Location:", location);
}

// Display makeup artists when page loads
window.addEventListener("load", function() {
    displayArtists();
});
