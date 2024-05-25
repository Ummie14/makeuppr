// Sample data for bookings, customers, reviews, and promotions (replace with actual data from server)
var bookings = [
    { date: "2024-05-10", time: "10:00 AM", customer: "Customer 1", location: "Location 1" },
    { date: "2024-05-15", time: "2:00 PM", customer: "Customer 2", location: "Location 2" }
];

var customers = [
    { name: "Customer 1", email: "customer1@example.com", appointments: ["2024-05-10", "2024-05-15"], notes: "Special requests: None" },
    { name: "Customer 2", email: "customer2@example.com", appointments: ["2024-05-15"], notes: "Special requests: None" }
];

var reviews = [
    { customer: "Customer 1", rating: 5, comment: "Great experience!" }
];

var promotions = [
    { title: "Special Offer", description: "Get 10% off on bridal makeup", expiryDate: "2024-06-30" }
];

// Function to display bookings
function displayBookings() {
    var bookingList = document.getElementById("booking-list");
    bookingList.innerHTML = "";

    bookings.forEach(function (booking) {
        var listItem = document.createElement("div");
        listItem.classList.add("booking-item");
        listItem.innerHTML = "<strong>Date:</strong> " + booking.date + "<br>" +
            "<strong>Time:</strong> " + booking.time + "<br>" +
            "<strong>Customer:</strong> " + booking.customer + "<br>" +
            "<strong>Location:</strong> " + booking.location;
        bookingList.appendChild(listItem);
    });
}

// Function to display customers
function displayCustomers() {
    var customerList = document.getElementById("customer-list");
    customerList.innerHTML = "";

    customers.forEach(function (customer) {
        var listItem = document.createElement("div");
        listItem.classList.add("customer-item");
        listItem.innerHTML = "<strong>Name:</strong> " + customer.name + "<br>" +
            "<strong>Email:</strong> " + customer.email + "<br>" +
            "<strong>Appointments:</strong> " + customer.appointments.join(", ") + "<br>" +
            "<strong>Notes:</strong> " + customer.notes;
        customerList.appendChild(listItem);
    });
}

// Function to display reviews
function displayReviews() {
    var reviewsList = document.getElementById("reviews-list");
    reviewsList.innerHTML = "";

    reviews.forEach(function (review) {
        var listItem = document.createElement("div");
        listItem.classList.add("review-item");
        listItem.innerHTML = "<strong>Customer:</strong> " + review.customer + "<br>" +
            "<strong>Rating:</strong> " + review.rating + "<br>" +
            "<strong>Comment:</strong> " + review.comment;
        reviewsList.appendChild(listItem);
    });
}

// Function to display promotions
function displayPromotions() {
    var promotionsList = document.getElementById("promotions-list");
    promotionsList.innerHTML = "";

    promotions.forEach(function (promotion) {
        var listItem = document.createElement("div");
        listItem.classList.add("promotion-item");
        listItem.innerHTML = "<strong>Title:</strong> " + promotion.title + "<br>" +
            "<strong>Description:</strong> " + promotion.description + "<br>" +
            "<strong>Expiry Date:</strong> " + promotion.expiryDate;
        promotionsList.appendChild(listItem);
    });
}

// Display bookings, customers, reviews, and promotions when page loads
window.addEventListener("load", function () {
    displayBookings();
    displayCustomers();
    displayReviews();
    displayPromotions();
});


// Function to display calendar for the whole year
function displayYearCalendar(year) {
    var calendarDiv = document.getElementById("year-calendar");
    calendarDiv.innerHTML = ""; // Clear previous content

    // Array of month names
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Loop through each month
    for (var month = 0; month < 12; month++) {
        var monthDiv = document.createElement("div");
        monthDiv.classList.add("month");

        // Display month name
        var monthName = document.createElement("div");
        monthName.classList.add("month-name");
        monthName.textContent = monthNames[month];
        monthDiv.appendChild(monthName);

        // Get the number of days in the month
        var daysInMonth = new Date(year, month + 1, 0).getDate();

        // Create a table for the month
        var table = document.createElement("table");
        table.classList.add("month-table");

        // Create table header with weekday names
        var thead = document.createElement("thead");
        var tr = document.createElement("tr");
        for (var i = 0; i < 7; i++) {
            var th = document.createElement("th");
            th.textContent = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        table.appendChild(thead);

        // Calculate starting day of the month
        var firstDay = new Date(year, month, 1).getDay(); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

        // Create table body with days of the month
        var tbody = document.createElement("tbody");
        var row = document.createElement("tr");
        for (var j = 0; j < firstDay; j++) {
            var td = document.createElement("td");
            row.appendChild(td);
        }
        for (var day = 1; day <= daysInMonth; day++) {
            var td = document.createElement("td");
            td.textContent = day;
            row.appendChild(td);
            if ((day + firstDay - 1) % 7 === 0 || day === daysInMonth) {
                tbody.appendChild(row);
                row = document.createElement("tr");
            }
        }
        table.appendChild(tbody);

        // Append table to month div
        monthDiv.appendChild(table);

        // Append month div to calendar div
        calendarDiv.appendChild(monthDiv);
    }
}

// Example usage
window.addEventListener("load", function () {
    displayYearCalendar(2024); // Display calendar for the year 2024
});
