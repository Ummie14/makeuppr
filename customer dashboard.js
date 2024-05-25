// Sample makeup artist data (replace with actual data from server)
var makeupArtists = [
    { id: 1, name: "Artist 1", location: "Location 1", services: ["Bridal Makeup", "Special Events"], rating: 4.5, availability: "Available" },
    { id: 2, name: "Artist 2", location: "Location 2", services: ["Fashion Makeup", "Theatrical Makeup"], rating: 4.2, availability: "Unavailable" },
    { id: 3, name: "Artist 3", location: "Location 3", services: ["Natural Makeup", "Editorial Makeup"], rating: 4.8, availability: "Available" }
];

// Function to display makeup artists
function displayMakeupArtists(artists) {
    var artistList = document.getElementById("artist-list");
    artistList.innerHTML = "";

    artists.forEach(function (artist) {
        var artistCard = document.createElement("div");
        artistCard.classList.add("artist-card");
        artistCard.innerHTML = "<div class='artist-name'>" + artist.name + "</div>" +
            "<div class='artist-location'>" + artist.location + "</div>" +
            "<div class='artist-services'>" + artist.services.join(", ") + "</div>" +
            "<div class='artist-rating'>Rating: " + artist.rating + "</div>" +
            "<div class='artist-availability'>Availability: " + artist.availability + "</div>";
        artistList.appendChild(artistCard);
    });
}

// Function to filter makeup artists based on search criteria
function filterMakeupArtists(criteria) {
    // Implement filtering logic based on search criteria
    // For example, filter by location, services, artist name, etc.
    var filteredArtists = makeupArtists.filter(function (artist) {
        return artist.location.toLowerCase().includes(criteria.toLowerCase()) ||
            artist.services.some(service => service.toLowerCase().includes(criteria.toLowerCase())) ||
            artist.name.toLowerCase().includes(criteria.toLowerCase());
    });

    displayMakeupArtists(filteredArtists);
}

// Function to display user's profile
function displayUserProfile() {
    // Retrieve user's profile data from server and populate the form
    // For the sake of this example, let's assume we have static data
    var userProfile = {
        name: "John Doe",
        email: "john@example.com",
        password: "********",
        preferences: "I prefer natural makeup styles."
    };

    document.getElementById("name").value = userProfile.name;
    document.getElementById("email").value = userProfile.email;
    document.getElementById("password").value = userProfile.password;
    document.getElementById("preferences").value = userProfile.preferences;
}

// Function to display user's bookings
function displayUserBookings() {
    // Retrieve user's upcoming and past bookings from server
    // For the sake of this example, let's assume we have static data
    var upcomingBookings = [
        { artist: "Artist 1", date: "2024-05-10", time: "10:00 AM", location: "Location 1", notes: "Please arrive 10 minutes early." },
        { artist: "Artist 2", date: "2024-05-15", time: "2:00 PM", location: "Location 2", notes: "Bring your own makeup kit." }
    ];

    var pastBookings = [
        { artist: "Artist 3", date: "2024-04-20", time: "12:00 PM", location: "Location 3", notes: "Great experience!" }
    ];

    // Display upcoming bookings
    var upcomingList = document.getElementById("upcoming-list");
    upcomingList.innerHTML = "";
    upcomingBookings.forEach(function (booking) {
        var listItem = document.createElement("li");
        listItem.innerHTML = "<strong>Artist:</strong> " + booking.artist + "<br>" +
            "<strong>Date:</strong> " + booking.date + "<br>" +
            "<strong>Time:</strong> " + booking.time + "<br>" +
            "<strong>Location:</strong> " + booking.location + "<br>" +
            "<strong>Notes:</strong> " + booking.notes;
        upcomingList.appendChild(listItem);
    });

    // Display past bookings
    var pastList = document.getElementById("past-list");
    pastList.innerHTML = "";
    pastBookings.forEach(function (booking) {
        var listItem = document.createElement("li");
        listItem.innerHTML = "<strong>Artist:</strong> " + booking.artist + "<br>" +
            "<strong>Date:</strong> " + booking.date + "<br>" +
            "<strong>Time:</strong> " + booking.time + "<br>" +
            "<strong>Location:</strong> " + booking.location + "<br>" +
            "<strong>Notes:</strong> " + booking.notes;
        pastList.appendChild(listItem);
    });
}

// Event listener for filter button click
document.getElementById("filter-button").addEventListener("click", function () {
    var searchInput = document.getElementById("search-input").value;
    filterMakeupArtists(searchInput);
});

// Event listener for profile form submission
document.getElementById("profile-form").addEventListener("submit", function (event) {
    event.preventDefault();
    // Implement logic to update user's profile on the server
});

// Display user's profile and bookings when page loads
window.addEventListener("load", function () {
    displayUserProfile();
    displayUserBookings();
    // Initially display all makeup artists
    displayMakeupArtists(makeupArtists);
});


