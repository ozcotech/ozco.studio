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

    // Form Submit and Reset Functionality
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault(); // Stop the default form submission behavior

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields."); // Alert if fields are empty
                return;
            }

            alert("Your message has been sent successfully!"); // Success message
            form.reset(); // Clear the form fields
        });
    }
});