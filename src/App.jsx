import { useState, useEffect } from 'react';
import {
  Code,
  Atom,
  Search,
  BookOpen,
  User,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  ArrowRight,
  Book,
  Calendar,
} from 'lucide-react';

// Main App component
export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Scroll to section logic
    const handleScroll = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth',
        });
        setIsMenuOpen(false); // Close menu on navigation
      }
    };

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => link.addEventListener('click', handleScroll));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleScroll));
    };
  }, []);

  return (
    <div className="bg-gray-50 font-sans antialiased text-gray-800">
      {/* Header with Navigation */}
      <header className="bg-white sticky top-0 z-50 shadow-md">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="font-bold text-xl text-blue-700">dft.codes</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-600 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <div className={`md:flex items-center space-x-6 ${isMenuOpen ? 'block absolute top-16 left-0 w-full bg-white shadow-lg p-4' : 'hidden'}`}>
            <a href="#about" className="nav-link block px-4 py-2 text-gray-600 hover:text-blue-700">About</a>
            <a href="#expertise" className="nav-link block px-4 py-2 text-gray-600 hover:text-blue-700">Expertise</a>
            <a href="#projects" className="nav-link block px-4 py-2 text-gray-600 hover:text-blue-700">Projects</a>
            <a href="#blog" className="nav-link block px-4 py-2 text-gray-600 hover:text-blue-700">Blog</a>
            <a href="#contact" className="nav-link block px-4 py-2 text-gray-600 hover:text-blue-700">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section id="hero" className="bg-blue-600 text-white py-20 md:py-40">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
                Hello, I'm Nishi
              </h1>
              <p className="text-lg md:text-2xl mb-6">
                Computational Materials Scientist specializing in DFT and altermagnetic materials.
              </p>
              <a href="#about" className="nav-link bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition duration-300">
                Learn More <ArrowRight className="inline-block ml-2" size={16} />
              </a>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://placehold.co/600x400/1e3a8a/ffffff?text=Nishi"
                alt="A placeholder image of Nishi"
                className="w-full rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed">
              I am a dedicated computational materials scientist with a strong background in Density Functional Theory (DFT) and its application in advanced materials research. My work focuses on developing and applying automated DFT workflows to analyze the symmetry and topological properties of novel materials, with a particular interest in altermagnetic materials. My goal is to leverage computational methods to predict and understand material properties, accelerating the discovery of materials with unique functionalities for next-generation technologies.
            </p>
          </div>
        </section>

        {/* Expertise Section */}
        <section id="expertise" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">My Expertise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Code className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-semibold mb-2">Computational Modeling</h3>
                <p className="text-gray-600">
                  Proficient in using first-principles calculations to model and predict material behavior.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Atom className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-semibold mb-2">DFT Workflows</h3>
                <p className="text-gray-600">
                  Developing and automating efficient workflows for Density Functional Theory calculations.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Search className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-semibold mb-2">Materials Analysis</h3>
                <p className="text-gray-600">
                  Analyzing symmetry, topological properties, and magnetic order in materials like altermagnets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Recent Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <BookOpen className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-semibold mb-2">DFT Workflow Automation</h3>
                <p className="text-gray-600">
                  A project focused on building an open-source tool to automate DFT calculations for new material discovery.
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 mt-4 hover:underline">
                  Read more <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md">
                <User className="mx-auto text-blue-600 mb-4" size={48} />
                <h3 className="text-2xl font-semibold mb-2">Altermagnetism Research</h3>
                <p className="text-gray-600">
                  Investigating the unique electronic and magnetic properties of altermagnetic materials.
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 mt-4 hover:underline">
                  Read more <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-12">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md text-left">
                <h3 className="text-2xl font-semibold mb-2">The Future of Altermagnetic Materials</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>August 7, 2025</span>
                </div>
                <p className="text-gray-600">
                  Exploring the revolutionary properties of altermagnets and their potential applications in spintronics...
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 mt-4 hover:underline">
                  Read more <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md text-left">
                <h3 className="text-2xl font-semibold mb-2">Automating DFT Workflows with AiiDA</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span>July 25, 2025</span>
                </div>
                <p className="text-gray-600">
                  A guide to setting up and using the AiiDA platform to streamline your computational research...
                </p>
                <a href="#" className="inline-flex items-center text-blue-600 mt-4 hover:underline">
                  Read more <ArrowRight className="ml-2" size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Get In Touch</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              I'm always open to new research collaborations and opportunities. Feel free to connect with me.
            </p>
            <div className="flex justify-center space-x-6">
              <a href="https://github.com/iamnishi347" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors duration-300">
                <Github size={40} />
              </a>
              <a href="mailto:iamnishi347@gmail.com" className="hover:text-blue-200 transition-colors duration-300">
                <Mail size={40} />
              </a>
              {/* You can add a LinkedIn link here if you have one */}
              {/* <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-blue-200 transition-colors duration-300">
                <Linkedin size={40} />
              </a> */}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6 text-center">
        <p>&copy; 2025 Nishi. All rights reserved.</p>
      </footer>
    </div>
  );
}

