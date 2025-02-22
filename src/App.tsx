import React, { useState, useEffect, useCallback } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  Medal,
  GraduationCap,
  Trophy,
  Loader2,
  Send,
  ChevronRight,
  Briefcase
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './lib/supabase';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'internships', label: 'Internships' },
  { id: 'blogs', label: 'Blogs' },
  { id: 'contact', label: 'Contact' }
];

const blogPosts = [
  {
    title: "AI in Healthcare: Transforming Patient Care and Medical Research",
    url: "https://ruthwikredd.blogspot.com/2024/08/ai-in-healthcare-transforming-patient.html",
    description: "Exploring how artificial intelligence is revolutionizing healthcare delivery and medical research.",
    icon: "stethoscope"
  },
  {
    title: "Introduction to Machine Learning: A Beginner's Guide",
    url: "https://ruthwikredd.blogspot.com/2024/08/introduction-to-machine-learning.html",
    description: "A comprehensive guide to understanding the basics of machine learning and its applications.",
    icon: "brain"
  },
  {
    title: "Cybersecurity in the Age of AI: Challenges and Solutions",
    url: "https://ruthwikredd.blogspot.com/2024/08/cybersecurity-in-age-of-ai-challenges.html",
    description: "Analyzing the intersection of AI and cybersecurity in today's digital landscape.",
    icon: "shield"
  },
  {
    title: "Why Python is the Best Language for Beginners",
    url: "https://ruthwikredd.blogspot.com/2024/08/why-python-is-best-language-for.html",
    description: "Understanding why Python has become the go-to programming language for beginners.",
    icon: "code"
  },
  {
    title: "5G Technology: How It Will Transform Industries",
    url: "https://ruthwikredd.blogspot.com/2024/08/5g-technology-how-it-will-transform.html",
    description: "Exploring the impact of 5G technology across various sectors and industries.",
    icon: "wifi"
  },
  {
    title: "Exploring the World of Artificial Intelligence",
    url: "https://ruthwikredd.blogspot.com/2024/08/exploring-world-of-artificial.html",
    description: "A deep dive into the fundamentals of AI and its growing influence.",
    icon: "cpu"
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorDotPosition, setCursorDotPosition] = useState({ x: 0, y: 0 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [modalType, setModalType] = useState<'certificate' | 'offer'>('certificate');

  const certificates = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    url: `./assets/images/Certificate Portfolio/Certificate Portfolio-${String(i + 1).padStart(2, '0')}.png`
  }));

  const offerLetters = [
    {
      id: 1,
      company: "Cognifyz Technologies",
      role: "Python Development Intern",
      date: "Fall 2024",
      image: "./assets/images/Internship/int-1.png"
    },
    {
      id: 2,
      company: "Prodigy InfoTech",
      role: "Machine Learning Intern",
      date: "Fall 2024",
      image: "./assets/images/Internship/int-2.png"
    },
    {
      id: 3,
      company: "Technostanet Services Pvt Ltd",
      role: "Python Development Intern",
      date: "Fall 2024",
      image: "./assets/images/Internship/int-3.png"
    },
    {
      id: 4,
      company: "CodSoft",
      role: "Python Programming Intern",
      date: "Fall 2024",
      image: "./assets/images/Internship/int-4.png"
    },
    {
      id: 5,
      company: "iNeuron",
      role: "Smart Health Care Project Intern",
      date: "Fall 2024",
      image: "./assets/images/Internship/int-5.png"
    },
    {
      id: 6,
      company: "Info Bharat Interns",
      role: "Virtual Intern (Computer Science)",
      date: "Fall 2024",
      image: "./assets/images/Internship/int-6.png"
    }
  ];

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    const { clientX: x, clientY: y } = e;
    setCursorPosition({ x, y });
    requestAnimationFrame(() => {
      setCursorDotPosition({ x, y });
    });
  }, []);

  const handleCursorHover = useCallback((isHovering: boolean) => {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
      cursor.classList.toggle('cursor-hover', isHovering);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('scroll', handleScroll);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => handleCursorHover(true));
      element.addEventListener('mouseleave', () => handleCursorHover(false));
    });

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('scroll', handleScroll);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => handleCursorHover(true));
        element.removeEventListener('mouseleave', () => handleCursorHover(false));
      });
    };
  }, [updateCursorPosition, handleCursorHover]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([formData]);

      if (error) throw error;

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (index: number, type: 'certificate' | 'offer') => {
    setSelectedImageIndex(index);
    setZoomLevel(1); // Reset zoom level when opening a new image
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    setModalType(type); // Set the type of modal to open
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    document.body.style.overflow = 'auto'; // Re-enable scrolling
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 0.1, 3)); // Max zoom level 3x
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 0.1, 0.5)); // Min zoom level 0.5x

  const showNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % certificates.length);
    }
  };

  const showPreviousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + certificates.length) % certificates.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight") {
        showNextImage();
      } else if (e.key === "ArrowLeft") {
        showPreviousImage();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImageIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-dark text-white grid-background">
      <Toaster position="top-right" />
      <div className="cursor hidden md:block" style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }} />
      <div className="cursor-dot hidden md:block" style={{ left: `${cursorDotPosition.x}px`, top: `${cursorDotPosition.y}px` }} />

      <main>
        {/* Hero Section */}
        <section id="home" className="flex items-center justify-center pt-16 relative overflow-hidden">
          <div className="container mx-auto px-4 py-16 relative">
            <div className="flex flex-col items-center text-center animate-fadeIn">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6 ring-4 ring-red/20 hover:ring-red/40 transition-all duration-300 animate-float hover-glow">
                <img src="./assets/images/logo.jpg" alt="Ruthwik Reddy" className="w-full h-full object-cover" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-3 tracking-tight font-playfair neon-text">
                Akkenapally Ruthwik Reddy
              </h1>
              <p className="text-xl md:text-2xl mb-6 opacity-80 font-light font-poppins">
                Student • Innovator • Tech Enthusiast
              </p>
              <div className="flex space-x-4 mb-6">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/ruthwikredd/' },
                  { icon: Twitter, href: 'https://x.com/ruthwikreddy' },
                  { icon: Instagram, href: 'https://www.instagram.com/ruthwwikreddy/' },
                  { icon: Github, href: 'https://github.com/ruthwikredd' }
                ].map(({ icon: Icon, href }, index) => (
                  <a key={index} href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-red/10 transition-all duration-300 group hover-glow">
                    <Icon className="w-6 h-6 group-hover:text-red transition-colors duration-300" />
                  </a>
                ))}
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
                {[
                  { icon: Mail, text: 'akkenapally.reddy@gmail.com' },
                  { icon: Phone, text: '+91 9989306597' },
                  { icon: MapPin, text: 'Hyderabad, India' }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center group glass px-3 py-2 rounded-full hover:bg-red/10 transition-all duration-300">
                    <Icon className="w-5 h-5 mr-2 text-red group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm md:text-base">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-playfair neon-text">
              About Me
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-5 animate-slideIn">
                <div className="glass p-5 rounded-lg transform hover:scale-105 transition-all duration-300">
                  <p className="text-lg leading-relaxed">
                    I'm a 10th-grade student at DDMS (AMS) P. Obul Reddy Public School with a passion for technology and innovation. As an active member of the Robotics Club and NCC Air Wing, I've developed strong leadership skills and technical expertise.
                  </p>
                </div>
                <div className="glass p-5 rounded-lg transform hover:scale-105 transition-all duration-300">
                  <p className="text-lg leading-relaxed">
                    My journey in technology has led me to participate in various competitions, including the Youth Ideathon, Atal Marathon, and Indian Future Tycoon, where I've consistently demonstrated my problem-solving abilities and innovative thinking.
                  </p>
                </div>
              </div>
              <div className="space-y-5 animate-slideIn" style={{ animationDelay: '0.2s' }}>
                <div className="glass p-5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-3 text-red font-playfair">Skills</h3>
                  {[
                    { name: 'Leadership & Innovation', value: 85 },
                    { name: 'Technical Skills', value: 75 },
                    { name: 'Python', value: 50 },
                    { name: 'Web Development', value: 30 }
                  ].map((skill, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-medium text-red">{skill.value}%</span>
                      </div>
                      <div className="skill-bar">
                        <div 
                          className="skill-progress"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Banner Section - Moved here */}
        <section className="banner">
          <img src="./assets/images/Banner.jpg" alt="Banner" className="banner-image" />
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="py-16 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-playfair neon-text">
              Certifications
            </h2>

            {/* Microsoft & Google Badges */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {/* Microsoft Certifications */}
              <div className="glass p-5 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-5">
                  <Medal className="w-8 h-8 text-red mr-3" />
                  <h3 className="text-xl font-bold font-playfair">Microsoft Badges</h3>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-red mr-2" />
                    <span>Fundamentals of Azure AI Services</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-red mr-2" />
                    <span>Microsoft Azure AI Fundamentals: AI Overview</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-red mr-2" />
                    <span>Fundamental AI Concepts</span>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-4 h-4 text-red mr-2" />
                    <span>Fundamentals of Machine Learning</span>
                  </li>
                </ul>
              </div>

              {/* Google Certifications */}
              <div className="glass p-5 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center mb-5">
                  <GraduationCap className="w-8 h-8 text-red mr-3" />
                  <h3 className="text-xl font-bold font-playfair">Google Badges</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    'Introduction to Security Principles in Cloud Computing (Earned Nov 12, 2024)',
                    'Introduction to Data Analytics in Google Cloud (Earned Sep 22, 2024)',
                    'Introduction to Large Language Models (Earned Mar 19, 2024)',
                    'Introduction to Responsible AI (Earned Feb 9, 2024)',
                    'Introduction to Generative AI (Earned Nov 26, 2023)'
                  ].map((cert, index) => (
                    <li key={index} className="flex items-center">
                      <ChevronRight className="w-4 h-4 text-red mr-2" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Co-Curricular Activities */}
            <div className="glass p-6 rounded-lg mb-10">
              <div className="flex items-center mb-5">
                <Trophy className="w-8 h-8 text-red mr-3" />
                <h3 className="text-xl font-bold font-playfair">Co-Curricular Activities (CCA)</h3>
              </div>
              <ul className="grid md:grid-cols-2 gap-3">
                {[
                  'Successfully led teams for Youth Ideathon competitions: Top 100 (2022, 2023), Top 1500 (2024)',
                  'Participated in Atal Marathon 2023, achieving Top 400 ranking.',
                  'Finalist in Indian Future Tycoon, focusing on innovative entrepreneurship.',
                  'Represented school in the National Space Innovation Challenge 2023.',
                  'Registered and participated in the 40-day ATL Tinkerpreneur Program 2024.',
                  'Participated in ATL campaigns promoting STEM and innovation.',
                  'Represented School at CBSE Regional Science Exhibition.',
                  'Participated in Yugen 4.0 MUN and CBSE National Youth Parliament.'
                ].map((achievement, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight className="w-4 h-4 text-red mr-2 mt-1 flex-shrink-0" />
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Certificate Gallery */}
            <div className="certificate-grid">
              {certificates.map((cert, index) => (
                <div key={cert.id} className="certificate-item glass">
                  <button 
                    onClick={() => openModal(index, 'certificate')}
                    className="certification-link block relative aspect-[4/3] overflow-hidden rounded-lg"
                  >
                    <img
                      src={cert.url}
                      alt={`Certificate ${cert.id}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="certificate-overlay">
                      <span className="button-effect px-4 py-2 rounded-full text-sm">
                        View Certificate
                      </span>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Internship Offers Section */}
        <section id="internships" className="py-16 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-playfair neon-text">
              Internship Offers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offerLetters.map((offer, index) => (
                <div key={offer.id} className="glass group hover:transform hover:scale-105 transition-all duration-500">
                  <button 
                    onClick={() => openModal(index, 'offer')}
                    className="relative overflow-hidden rounded-t-lg aspect-video w-full"
                  >
                    <img
                      src={offer.image}
                      alt={offer.company}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-playfair mb-3">{offer.company}</h3>
                    <div className="space-y-1">
                      <p className="text-gray-300">{offer.role}</p>
                      <p className="text-sm text-gray-400">{offer.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blogs" className="py-16 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-playfair neon-text">
              Blog Posts
            </h2>
            <div className="blog-grid">
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-card glass p-5 rounded-lg group"
                >
                  <h3 className="blog-title text-xl font-bold mb-3 group-hover:text-red transition-all duration-300">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-3 text-sm">
                    {post.description}
                  </p>
                  <div className="flex items-center text-red">
                    <span className="text-sm">Read More</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center font-playfair neon-text">
              Contact
            </h2>
            <div className="max-w-2xl mx-auto glass p-6 rounded-lg animate-fadeIn">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg input-effect"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 rounded-lg input-effect"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg input-effect"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full button-effect text-white font-bold py-3 px-5 rounded-lg transition-colors flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 glass">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Ruthwik Reddy. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-4xl w-full overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal} 
              className="absolute -top-10 right-0 text-white text-2xl font-bold bg-transparent border-none cursor-pointer"
            >
              &times; Close
            </button>
            <div className="absolute top-2 left-2 flex space-x-2">
              <button onClick={zoomIn} className="text-white bg-gray-800 p-2 rounded">+</button>
              <button onClick={zoomOut} className="text-white bg-gray-800 p-2 rounded">-</button>
            </div>
            <div className="flex justify-center items-center h-full">
              <img 
                src={modalType === 'certificate' ? certificates[selectedImageIndex].url : offerLetters[selectedImageIndex].image} 
                alt={`Image ${selectedImageIndex + 1}`} 
                className="max-w-full max-h-screen object-contain" 
                style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s' }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;