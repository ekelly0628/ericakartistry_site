// Ensure this function is in your script.js file

function sendMail() {
    // Collect all parameters from the "Book Me" form
    let parms = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        service: document.getElementById("Service").value, // Corrected from 'subject' to 'service'
        // Add a general message field if you want one for booking
        // booking_message: document.getElementById("bookingMessage").value,
    };

    emailjs.send("service_hfr7z7b", "template_i2o4wzb", parms)
        .then(() => {
            alert("Your session has been successfully booked! Please check your email for confirmation and details.");
            // Clear the form fields after successful submission for better UX
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("date").value = "";
            document.getElementById("time").value = "";
            document.getElementById("Service").value = "--Choose a Service--"; // Reset dropdown
            // If you added a booking_message field, clear it here:
            // document.getElementById("bookingMessage").value = "";
        })
        .catch((error) => {
            console.error("Error booking session:", error); // Use console.error for better error logging
            alert("Failed to book session. Please try again. (Check console for details)"); // More user-friendly alert
        });
}

// Add an event listener to the form to prevent default submission and call sendMail
document.addEventListener('DOMContentLoaded', (event) => {
    const bookingForm = document.getElementById('ScheduleSession');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the default form submission (page reload)
            sendMail(); // Call your EmailJS function
        });
    }
});