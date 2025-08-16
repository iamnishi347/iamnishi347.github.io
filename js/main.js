// main.js

document.addEventListener("DOMContentLoaded", function() {
    // Mobile navigation toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPath || 
                (currentPath === '/' && link.getAttribute('href') === 'index.html') ||
                (currentPath.includes('/index.html') && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNav();
    
    // Load recent blog posts on homepage
    if (document.getElementById('recent-posts-container')) {
        loadRecentPosts();
    }
    
    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.area-card, .project-card, .blog-preview-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Load recent blog posts
async function loadRecentPosts() {
    try {
        const response = await fetch('blog/index.json');
        const blogData = await response.json();
        
        if (blogData && blogData.posts) {
            const recentPosts = blogData.posts.slice(0, 3); // Get latest 3 posts
            const container = document.getElementById('recent-posts-container');
            
            if (container) {
                container.innerHTML = '<div class="areas-grid">' + 
                    recentPosts.map(post => createBlogPreviewCard(post)).join('') + 
                    '</div>';
            }
        }
    } catch (error) {
        console.log('Blog posts not available yet');
        // Create placeholder posts
        createPlaceholderPosts();
    }
}

// Create blog preview card
function createBlogPreviewCard(post) {
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    return `
        <div class="blog-preview-card">
            <div class="blog-preview-content">
                <div class="blog-preview-meta">${date} • ${post.category}</div>
                <h3 class="blog-preview-title">
                    <a href="blog/posts/${post.slug}.html">${post.title}</a>
                </h3>
                <p class="blog-preview-excerpt">${post.excerpt}</p>
            </div>
        </div>
    `;
}

// Create placeholder posts for homepage
function createPlaceholderPosts() {
    const placeholderPosts = [
        {
            title: "Introduction to Density Functional Theory",
            excerpt: "A comprehensive overview of DFT principles and applications in computational materials science.",
            category: "DFT",
            date: "2025-01-01",
            slug: "introduction-to-dft"
        },
        {
            title: "Topological Insulators: Theory and Computation",
            excerpt: "Exploring the fascinating world of topological quantum materials using first-principles calculations.",
            category: "Quantum Materials",
            date: "2025-01-05",
            slug: "topological-insulators-theory"
        },
        {
            title: "VASP Tutorial: Electronic Band Structure",
            excerpt: "Step-by-step guide to calculating and analyzing electronic band structures using VASP.",
            category: "Tutorials",
            date: "2025-01-10",
            slug: "vasp-band-structure-tutorial"
        }
    ];
    
    const container = document.getElementById('recent-posts-container');
    if (container) {
        container.innerHTML = '<div class="areas-grid">' + 
            placeholderPosts.map(post => createBlogPreviewCard(post)).join('') + 
            '</div>';
    }
}

// Handle contact form submission
async function handleContactForm(e) {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    try {
        // Here you would typically send the data to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        e.target.reset();
        
    } catch (error) {
        showNotification('Failed to send message. Please try again or contact me directly via email.', 'error');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    requestAnimationFrame(() => {
        notification.style.transform = 'translateX(0)';
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add scroll-based navbar background
window.addEventListener('scroll', throttle(() => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
}, 10));

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Service worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when you add a service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}