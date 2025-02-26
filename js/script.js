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
    
    // 📄 Index Sayfası İçeriğini Yükle
    if (document.querySelector(".home")) {
        fetch("data/index.json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("index-title").innerText = data.title;
                document.getElementById("index-description").innerText = data.description;
                document.getElementById("index-quote").innerText = data.quote;
            })
            .catch(error => console.error("Index content loading failed:", error));
    }
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/about.json") 
        .then(response => response.json())
        .then(data => {
            document.getElementById("about-title").innerText = data.title;
            document.getElementById("about-content").innerHTML = data.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
        })
        .catch(error => console.error("Error loading about content:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    fetch("data/project3.json")  // JSON dosyanın yolunu kontrol et
        .then(response => response.json())
        .then(data => {
            const lang = document.documentElement.lang === "tr" ? "tr" : "en"; // Dil belirleme (TR veya EN)

            document.getElementById("project-title").textContent = data[`title_${lang}`];
            document.getElementById("project-introduction").textContent = data[`introduction_${lang}`];
            
            document.getElementById("phase-1-title").textContent = data[`phase_1_title_${lang}`];
            document.getElementById("phase-1-description").textContent = data[`phase_1_description_${lang}`];

            // Hedef kitleyi liste halinde ekleme
            const targetAudienceList = document.getElementById("target-audience");
            targetAudienceList.innerHTML = ""; // Önce temizle
            data[`target_audience_${lang}`].forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = item;
                targetAudienceList.appendChild(li);
            });

            document.getElementById("phase-2-title").textContent = data[`phase_2_title_${lang}`];
            document.getElementById("phase-2-description").textContent = data[`phase_2_description_${lang}`];

            // Örnek cümleyi alıntı (blockquote) içinde göster
            document.getElementById("example").textContent = data[`example_${lang}`];

            // Yapay zeka yeteneklerini liste halinde ekleme
            const aiCapabilitiesList = document.getElementById("ai-capabilities");
            aiCapabilitiesList.innerHTML = ""; // Önce temizle
            data[`ai_capabilities_${lang}`].forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = item;
                aiCapabilitiesList.appendChild(li);
            });

            document.getElementById("final-stage-title").textContent = data[`final_stage_${lang}`];
            document.getElementById("final-stage-description").textContent = data[`final_stage_description_${lang}`];

            document.getElementById("business-model").textContent = data[`business_model_${lang}`];
            document.getElementById("future-potential").textContent = data[`future_potential_${lang}`];
            document.getElementById("conclusion").textContent = data[`conclusion_${lang}`];

        })
        .catch(error => console.error("JSON yüklenirken hata oluştu:", error));
});