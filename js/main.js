// main.js

document.addEventListener("DOMContentLoaded", function () {
    /* ==========================
       Mobile navigation toggle
    ========================== */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        const navLinks = navMenu.querySelectorAll(".nav-link");
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    /* ==========================
       Smooth scrolling
    ========================== */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = document.querySelector(".navbar")?.offsetHeight || 0;
                window.scrollTo({
                    top: target.offsetTop - offset,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ==========================
       Active nav highlighting
    ========================== */
    function updateActiveNav() {
        const currentPath = window.location.pathname.replace("/", "");
        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.remove("active");
            if (
                link.getAttribute("href") === currentPath ||
                (currentPath === "" && link.getAttribute("href") === "index.html")
            ) {
                link.classList.add("active");
            }
        });
    }
    updateActiveNav();

    /* ==========================
       Load homepage blog posts
    ========================== */
    if (document.getElementById("recent-posts-container")) {
        loadRecentPosts();
    }

    /* ==========================
       Contact form
    ========================== */
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", handleContactForm);
    }

    /* ==========================
       Scroll animations
    ========================== */
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document
        .querySelectorAll(".area-card, .project-card, .blog-preview-card")
        .forEach(el => {
            el.style.opacity = "0";
            el.style.transform = "translateY(20px)";
            el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
            observer.observe(el);
        });
});

/* ==========================
   Load recent blog posts
========================== */
async function loadRecentPosts() {
    try {
        const response = await fetch("./blog/index.json");
        const data = await response.json();

        const posts = data.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        const container = document.getElementById("recent-posts-container");
        if (!container) return;

        container.innerHTML = `
            <div class="areas-grid">
                ${posts.map(post => createBlogPreviewCard(post, data.categories)).join("")}
            </div>
        `;
    } catch (err) {
        console.error("Failed to load blog posts:", err);
    }
}

/* ==========================
   Blog preview card
========================== */
function createBlogPreviewCard(post, categories) {
    const date = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    const categoryName =
        categories?.[post.category]?.name || post.category;

    return `
        <div class="blog-preview-card">
            <div class="blog-preview-content">
                <div class="blog-preview-meta">
                    ${date} • ${categoryName}
                </div>
                <h3 class="blog-preview-title">
                    <a href="blog/posts/${post.slug}.html">
                        ${post.title}
                    </a>
                </h3>
                <p class="blog-preview-excerpt">
                    ${post.excerpt}
                </p>
            </div>
        </div>
    `;
}

/* ==========================
   Contact form handler
========================== */
async function handleContactForm(e) {
    e.preventDefault();
    const submitBtn = e.target.querySelector("button[type='submit']");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
        await new Promise(r => setTimeout(r, 1000));
        showNotification("Message sent successfully!", "success");
        e.target.reset();
    } catch {
        showNotification("Failed to send message.", "error");
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

/* ==========================
   Notifications
========================== */
function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === "success" ? "#10b981" : "#ef4444"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        z-index: 9999;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    document.body.appendChild(notification);
    requestAnimationFrame(() => {
        notification.style.transform = "translateX(0)";
    });

    setTimeout(() => {
        notification.style.transform = "translateX(100%)";
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

/* ==========================
   Utilities
========================== */
function throttle(fn, limit) {
    let waiting = false;
    return function () {
        if (!waiting) {
            fn.apply(this, arguments);
            waiting = true;
            setTimeout(() => (waiting = false), limit);
        }
    };
}

/* ==========================
   Navbar scroll effect
========================== */
window.addEventListener(
    "scroll",
    throttle(() => {
        const navbar = document.querySelector(".navbar");
        if (!navbar) return;
        navbar.style.backgroundColor =
            window.scrollY > 50
                ? "rgba(255,255,255,0.98)"
                : "rgba(255,255,255,0.95)";
    }, 10)
);

/* ==========================
   ESC closes mobile menu
========================== */
document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        document.getElementById("hamburger")?.classList.remove("active");
        document.getElementById("nav-menu")?.classList.remove("active");
    }
});
