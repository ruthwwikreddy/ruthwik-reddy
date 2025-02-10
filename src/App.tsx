import React, { useState, useEffect, useCallback } from 'react';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Menu,
  X,
  Calendar,
  Award,
  Cpu,
  Code,
  Send,
  Loader2
} from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { supabase } from './lib/supabase';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorDotPosition, setCursorDotPosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Custom cursor effect
  const updateCursorPosition = useCallback((e: MouseEvent) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
    setCursorDotPosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, [updateCursorPosition]);

  // Scroll spy effect
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Project data
  const projects = [
    {
      title: 'MediLink',
      description: 'Healthcare connectivity platform',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500',
      tech: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Lib Legal Info Bot',
      description: 'AI-powered legal information assistant',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=500',
      tech: ['Python', 'TensorFlow', 'NLP'],
    },
  ];

  // Blog posts data
  const blogPosts = [
    {
      title: 'AI in Healthcare: Transforming Patient Care and Medical Research',
      url: 'https://ruthwikredd.blogspot.com/2024/08/ai-in-healthcare-transforming-patient.html',
      date: 'August 18, 2024',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500',
    },
    {
      title: 'Introduction to Machine Learning: A Beginner\'s Guide',
      url: 'https://ruthwikredd.blogspot.com/2024/08/introduction-to-machine-learning.html',
      date: 'August 18, 2024',
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=500',
    },
    {
      title: 'Cybersecurity in the Age of AI: Challenges and Solutions',
      url: 'https://ruthwikredd.blogspot.com/2024/08/cybersecurity-in-age-of-ai-challenges.html',
      date: 'August 18, 2024',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500',
    },
    {
      title: 'Why Python is the Best Language for Beginners',
      url: 'https://ruthwikredd.blogspot.com/2024/08/why-python-is-best-language-for.html',
      date: 'August 18, 2024',
      image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=500',
    },
    {
      title: '5G Technology: How It Will Transform Industries',
      url: 'https://ruthwikredd.blogspot.com/2024/08/5g-technology-how-it-will-transform.html',
      date: 'August 18, 2024',
      image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=500',
    },
    {
      title: 'Exploring the World of Artificial Intelligence',
      url: 'https://ruthwikredd.blogspot.com/2024/08/exploring-world-of-artificial.html',
      date: 'August 18, 2024',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=500',
    },
  ];

  const certifications = [
    {
      title: 'Microsoft Azure AI Fundamentals',
      issuer: 'Microsoft',
      date: '2024',
      category: 'AI & Machine Learning',
      badges: [
        'Fundamentals of Azure AI Services',
        'Microsoft Azure AI Fundamentals: AI Overview',
        'Fundamental AI Concepts',
        'Fundamentals of Machine Learning'
      ]
    },
    {
      title: 'Google Cloud Certifications',
      issuer: 'Google',
      date: '2024',
      category: 'Cloud & AI',
      badges: [
        'Introduction to Security Principles in Cloud Computing',
        'Introduction to Data Analytics in Google Cloud',
        'Introduction to Large Language Models',
        'Introduction to Responsible AI',
        'Introduction to Generative AI'
      ],
      dates: [
        'Nov 12, 2024',
        'Sep 22, 2024',
        'Mar 19, 2024',
        'Feb 9, 2024',
        'Nov 26, 2023'
      ]
    }
  ];

  const achievements = [
    'Youth Ideathon: Top 100 (2022, 2023), Top 1500 (2024)',
    'Atal Marathon 2023: Top 400',
    'Finalist in Indian Future Tycoon',
    'National Space Innovation Challenge 2023',
    'CBSE Regional Science Exhibition participant'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-blue-900 text-white grid-background">
      <Toaster position="top-right" />
      
      {/* Custom cursor */}
      <div
        className="cursor hidden md:block"
        style={{ left: cursorPosition.x, top: cursorPosition.y }}
      />
      <div
        className="cursor-dot hidden md:block"
        style={{ left: cursorDotPosition.x, top: cursorDotPosition.y }}
      />

      {/* Floating Navigation */}
      <nav className="floating-nav glass hidden md:block">
        <div className="flex flex-col space-y-6">
          {['home', 'about', 'projects', 'blog', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === item 
                  ? 'bg-blue-400 scale-150' 
                  : 'bg-gray-500 hover:bg-blue-400'
              }`}
              title={item.charAt(0).toUpperCase() + item.slice(1)}
            />
          ))}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden glass rounded-full px-6 py-3`}>
        <div className="flex space-x-8">
          {['home', 'about', 'projects', 'blog', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`transition-colors duration-300 ${
                activeSection === item 
                  ? 'text-blue-400' 
                  : 'text-gray-400 hover:text-blue-400'
              }`}
            >
              <div className="w-2 h-2 rounded-full bg-current" />
            </a>
          ))}
        </div>
      </nav>

      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full z-40 glass">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold text-blue-400 neon-text">RR</a>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
          <div className="absolute inset-0 grid-background opacity-20" />
          <div className="container mx-auto px-6 py-20 relative">
            <div className="flex flex-col items-center text-center animate-fadeIn">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-8 ring-4 ring-blue-400/20 hover:ring-blue-400/40 transition-all duration-300 animate-float hover-glow">
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=500"
                  alt="Ruthwik Reddy"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight neon-text">
                Akkenapally Ruthwik Reddy
                <span className="text-blue-400">.</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-80 font-light">
                Student • Innovator • Tech Enthusiast
              </p>
              <div className="flex space-x-6 mb-8">
                {[
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/ruthwikredd/' },
                  { icon: Twitter, href: 'https://x.com/ruthwikreddy' },
                  { icon: Instagram, href: 'https://www.instagram.com/ruthwwikreddy/' },
                  { icon: Github, href: 'https://github.com/ruthwikredd' }
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full hover:bg-blue-400/10 transition-all duration-300 group hover-glow"
                  >
                    <Icon className="w-6 h-6 group-hover:text-blue-400 transition-colors duration-300" />
                  </a>
                ))}
              </div>
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
                {[
                  { icon: Mail, text: 'akkenapally.reddy@gmail.com' },
                  { icon: Phone, text: '+91 9989306597' },
                  { icon: MapPin, text: 'Hyderabad, India' }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center group glass px-4 py-2 rounded-full">
                    <Icon className="w-5 h-5 mr-2 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm md:text-base">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text">
              About Me<span className="text-blue-400">.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 animate-slideIn">
                <p className="text-lg leading-relaxed glass p-6 rounded-lg">
                  I'm a 10th-grade student at DDMS (AMS) P. Obul Reddy Public School with a passion for technology and innovation. As an active member of the Robotics Club and NCC Air Wing, I've developed strong leadership skills and technical expertise.
                </p>
                <p className="text-lg leading-relaxed glass p-6 rounded-lg">
                  My journey in technology has led me to participate in various competitions, including the Youth Ideathon, Atal Marathon, and Indian Future Tycoon, where I've consistently demonstrated my problem-solving abilities and innovative thinking.
                </p>
              </div>
              <div className="space-y-6 animate-slideIn" style={{ animationDelay: '0.2s' }}>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-blue-400">Skills</h3>
                  {[
                    { name: 'Leadership & Innovation', value: 85 },
                    { name: 'Technical Skills', value: 75 },
                    { name: 'Python', value: 50 },
                    { name: 'Web Development', value: 30 }
                  ].map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <span className="text-sm font-medium text-blue-400">{skill.value}%</span>
                      </div>
                      <div className="h-2 bg-blue-400/20 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-400 rounded-full transition-all duration-1000"
                          style={{ width: `${skill.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="mt-12 glass p-6 rounded-lg animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Certifications</h3>
              <div className="space-y-6">
                {certifications.map((cert, index) => (
                  <div key={index} className="glass p-4 rounded-lg hover:bg-blue-400/5 transition-colors">
                    <h4 className="text-lg font-semibold mb-2">{cert.title}</h4>
                    <p className="text-sm text-gray-400 mb-3">
                      {cert.issuer} • {cert.category}
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {cert.badges?.map((badge, badgeIndex) => (
                        <div key={badgeIndex} className="flex items-start space-x-3 text-sm">
                          <Award className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                          <div>
                            <p>{badge}</p>
                            {cert.dates && (
                              <p className="text-xs text-gray-400 mt-1">{cert.dates[badgeIndex]}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-12 glass p-6 rounded-lg animate-fadeIn" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-xl font-semibold mb-6 text-blue-400">Achievements</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-blue-400/5 hover:bg-blue-400/10 transition-colors">
                    <Award className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                    <span>{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text">
              Projects<span className="text-blue-400">.</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div 
                  key={index}
                  className="glass p-6 rounded-lg group hover:transform hover:scale-105 transition-all duration-300 animate-scaleIn"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 text-sm rounded-full bg-blue-400/10 text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://drive.google.com/drive/folders/14GHYLMZ7mLbet76MHXaKzkRJzCkEOS53?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    View Project <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text">
              Blog<span className="text-blue-400">.</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass rounded-lg overflow-hidden animate-scaleIn hover:transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="aspect-w-16 aspect-h-9 relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {post.date}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 relative">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center neon-text">
              Contact<span className="text-blue-400">.</span>
            </h2>
            <div className="max-w-2xl mx-auto glass p-8 rounded-lg animate-fadeIn">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/20 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/20 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-black/50 border border-blue-400/20 focus:border-blue-400 focus:outline-none transition-colors"
                    placeholder="Your message..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
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
      <footer className="py-8 glass">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm">
            © 2024 Ruthwik Reddy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;