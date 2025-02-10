document.addEventListener("DOMContentLoaded", function() {
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('btn-yes');
    const image = document.getElementById('image');
    const text = document.getElementById('text');
    const submitButton = document.querySelector('.form-group button'); // The submit button in the time picker form
    const timePicker = document.getElementById('time-picker'); // Time picker input field
    const selectTimeForm = document.querySelector('.hide-select-time'); // The div containing the time picker form

    console.log("DOM fully loaded and parsed");

    // Check if the user has already answered today
    const valentineAnswered = getCookie("valentineAnswered");
    const timeSubmitted = getCookie("timeSubmitted");
    const currentDate = getCurrentDate();

    console.log("Current Date:", currentDate);
    console.log("Valentine Answered Cookie:", valentineAnswered);
    console.log("Time Submitted Cookie:", timeSubmitted);

    if (valentineAnswered === currentDate && timeSubmitted === "true") {
        // If the user has already answered today and submitted the time, show a message and hide the buttons
        document.querySelector(".button-group").style.display = "none";
        document.getElementById("text").innerText = "You’ve already answered today Love! 😊";
        document.getElementById("image").src = "/Images/waiting.gif"; // Show an appropriate image (optional)
    } else if (valentineAnswered === currentDate) {
        // If the user has already answered today but not submitted the time, show the time picker form
        document.querySelector(".button-group").style.display = "none";
        document.querySelector('.hide-select-time').style.display = "block";
        document.getElementById("text").innerText = "Yayy, I love you! 💖";
        document.getElementById("image").src = "/Images/1.gif"; // Change image to 1.gif

        // Initialize Flatpickr for time picking
        flatpickr("#time-picker", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K", // 12-hour format with AM/PM
            time_24hr: false // Disable 24-hour format
        });
    }

    function getRandomPosition() {
        const maxX = window.innerWidth - noButton.offsetWidth;
        const maxY = window.innerHeight - noButton.offsetHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        return { x: randomX, y: randomY };
    }

    noButton.addEventListener('mouseover', function() {
        const newPosition = getRandomPosition();
        noButton.style.left = `${newPosition.x}px`;
        noButton.style.top = `${newPosition.y}px`;
    });

    noButton.addEventListener('click', function() {
        const newPosition = getRandomPosition();
        noButton.style.left = `${newPosition.x}px`;
        noButton.style.top = `${newPosition.y}px`;
    });

    // Handle the "Yes" button click
    yesButton.addEventListener("click", function() {
        console.log("Yes button clicked");
        setCookie("valentineAnswered", currentDate, 1); // Set cookie for today
        document.querySelector(".button-group").style.display = "none"; // Hide buttons
        document.getElementById("text").innerText = "Yayy, I love youu! 💖";
        document.getElementById("image").src = "/Images/1.gif"; // Change image to 1.gif

        // Show the time picker input field
        document.querySelector('.hide-select-time').style.display = "block"; // Make the form group visible

        // Initialize Flatpickr for time picking
        flatpickr("#time-picker", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "h:i K", // 12-hour format with AM/PM
            time_24hr: false // Disable 24-hour format
        });
    });

    // Handle the "No" button click
    noButton.addEventListener("click", function() {
        console.log("No button clicked");
        setCookie("valentineAnswered", currentDate, 1); // Set cookie for today
        document.querySelector(".button-group").style.display = "none"; // Hide buttons
        document.getElementById("text").innerText = "Maybe next time! 😢";
        document.getElementById("image").src = "/Images/4.gif"; // Change image to 4.gif
    });

    // Handle the Submit button click (when time is selected)
    submitButton.addEventListener('click', function(event) {
        const selectedTime = timePicker.value;

        if (!selectedTime) {
            // If no time is selected, show an alert to prompt the user to select a time
            alert("Please select time first before submitting!");
        } else {
            // If time is selected, show a confirmation alert
            alert("Your answer has been sent to Kim Narvasa's email.");

            // Change image to 6.gif and update text
            image.src = "/Images/3.gif";
            text.innerText = "Can’t wait to see you soon, Love!";

            // Hide the time picker form after successful submission
            selectTimeForm.style.display = "none";

            // Set cookie to indicate that the time has been submitted
            setCookie("timeSubmitted", "true", 1);
        }
    });
});

// Helper function to set a cookie
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); // Set expiration time
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Helper function to get a cookie value
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Helper function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
    var day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
    return year + "-" + month + "-" + day;
}
