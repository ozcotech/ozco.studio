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
});

function copyToClipboard(elementId, messageId) {
    const textElement = document.getElementById(elementId);
    const textToCopy = textElement.textContent.trim(); // Trim ile boşlukları kaldır

    navigator.clipboard.writeText(textToCopy).then(() => {
        const message = document.getElementById(messageId);
        message.style.display = "inline"; // Show "Copied!" message

        setTimeout(() => {
            message.style.display = "none"; // Hide after 2 seconds
        }, 2000);
    }).catch(err => {
        console.error("Copy failed!", err);
    });
}