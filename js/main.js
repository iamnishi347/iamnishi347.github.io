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

        navMenu.querySelectorAll(".nav-link").forEach(link => {
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
            const id = this.getAttribute("href");
            if (id === "#") return;

            const target = document.querySelector(id);
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
    const currentPath = window.location.pathname.replace("/", "");
    document.querySelectorAll(".nav-link").forEach(link => {
        if (
            link.getAttribute("href") === currentPath ||
            (currentPath === "" && link.getAttribute("href") === "index.html")
        ) {
            link.classList.add("active");
        }
    });

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
        { threshold: 0.1 }
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
        const res = await fetch("./blog/index.json");
        const data = await res.json();

        const posts = data.posts
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);

        renderPosts(posts, data.categories);
    } catch (err) {
        console.warn("Using fallback blog posts");
        renderPosts(getFallbackPosts(), fallbackCategories);
    }
}

/* ==========================
   Render posts
========================== */
function renderPosts(posts, categories) {
    const container = document.getElementById("recent-posts-container");
    if (!container) return;

    container.innerHTML = `
        <div class="areas-grid">
            ${posts.map(p => createBlogPreviewCard(p, categories)).join("")}
        </div>
    `;

    // 🔥 FIX: reveal blog cards (they were invisible)
    const cards = container.querySelectorAll(".blog-preview-card");
    cards.forEach(card => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
    });
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

    const category =
        categories?.[post.category]?.name || post.category;

    return `
        <div class="blog-preview-card">
            <div class="blog-preview-content">
                <div class="blog-preview-meta">
                    ${date} • ${category}
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
   FALLBACK POSTS (CORRECT)
========================== */
function getFallbackPosts() {
    return [
        {
            title: "Introduction to Density Functional Theory in Computational Physics",
            slug: "introduction-to-dft",
            excerpt: "Exploring the fundamentals of DFT and its applications in predicting material properties from first principles.",
            date: "2025-01-15",
            category: "dft"
        },
        {
            title: "Topological Insulators: A Computational Perspective",
            slug: "topological-insulators-computational",
            excerpt: "Understanding topological phases of matter through advanced computational methods and band structure analysis.",
            date: "2025-01-10",
            category: "quantum-materials"
        },
        {
            title: "VASP Tutorial: Calculating Electronic Properties",
            slug: "vasp-tutorial-electronic-properties",
            excerpt: "Step-by-step guide to using VASP for electronic structure calculations.",
            date: "2025-01-05",
            category: "tutorials"
        }
    ];
}

const fallbackCategories = {
    "dft": { name: "Density Functional Theory" },
    "quantum-materials": { name: "Quantum Materials" },
    "tutorials": { name: "Tutorials" }
};

/* ==========================
   Contact form
========================== */
async function handleContactForm(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button[type='submit']");
    const text = btn.textContent;

    btn.textContent = "Sending...";
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 1000));

    showNotification("Message sent successfully!", "success");
    e.target.reset();

    btn.textContent = text;
    btn.disabled = false;
}

/* ==========================
   Notification
========================== */
function showNotification(message, type) {
    const n = document.createElement("div");
    n.textContent = message;
    n.style.cssText = `
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
    document.body.appendChild(n);
    requestAnimationFrame(() => n.style.transform = "translateX(0)");
    setTimeout(() => {
        n.style.transform = "translateX(100%)";
        setTimeout(() => n.remove(), 300);
    }, 4000);
}
