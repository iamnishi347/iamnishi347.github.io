// blog.js

document.addEventListener("DOMContentLoaded", function() {
    // Initialize blog functionality
    initializeBlog();
    
    // Load blog posts if on blog page
    if (document.getElementById('blog-posts')) {
        loadBlogPosts();
    }
    
    // Setup search functionality
    setupBlogSearch();
    
    // Setup filter functionality
    setupBlogFilters();
});

let allBlogPosts = [];
let filteredPosts = [];
let currentCategory = 'all';
let searchQuery = '';

// Initialize blog functionality
function initializeBlog() {
    // Create search input if not exists
    const blogHeader = document.querySelector('.blog-header');
    if (blogHeader && !document.querySelector('.blog-search')) {
        const searchHTML = `
            <div class="blog-search">
                <input type="text" id="blog-search-input" placeholder="Search blog posts...">
                <span class="search-icon">🔍</span>
            </div>
        `;
        blogHeader.insertAdjacentHTML('afterend', searchHTML);
    }
}

// Load blog posts
async function loadBlogPosts() {
    try {
        const response = await fetch('blog/index.json');
        const blogData = await response.json();
        
        if (blogData && blogData.posts) {
            allBlogPosts = blogData.posts;
            filteredPosts = [...allBlogPosts];
            renderBlogPosts(filteredPosts);
        } else {
            createSampleBlogPosts();
        }
    } catch (error) {
        console.log('Blog index not found, creating sample posts');
        createSampleBlogPosts();
    }
}

// Create sample blog posts for demonstration
function createSampleBlogPosts() {
    const samplePosts = [
        {
            title: "Introduction to Density Functional Theory in Computational Physics",
            slug: "introduction-to-dft",
            excerpt: "Exploring the fundamentals of DFT and its applications in predicting material properties from first principles.",
            content: "Full content would be loaded from individual post files...",
            date: "2025-01-15",
            category: "dft",
            tags: ["DFT", "Theory", "Computational Physics"],
            author: "Nishi Prabhat Hazarika",
            readTime: "8 min read",
            image: null
        },
        {
            title: "Topological Insulators: A Computational Perspective",
            slug: "topological-insulators-computational",
            excerpt: "Understanding topological phases of matter through advanced computational methods and band structure analysis.",
            content: "Full content would be loaded from individual post files...",
            date: "2025-01-10",
            category: "quantum-materials",
            tags: ["Topological Insulators", "Band Structure", "Quantum Materials"],
            author: "Nishi Prabhat Hazarika",
            readTime: "12 min read",
            image: null
        },
        {
            title: "VASP Tutorial: Calculating Electronic Properties",
            slug: "vasp-tutorial-electronic-properties",
            excerpt: "Step-by-step guide to using VASP for electronic structure calculations, including practical examples and best practices.",
            content: "Full content would be loaded from individual post files...",
            date: "2025-01-05",
            category: "tutorials",
            tags: ["VASP", "Tutorial", "Electronic Structure"],
            author: "Nishi Prabhat Hazarika",
            readTime: "15 min read",
            image: null
        },
        {
            title: "Berry Curvature and Topological Invariants",
            slug: "berry-curvature-topological-invariants",
            excerpt: "Deep dive into the mathematical foundations of topology in condensed matter physics and computational methods to calculate topological invariants.",
            content: "Full content would be loaded from individual post files...",
            date: "2024-12-28",
            category: "research",
            tags: ["Berry Curvature", "Topology", "Quantum Geometry"],
            author: "Nishi Prabhat Hazarika",
            readTime: "10 min read",
            image: null
        },
        {
            title: "Phonon Calculations Using Density Functional Perturbation Theory",
            slug: "phonon-calculations-dfpt",
            excerpt: "Understanding vibrational properties of materials through DFPT calculations and their implications for thermal transport.",
            content: "Full content would be loaded from individual post files...",
            date: "2024-12-20",
            category: "dft",
            tags: ["DFPT", "Phonons", "Thermal Properties"],
            author: "Nishi Prabhat Hazarika",
            readTime: "11 min read",
            image: null
        },
        {
            title: "Machine Learning in Materials Discovery",
            slug: "machine-learning-materials-discovery",
            excerpt: "How machine learning algorithms are revolutionizing computational materials science and accelerating materials discovery.",
            content: "Full content would be loaded from individual post files...",
            date: "2024-12-15",
            category: "research",
            tags: ["Machine Learning", "Materials Discovery", "AI"],
            author: "Nishi Prabhat Hazarika",
            readTime: "9 min read",
            image: null
        }
    ];
    
    allBlogPosts = samplePosts;
    filteredPosts = [...allBlogPosts];
    renderBlogPosts(filteredPosts);
    
    // Update the blog index file
    updateBlogIndex(samplePosts);
}

// Render blog posts
function renderBlogPosts(posts) {
    const container = document.getElementById('blog-posts');
    if (!container) return;
    
    if (posts.length === 0) {
        container.innerHTML = `
            <div class="no-posts">
                <h3>No posts found</h3>
                <p>Try adjusting your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = posts.map(post => createBlogPostCard(post)).join('');
}

// Create blog post card
function createBlogPostCard(post) {
    const date = new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const categoryDisplay = {
        'dft': 'DFT',
        'quantum-materials': 'Quantum Materials',
        'tutorials': 'Tutorials',
        'research': 'Research'
    };
    
    return `
        <article class="blog-post-card" data-category="${post.category}">
            <div class="blog-post-image">
                ${post.image ? 
                    `<img src="${post.image}" alt="${post.title}" loading="lazy">` :
                    `<div class="placeholder">📊</div>`
                }
            </div>
            <div class="blog-post-content">
                <div class="blog-post-meta">
                    <span class="blog-post-date">${date}</span>
                    <span class="blog-post-category">${categoryDisplay[post.category] || post.category}</span>
                    ${post.readTime ? `<span class="blog-post-read-time">${post.readTime}</span>` : ''}
                </div>
                <h2 class="blog-post-title">
                    <a href="blog/posts/${post.slug}.html">${post.title}</a>
                </h2>
                <p class="blog-post-excerpt">${post.excerpt}</p>
                ${post.tags ? `
                    <div class="blog-post-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
                <a href="blog/posts/${post.slug}.html" class="read-more">Read More</a>
            </div>
        </article>
    `;
}

// Setup blog search
function setupBlogSearch() {
    const searchInput = document.getElementById('blog-search-input');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce((e) => {
        searchQuery = e.target.value.toLowerCase();
        filterPosts();
    }, 300));
}

// Setup blog filters
function setupBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update current category
            currentCategory = btn.getAttribute('data-category');
            filterPosts();
        });
    });
}

// Filter posts based on category and search
function filterPosts() {
    filteredPosts = allBlogPosts.filter(post => {
        const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
        const matchesSearch = searchQuery === '' || 
            post.title.toLowerCase().includes(searchQuery) ||
            post.excerpt.toLowerCase().includes(searchQuery) ||
            (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchQuery)));
        
        return matchesCategory && matchesSearch;
    });
    
    renderBlogPosts(filteredPosts);
}

// Update blog index file (for development)
function updateBlogIndex(posts) {
    const blogIndex = {
        site: {
            title: "DFT.codes - Nishi Prabhat Hazarika",
            description: "Blog about Density Functional Theory, Topological Quantum Materials, and Computational Condensed Matter Physics",
            author: "Nishi Prabhat Hazarika",
            url: "https://dft.codes"
        },
        posts: posts.sort((a, b) => new Date(b.date) - new Date(a.date))
    };
    
    // This would typically be done server-side
    console.log('Blog index updated:', blogIndex);
}

// Generate blog post file
function generateBlogPost(post) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} - DFT.codes</title>
    <meta name="description" content="${post.excerpt}">
    <meta name="keywords" content="${post.tags ? post.tags.join(', ') : ''}">
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/blog.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="canonical" href="https://dft.codes/blog/posts/${post.slug}.html">
</head>
<body>
    <nav class="navbar">
        <div class="nav-container">
            <div class="nav-logo">
                <a href="../../index.html">Nishi P. Hazarika</a>
            </div>
            <div class="nav-menu" id="nav-menu">
                <a href="../../index.html" class="nav-link">Home</a>
                <a href="../../about.html" class="nav-link">About</a>
                <a href="../../projects.html" class="nav-link">Projects</a>
                <a href="../../blog.html" class="nav-link active">Blog</a>
                <a href="../../contact.html" class="nav-link">Contact</a>
            </div>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </nav>

    <main class="blog-post">
        <header class="blog-post-header">
            <h1>${post.title}</h1>
            <div class="meta">
                <span>By ${post.author}</span>
                <span>${new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                ${post.readTime ? `<span>${post.readTime}</span>` : ''}
            </div>
            ${post.tags ? `
                <div class="blog-post-tags">
                    ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                </div>
            ` : ''}
        </header>

        <div class="blog-post-body">
            ${post.content || `
                <p>This is a sample blog post about ${post.title.toLowerCase()}. The actual content would be written in markdown or HTML and stored in individual post files.</p>
                
                <h2>Introduction</h2>
                <p>This post explores the fascinating world of computational condensed matter physics, specifically focusing on the topics covered in the title.</p>
                
                <h2>Key Concepts</h2>
                <ul>
                    <li>First-principles calculations</li>
                    <li>Electronic structure theory</li>
                    <li>Computational methods</li>
                    <li>Materials properties</li>
                </ul>
                
                <h2>Conclusion</h2>
                <p>Understanding these concepts is crucial for advancing our knowledge in computational materials science and developing new materials with desired properties.</p>
            `}
        </div>

        <div class="author-info">
            <h3>About the Author</h3>
            <p>Nishi Prabhat Hazarika is an MSc Physics student at IIT Hyderabad specializing in computational condensed matter physics, with focus on density functional theory and topological quantum materials.</p>
        </div>

        <div class="blog-navigation">
            <div class="nav-prev">
                <div class="nav-label">Previous Post</div>
                <a href="#">Previous Article</a>
            </div>
            <div class="nav-next">
                <div class="nav-label">Next Post</div>
                <a href="#">Next Article</a>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Nishi Prabhat Hazarika. All rights reserved.</p>
            <div class="social-links">
                <a href="mailto:your.email@iith.ac.in">Email</a>
                <a href="https://github.com/iamnishi347">GitHub</a>
                <a href="https://linkedin.com/in/yourprofile">LinkedIn</a>
            </div>
        </div>
    </footer>

    <script src="../../js/main.js"></script>
</body>
</html>`;
}

// Utility function for debouncing
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

// Export functions for potential use in other scripts
window.blogUtils = {
    generateBlogPost,
    createBlogPostCard,
    updateBlogIndex
};