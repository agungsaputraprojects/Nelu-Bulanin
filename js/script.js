// Main Functions
function openInvitation() {
    const coverPage = document.getElementById("coverPage");
    const mainContent = document.getElementById("mainContent");

    coverPage.style.transform = "translateY(-100vh)";
    coverPage.style.transition =
        "transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    setTimeout(() => {
        coverPage.style.display = "none";
        mainContent.classList.add("active");
        initSmoothScrollAnimations();
        addSmoothScrollEffects();
    }, 1000);
}

function openGoogleMaps() {
    window.open(
        "https://www.google.com/maps/place/Kantor+Perbekel+Desa+Megati/@-8.4962603,115.0550582,17z/data=!3m1!4b1!4m6!3m5!1s0x2dd22fd77746c471:0x8136fc5cd5d6d25b!8m2!3d-8.4962603!4d115.0576331!16s%2Fg%2F11c6qdhhc8?entry=ttu&g_ep=EgoyMDI1MDgxOC4wIKXMDSoASAFQAw%3D%3D",
        "_blank"
    );
}

// Smooth Scroll Animations
function initSmoothScrollAnimations() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: "0px 0px 50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Kurangi delay untuk animasi yang lebih cepat
                const index = Array.from(
                    document.querySelectorAll(".scroll-fade")
                ).indexOf(entry.target);
                entry.target.style.transitionDelay = `${index * 0.05}s`;
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll(".scroll-fade").forEach((el) => {
        observer.observe(el);
    });
}

// Add smooth scroll effects
function addSmoothScrollEffects() {
    let ticking = false;

    function updateSmoothScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        // Smooth parallax effect for background
        const parallaxBg = document.querySelector(".parallax-bg");
        if (parallaxBg) {
            parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
        }

        // Logo Om tetap statis - tidak ada efek parallax atau animasi
        // Ornamen lain dapat bergerak jika diperlukan, tapi logo Om tidak

        // Subtle movement for dividers
        const dividers = document.querySelectorAll(".divider-img");
        dividers.forEach((divider, index) => {
            const movement = Math.sin(scrolled * 0.005 + index) * 3;
            divider.style.transform = `translate3d(${movement}px, 0, 0)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateSmoothScrollEffects);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestTick, { passive: true });
}

// Smooth Particle System
function createSmoothParticle() {
    const particle = document.createElement("div");
    const colors = [
        "rgba(255,215,0,0.4)",
        "rgba(255,140,0,0.3)",
        "rgba(255,165,0,0.3)",
        "rgba(218,165,32,0.4)",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 2;

    particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        animation: float-up ${8 + Math.random() * 4}s ease-out infinite;
        will-change: transform;
    `;

    document.body.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, 12000);
}

// Smooth Button Ripple Effect
function addSmoothRippleEffect(button, event) {
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: smoothRipple 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        pointer-events: none;
    `;

    button.style.position = "relative";
    button.style.overflow = "hidden";
    button.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 800);
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Logo Om tidak perlu delay animasi karena tetap statis
    // Elemen lain tetap menggunakan smooth entrance animations

    // Add smooth hover effects to photos
    const photos = document.querySelectorAll(".baby-photo, .baby-portrait");
    photos.forEach((photo) => {
        photo.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.03) translateY(-3px)";
            this.style.transition =
                "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            this.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.25)";
        });

        photo.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1) translateY(0)";
            this.style.boxShadow = "0 15px 35px rgba(0, 0, 0, 0.2)";
        });
    });

    // Smooth click effect for buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", function (e) {
            addSmoothRippleEffect(this, e);
        });

        // Smooth hover effect
        button.addEventListener("mouseenter", function () {
            this.style.transform = "translateY(-2px)";
            this.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.4)";
        });

        button.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0)";
            this.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.3)";
        });
    });

    // Error handling for images with smooth transitions
    const images = document.querySelectorAll("img");
    images.forEach((img) => {
        img.addEventListener("error", function () {
            console.log(`Failed to load image: ${this.src}`);
            this.style.opacity = "0.5";
            this.style.transition = "opacity 0.5s ease";
        });

        // Smooth image loading
        img.addEventListener("load", function () {
            this.style.opacity = "0";
            this.style.transition = "opacity 0.8s ease";
            setTimeout(() => {
                this.style.opacity = "1";
            }, 100);
        });
    });

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        });
    });

    // Create smooth floating particles
    setInterval(createSmoothParticle, 3000);
    setTimeout(() => setInterval(createSmoothParticle, 4000), 1500);

    // Smooth mouse parallax effect
    let mouseX = 0,
        mouseY = 0;
    let targetX = 0,
        targetY = 0;

    document.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function smoothMouseParallax() {
        targetX += (mouseX - targetX) * 0.02;
        targetY += (mouseY - targetY) * 0.02;

        // Logo Om tetap statis - tidak ada mouse parallax
        // Hanya ornamen lain yang bisa bergerak

        requestAnimationFrame(smoothMouseParallax);
    }

    smoothMouseParallax();

    // Preload images for smooth experience
    const imageUrls = [
        "assets/sanskrit.svg",
        "assets/cover.png",
        "assets/logo.png",
        "assets/foto-prila.png",
        "assets/foto-vinikha.png",
        "assets/divider.png",
    ];

    imageUrls.forEach((url) => {
        const img = new Image();
        img.src = url;
    });
});

// Performance optimization
window.addEventListener("load", function () {
    // Remove loading states
    document.body.classList.remove("loading");

    // Add smooth entrance for visible elements
    const visibleElements = document.querySelectorAll(".cover-content *");
    visibleElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.willChange = "auto";
        }, index * 100 + 2000);
    });

    console.log("Smooth Undangan Digital loaded successfully!");
});

// Smooth touch events for mobile
document.addEventListener(
    "touchstart",
    function (e) {
        const target = e.target;
        if (
            target.tagName === "BUTTON" ||
            target.classList.contains("baby-photo") ||
            target.classList.contains("baby-portrait")
        ) {
            target.style.transform = "scale(0.98)";
            target.style.transition =
                "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

            setTimeout(() => {
                target.style.transform = "";
            }, 200);
        }
    },
    { passive: true }
);

// Smooth resize handler
window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;

    // Smooth responsive adjustments
    if (isMobile) {
        document.body.classList.add("mobile");
        document.body.classList.remove("tablet", "desktop");
    } else if (isTablet) {
        document.body.classList.add("tablet");
        document.body.classList.remove("mobile", "desktop");
    } else {
        document.body.classList.add("desktop");
        document.body.classList.remove("mobile", "tablet");
    }

    // Reinitialize scroll effects on resize
    if (window.initSmoothScrollAnimations) {
        initSmoothScrollAnimations();
    }
});

// Smooth keyboard navigation
document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
        const activeElement = document.activeElement;
        if (activeElement.tagName === "BUTTON") {
            e.preventDefault();
            activeElement.click();

            // Smooth visual feedback
            activeElement.style.transform = "scale(0.98)";
            activeElement.style.transition = "transform 0.1s ease";
            setTimeout(() => {
                activeElement.style.transform = "";
            }, 100);
        }
    }
});

// Accessibility improvements with smooth transitions
function addAccessibilityFeatures() {
    // Add ARIA labels and smooth focus effects
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        if (!button.getAttribute("aria-label")) {
            button.setAttribute("aria-label", button.textContent || "Button");
        }
        button.setAttribute("role", "button");
        button.setAttribute("tabindex", "0");
    });

    // Smooth decorative images
    const decorativeImages = document.querySelectorAll(
        ".ornament-img, .divider-img"
    );
    decorativeImages.forEach((img) => {
        if (!img.getAttribute("alt")) {
            img.setAttribute("alt", "Decorative ornament");
        }
        img.setAttribute("role", "img");
    });

    // Smooth focus management
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusableElements.forEach((element) => {
        element.addEventListener("focus", function () {
            this.style.outline = "2px solid #d2691e";
            this.style.outlineOffset = "2px";
            this.style.transition = "all 0.3s ease";
        });

        element.addEventListener("blur", function () {
            this.style.outline = "";
            this.style.outlineOffset = "";
        });
    });
}

// Page visibility API for smooth performance
document.addEventListener("visibilitychange", function () {
    const elements = document.querySelectorAll("*");
    if (document.hidden) {
        // Pause smooth animations when page is not visible
        elements.forEach((el) => {
            el.style.animationPlayState = "paused";
        });
    } else {
        // Resume smooth animations when page becomes visible
        elements.forEach((el) => {
            el.style.animationPlayState = "running";
        });
    }
});

// Initialize accessibility features
document.addEventListener("DOMContentLoaded", addAccessibilityFeatures);

// Smooth scroll to top function
function smoothScrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
}

// Intersection Observer for smooth lazy loading
const lazyImageObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.style.opacity = "0";
                    img.style.transition = "opacity 0.8s ease";
                    img.src = img.dataset.src;
                    img.onload = () => {
                        img.style.opacity = "1";
                    };
                    img.classList.remove("lazy");
                    lazyImageObserver.unobserve(img);
                }
            }
        });
    },
    {
        rootMargin: "50px",
    }
);

// Apply smooth lazy loading to images
document.querySelectorAll("img[data-src]").forEach((img) => {
    lazyImageObserver.observe(img);
});
