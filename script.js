document.addEventListener("DOMContentLoaded", function() {

    // ✨ Kopyalama Fonksiyonu (Bağımsız tanımlandı, dışarıdan çağırılabilir)
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
            console.error("❌ Copy failed!", err);
        });
    }

    // 📌 **Tüm copy ikonlarını seçip click event ekleyelim**
    document.querySelectorAll(".copy-icon").forEach(icon => {
        icon.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const messageId = this.getAttribute("data-message");

            if (targetId && messageId) {
                copyToClipboard(targetId, messageId);
            } else {
                console.error("❌ Copy icon is missing data attributes.");
            }
        });
    });

    // ✨ Type Effect Fonksiyonu
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

    // 📝 Placeholder Effect Ekleyelim
    document.getElementById("name")?.addEventListener("focus", function() {
        typeEffect(this, "Enter your name...", 100);
    });

    document.getElementById("email")?.addEventListener("focus", function() {
        typeEffect(this, "Enter your email...", 100);
    });

    document.getElementById("message")?.addEventListener("focus", function() {
        typeEffect(this, "Write your message here...", 80);
    });

    // ✨ Caps Lock Uyarısı
    const inputs = document.querySelectorAll("input, textarea");
    const warning = document.getElementById("capsWarning");

    if (warning) {
        inputs.forEach(input => {
            input.addEventListener("keyup", function(event) {
                warning.style.display = event.getModifierState("CapsLock") ? "block" : "none";
            });

            input.addEventListener("blur", function() {
                warning.style.display = "none";
            });
        });
    }

    // 🛠 Form Doğrulama ve Gönderme
    const form = document.getElementById("contact-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const name = document.getElementById("name")?.value.trim();
            const email = document.getElementById("email")?.value.trim();
            const message = document.getElementById("message")?.value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            alert("Your message has been sent successfully!");
            form.reset();
        });
    }

    // 🌐 Navbar Scroll Efekti
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector("nav");
        navbar?.classList.toggle("scrolled", window.scrollY > 50);
    });
});