document.addEventListener("DOMContentLoaded", function() {
    function typeEffect(element, text, speed) {
        if (element.getAttribute("data-typed")) return;
        element.setAttribute("data-typed", "true");

        let index = 0;
        function typing() {
            if (index < text.length) {
                element.setAttribute("placeholder", text.substring(0, index + 1));
                index++;
                setTimeout(typing, speed);
            }
        }
        typing();
    }

    document.getElementById("name").addEventListener("focus", function() {
        typeEffect(this, "Enter your name...", 100);
    });

    document.getElementById("email").addEventListener("focus", function() {
        typeEffect(this, "Enter your email...", 100);
    });

    document.getElementById("message").addEventListener("focus", function() {
        typeEffect(this, "Write your message here...", 80);
    });

    // Caps Lock warning
    const inputs = document.querySelectorAll("input, textarea");
    const warning = document.getElementById("capsWarning");

    if (warning) {
        inputs.forEach(input => {
            input.addEventListener("keyup", function(event) {
                if (event.getModifierState("CapsLock")) {
                    warning.style.display = "block";
                } else {
                    warning.style.display = "none";
                }
            });

            input.addEventListener("blur", function() {
                warning.style.display = "none";
            });
        });
    }

    // 🛠 FIXED: Form Validation with Correct Event Handling
    const form = document.getElementById("contact-form");

    if (form) { // Ensure the form exists before adding event listener
        form.addEventListener("submit", function(event) {
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                event.preventDefault(); // Stop form from submitting
                alert("Please fill in all fields.");
                return;
            }

            event.preventDefault(); // Stop actual submission
            alert("Your message has been sent successfully!");
        });
    } else {
        console.error("❌ Form with ID 'contact-form' not found!");
    }
});

// Clipboard Copy Function
function copyToClipboard(elementId, messageId) {
    const textElement = document.getElementById(elementId);
    if (!textElement) {
        console.error(`❌ Element with ID '${elementId}' not found!`);
        return;
    }

    const textToCopy = textElement.textContent.trim();

    navigator.clipboard.writeText(textToCopy).then(() => {
        const message = document.getElementById(messageId);
        if (message) {
            message.style.display = "inline";

            setTimeout(() => {
                message.style.display = "none";
            }, 2000);
        }
    }).catch(err => {
        console.error("Copy failed!", err);
    });
}

// Navbar Scroll Effect
window.addEventListener("scroll", function () {
    const navbar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});



