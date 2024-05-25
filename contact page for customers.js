document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // You can add your logic here to send the contact form data to your server
    // For the sake of this example, let's just display a response message
    var responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Thank you, " + name + ". We have received your message.";
    responseDiv.style.backgroundColor = "#dff0d8"; // Bootstrap success color
    responseDiv.style.border = "1px solid #d0e9c6"; // Bootstrap success color
    responseDiv.style.color = "#3c763d"; // Bootstrap success color
});
