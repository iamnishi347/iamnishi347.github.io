# DFT.codes - Portfolio Website

A modern, responsive portfolio website for **Nishi Prabhat Hazarika**, MSc Physics student at IIT Hyderabad, specializing in Density Functional Theory (DFT) and topological quantum materials.

## 🌐 Live Website
[https://dft.codes](https://dft.codes)

## 📋 Features

### 🎨 Design & UI
- **Responsive Design**: Mobile-first approach with seamless experience across all devices
- **Modern Aesthetics**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and engaging transitions
- **Accessibility**: Keyboard navigation support and semantic HTML structure

### 📝 Blog System
- **Easy Content Management**: Simple JSON-based blog post system
- **Category Filtering**: Filter posts by DFT, Quantum Materials, Tutorials, and Research
- **Search Functionality**: Real-time search through blog content
- **SEO Optimized**: Proper meta tags, structured data, and semantic markup

### 🔬 Academic Focus
- **Research Areas**: Showcasing expertise in computational condensed matter physics
- **Project Portfolio**: Detailed presentation of research projects and implementations
- **Educational Content**: In-depth blog posts about DFT, topological materials, and computational methods

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Git (for cloning and deployment)
- Text editor for content creation

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iamnishi347/iamnishi347.github.io.git
   cd iamnishi347.github.io
   ```

2. Copy all files from the `portfolio-website` folder to your repository root

3. Customize the content (see [Customization Guide](#-customization-guide))

4. Deploy to GitHub Pages

## 📁 Project Structure

```
portfolio-website/
├── index.html              # Homepage
├── about.html              # About page
├── projects.html           # Projects showcase
├── blog.html               # Blog listing page
├── contact.html            # Contact information
├── CNAME                   # Custom domain configuration
├── README.md               # This file
│
├── css/
│   ├── style.css           # Main stylesheet
│   └── blog.css            # Blog-specific styles
│
├── js/
│   ├── main.js             # Core JavaScript functionality
│   └── blog.js             # Blog-specific features
│
├── blog/
│   ├── index.json          # Blog posts metadata
│   └── posts/
│       ├── sample-dft-post.html
│       └── quantum-materials-intro.html
│
├── assets/
│   ├── images/
│   │   ├── profile.jpg     # Your profile photo
│   │   └── projects/       # Project screenshots
│   └── docs/
│       └── cv.pdf          # Your CV/Resume
│
└── projects/
    ├── project1.html       # Individual project pages
    └── project2.html
```

## ✏️ Customization Guide

### 1. Personal Information
Update the following files with your information:

**index.html, about.html, contact.html:**
- Replace "your.email@iith.ac.in" with your actual email
- Update social media links (GitHub, LinkedIn)
- Modify personal descriptions and content

### 2. Profile Image
- Add your profile photo as `assets/images/profile.jpg`
- Recommended size: 300x300px or larger, square aspect ratio
- Ensure good quality and professional appearance

### 3. CV/Resume
- Add your CV as `assets/docs/cv.pdf`
- Update the download link in the about page

### 4. Project Customization
- Add project screenshots to `assets/images/projects/`
- Update `projects.html` with your actual projects
- Create individual project pages in the `projects/` folder

## 📝 Adding Blog Posts

### Method 1: Using the JSON System (Recommended)

1. **Add post metadata** to `blog/index.json`:
   ```json
   {
     "title": "Your Post Title",
     "slug": "your-post-slug",
     "excerpt": "Brief description of your post",
     "date": "2025-01-20",
     "category": "dft",
     "tags": ["DFT", "Your", "Tags"],
     "author": "Nishi Prabhat Hazarika",
     "readTime": "X min read",
     "image": null,
     "featured": false
   }
   ```

2. **Create the post file** as `blog/posts/your-post-slug.html`:
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <!-- Copy head section from existing posts -->
       <title>Your Post Title - DFT.codes</title>
       <!-- Update meta tags -->
   </head>
   <body>
       <!-- Copy navigation from existing posts -->
       
       <main class="blog-post">
           <header class="blog-post-header">
               <h1>Your Post Title</h1>
               <!-- Update meta information -->
           </header>
           
           <div class="blog-post-body">
               <!-- Your content here -->
           </div>
           
           <!-- Copy author info and navigation from existing posts -->
       </main>
       
       <!-- Copy footer from existing posts -->
   </body>
   </html>
   ```

### Method 2: Writing Content

- Use standard HTML for formatting
- Include headings (h2, h3) for structure
- Add code blocks with `<pre><code>` tags
- Use `<blockquote>` for important quotes
- Add equations with the `.equation` class
- Include images in `assets/images/` and reference them appropriately

### Categories Available:
- `dft`: Density Functional Theory
- `quantum-materials`: Quantum Materials
- `tutorials`: Step-by-step guides
- `research`: Research insights

## 🎨 Styling Guidelines

### Colors (CSS Variables)
```css
--primary-color: #2563eb;      /* Main blue */
--secondary-color: #64748b;    /* Gray */
--accent-color: #3b82f6;       /* Light blue */
--text-primary: #1e293b;       /* Dark gray */
--text-secondary: #64748b;     /* Medium gray */
```

### Typography
- Font family: Inter (Google Fonts)
- Headings: 600-700 weight
- Body text: 400 weight
- Code: Monaco, Menlo, monospace

### Components
- Cards: White background, subtle shadow, rounded corners
- Buttons: Primary blue, hover effects, smooth transitions
- Navigation: Fixed header with backdrop blur
- Blog posts: Clean typography, proper spacing

## 🔧 Technical Features

### Performance
- **Optimized Images**: Lazy loading for blog post images
- **Smooth Animations**: CSS transitions and keyframe animations
- **Fast Loading**: Minimal dependencies, optimized CSS/JS

### SEO & Accessibility
- **Semantic HTML**: Proper heading hierarchy and landmark elements
- **Meta Tags**: Comprehensive meta information for each page
- **Open Graph**: Social media sharing optimization
- **Keyboard Navigation**: Full keyboard accessibility support

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

## 🚀 Deployment

### GitHub Pages Setup
1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://yourusername.github.io`

### Custom Domain (dft.codes)
1. Add your domain to the `CNAME` file
2. Configure DNS settings with your domain provider:
   ```
   Type: CNAME
   Name: @
   Value: yourusername.github.io
   ```
3. Enable "Enforce HTTPS" in GitHub Pages settings

## 🔄 Content Update Workflow

### Regular Updates
1. **Blog Posts**: Add new posts following the JSON system
2. **Projects**: Update project showcase with new research
3. **About**: Keep research interests and skills current
4. **CV**: Regular updates to the PDF file

### Version Control
```bash
# Add new content
git add .
git commit -m "Add new blog post: Your Topic"
git push origin main

# Your site will automatically update
```

## 🛠️ Troubleshooting

### Common Issues

**Blog posts not appearing:**
- Check JSON syntax in `blog/index.json`
- Ensure post file name matches the slug
- Verify category names match the filter buttons

**Images not loading:**
- Check file paths are correct
- Ensure images are properly sized
- Verify image formats (JPG, PNG, WebP)

**Mobile responsiveness issues:**
- Test on actual devices
- Use browser dev tools for debugging
- Check CSS media queries

### Browser Console Errors
- Open Developer Tools (F12)
- Check Console tab for JavaScript errors
- Most issues are related to file paths or JSON syntax

## 📚 Educational Content Examples

The website includes sample blog posts covering:

1. **Introduction to DFT**: Theoretical foundations and practical applications
2. **Topological Insulators**: Computational perspectives on quantum materials
3. **VASP Tutorials**: Practical guides for electronic structure calculations
4. **Research Methods**: Advanced computational techniques

## 🤝 Contributing

While this is a personal portfolio, suggestions for improvements are welcome:

1. Open an issue for bugs or feature requests
2. Fork the repository for major changes
3. Follow the existing code style and structure
4. Test thoroughly before submitting pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

For questions about the website or computational physics topics:

- **Email**: your.email@iith.ac.in
- **GitHub**: [@iamnishi347](https://github.com/iamnishi347)
- **Website**: [dft.codes](https://dft.codes)

---

**Built with ❤️ for the computational condensed matter physics community**

*Last updated: January 2025*