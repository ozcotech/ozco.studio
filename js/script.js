document.addEventListener("DOMContentLoaded", function() {
    // ===== NAVBAR FUNCTIONALITY =====
    // Select all navigation links for event handling
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Clean up any unwanted navigation elements that might appear outside the nav container
    const cleanupUnwantedNavLinks = () => {
        const unwantedNavLinks = document.querySelectorAll('body > .nav-links:not(nav .nav-links)');
        if (unwantedNavLinks.length > 0) {
            unwantedNavLinks.forEach(element => {
                element.style.display = 'none';
            });
        }
    };
    
    // Run cleanup on page load
    cleanupUnwantedNavLinks();
    
    // Mark the active page in the navigation
    const currentUrl = window.location.href;
    navLinks.forEach(link => {
        if (currentUrl.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Typewriter effect for the motivational quote - continuously looping
    function typewriterEffect(text) {
        const quoteElement = document.getElementById('index-quote');
        if (!quoteElement) return;
        
        // Format the quote with a line break for better display
        // Break after "best" to create two balanced lines
        const formattedText = "Technology is best\nwhen it brings people together.";
        
        let i = 0;
        const typingSpeed = 80;  // Typing speed milliseconds
        const pauseTime = 2000;  // Pause time at the end
        const deletingSpeed = 40; // Deleting speed milliseconds
        
        function typing() {
            if (i < formattedText.length) {
                // Replace newline character with <br> for HTML
                if (formattedText.charAt(i) === '\n') {
                    quoteElement.innerHTML += '<br>';
                } else {
                    quoteElement.innerHTML += formattedText.charAt(i);
                }
                i++;
                setTimeout(typing, typingSpeed);
            } else {
                setTimeout(erasing, pauseTime); // Wait before erasing
            }
        }
        
        function erasing() {
            if (i > 0) {
                // Remove one character at a time, handling HTML tags for line breaks
                const currentContent = quoteElement.innerHTML;
                if (currentContent.endsWith('<br>')) {
                    quoteElement.innerHTML = currentContent.slice(0, -4); // Remove <br>
                    i--;
                } else {
                    quoteElement.innerHTML = currentContent.slice(0, -1); // Remove one character
                    i--;
                }
                setTimeout(erasing, deletingSpeed);
            } else {
                setTimeout(typing, 500); // Wait before typing again
            }
        }
        
        // Start with empty content to allow the typewriter effect
        quoteElement.innerHTML = '';
        
        // Start the typing effect
        typing();
    }
    
    // Fix homepage size and viewport settings
    function fixHomePageSize() {
        const isHomePage = document.body.classList.contains('home');
        
        if (isHomePage) {
            // Check for viewport meta tag or create it if missing
            let viewportMeta = document.querySelector('meta[name="viewport"]');
            if (!viewportMeta) {
                viewportMeta = document.createElement('meta');
                viewportMeta.setAttribute('name', 'viewport');
                document.head.appendChild(viewportMeta);
            }
            
            // Set appropriate viewport settings
            viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            
            // Adjust content wrapper dimensions
            const contentWrapper = document.querySelector('.content-wrapper');
            if (contentWrapper) {
                contentWrapper.style.maxWidth = '100%';
                contentWrapper.style.width = '100%';
                contentWrapper.style.boxSizing = 'border-box';
                contentWrapper.style.margin = '0 auto';
                contentWrapper.style.padding = '10px';
            }
        }
    }
    
    // Fix page sizes immediately
    fixHomePageSize();
    
    // Handle responsive layout adjustments
    function handleResponsiveLayout() {
        const isMobile = window.innerWidth <= 768;
        const contentWrapper = document.querySelector('.content-wrapper');
        
        if (isMobile) {
            // Apply mobile-specific padding to content
            if (contentWrapper) {
                contentWrapper.style.paddingTop = '10px';
            }
        } else {
            // Apply desktop-specific padding to content
            if (contentWrapper) {
                contentWrapper.style.paddingTop = '20px';
            }
        }
    }
    
    // Run responsive layout handler on page load
    handleResponsiveLayout();
    
    // Update layout on window resize or device rotation
    window.addEventListener('resize', function() {
        cleanupUnwantedNavLinks();
        fixHomePageSize();
        handleResponsiveLayout();
    });
    
    // ===== COPY TO CLIPBOARD FUNCTIONALITY =====
    // Function to copy element text to clipboard
    function copyToClipboard(elementId, messageId) {
        const textElement = document.getElementById(elementId);
        if (!textElement) {
            console.error(`Element with ID '${elementId}' not found!`);
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

    // Add click event listeners to all copy icons
    document.querySelectorAll(".copy-icon").forEach(icon => {
        icon.addEventListener("click", function() {
            const targetId = this.getAttribute("data-target");
            const messageId = this.getAttribute("data-message");

            if (targetId && messageId) {
                copyToClipboard(targetId, messageId);
            } else {
                console.error("Copy icon is missing data attributes.");
            }
        });
    });

    // ===== FORM TYPING EFFECT =====
    // Function to create typing effect on form fields
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

    // Apply typing effect to form fields on focus
    document.getElementById("name")?.addEventListener("focus", function() {
        typeEffect(this, "Enter your name...", 100);
    });

    document.getElementById("email")?.addEventListener("focus", function() {
        typeEffect(this, "Enter your email...", 100);
    });

    document.getElementById("message")?.addEventListener("focus", function() {
        typeEffect(this, "Write your message here...", 80);
    });

    // ===== CAPS LOCK WARNING =====
    // Add warning when Caps Lock is on during form input
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

    // ===== FORM VALIDATION =====
    // Handle form submission with validation
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

    // ===== NAVBAR SCROLL EFFECT =====
    // Add visual feedback when scrolling
    window.addEventListener("scroll", function () {
        const navbar = document.querySelector("nav");
        navbar?.classList.toggle("scrolled", window.scrollY > 50);
    });
    
    // ===== LOAD INDEX PAGE CONTENT =====
    // Fetch and display home page content from JSON file
    if (document.querySelector(".home")) {
        fetch("data/index.json")
            .then(response => response.json())
            .then(data => {
                document.getElementById("index-title").innerText = data.title;
                document.getElementById("index-description").innerText = data.description;
                
                // Use the quote from JSON but it will be formatted with a line break in the typewriterEffect function
                typewriterEffect(data.quote);
                
                // Adjust vertical spacing between elements
                const elements = [
                    document.getElementById("index-title"),
                    document.getElementById("index-description")
                ];
                
                // Apply tighter spacing
                elements.forEach(elem => {
                    if (elem) {
                        elem.style.marginBottom = "10px";
                        elem.style.marginTop = "5px";
                    }
                });
            })
            .catch(error => console.error("Index content loading failed:", error));
    }
    
    // About sayfası içeriği
    const aboutTitle = document.getElementById("about-title");
    const aboutContent = document.getElementById("about-content");
    
    if (aboutTitle && aboutContent) {
        fetch("data/about.json") 
            .then(response => response.json())
            .then(data => {
                aboutTitle.innerText = data.title;
                aboutContent.innerHTML = data.content.replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>");
            })
            .catch(error => console.error("Error loading about content:", error));
    }
    
    // Project3 içeriği
    const projectTitle = document.getElementById("project-title");
    if (projectTitle) {
        fetch("data/project3.json")
            .then(response => response.json())
            .then(data => {
                const lang = document.documentElement.lang === "tr" ? "tr" : "en";
                
                projectTitle.textContent = data[`title_${lang}`];
                
                // Diğer proje içeriklerini doldur
                const elements = [
                    "project-introduction", "phase-1-title", "phase-1-description",
                    "phase-2-title", "phase-2-description", "example", 
                    "final-stage-title", "final-stage-description",
                    "business-model", "future-potential", "conclusion"
                ];
                
                elements.forEach(id => {
                    const element = document.getElementById(id);
                    if (element && data[`${id.replace(/-/g, "_")}_${lang}`]) {
                        element.textContent = data[`${id.replace(/-/g, "_")}_${lang}`];
                    }
                });
                
                // Liste oluşturanlar için özel işlem
                const lists = {
                    "target-audience": "target_audience",
                    "ai-capabilities": "ai_capabilities"
                };
                
                for (const [listId, dataKey] of Object.entries(lists)) {
                    const list = document.getElementById(listId);
                    if (list && data[`${dataKey}_${lang}`]) {
                        list.innerHTML = "";
                        data[`${dataKey}_${lang}`].forEach(item => {
                            const li = document.createElement("li");
                            li.innerHTML = item;
                            list.appendChild(li);
                        });
                    }
                }
            })
            .catch(error => console.error("JSON yüklenirken hata oluştu:", error));
    }
    
    // SSL durumu kontrolü
    const secureConnection = document.getElementById('secure-connection');
    if (secureConnection) {
        if (window.location.protocol === 'https:') {
            secureConnection.style.color = '#4CAF50';
        } else {
            secureConnection.style.color = '#F44336';
            secureConnection.innerHTML = '<img src="assets/icons/unlock-icon.svg" alt="Insecure Connection" class="security-icon"> Insecure Connection';
        }
    }

    // Content wrapper height ayarlaması
    function adjustContentHeight() {
        const contentWrapper = document.querySelector('.content-wrapper');
        if (!contentWrapper) return;
        
        const windowHeight = window.innerHeight;
        const footerHeight = document.querySelector('footer')?.offsetHeight || 0;
        
        // Minimum içerik yüksekliği ayarı
        contentWrapper.style.minHeight = `${windowHeight - footerHeight - 60}px`; // 60px navbar için
    }
    
    adjustContentHeight();
    window.addEventListener('resize', adjustContentHeight);
});