// src/components/FeaturedProjects.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './FeaturedProjects.module.css';

// Import actual images
import portfolioImg from '../assets/imgs/portfolio.jpg';
import fullstackImg from '../assets/imgs/fullstack.jpg';
import deeplearningImg from '../assets/imgs/deeplearning.jpg';

const projects = [
  {
    image: portfolioImg,
    title: 'Personal Portfolio',
    category: 'Frontend',
    techStack: ['React', 'CSS', 'Netlify'],
    description: 'Sleek, responsive portfolio showcasing modern frontend skills with smooth animations.',
    liveLink: 'https://prajwal-p-portfolio.netlify.app/',
    impact: '10K+ visits',
    gradient: 'linear-gradient(135deg, rgba(74, 177, 241, 0.1), rgba(42, 245, 152, 0.1))'
  },
  {
    image: fullstackImg,
    title: 'Smart Classroom',
    category: 'Full Stack',
    techStack: ['MERN', 'Node.js', 'MongoDB'],
    description: 'Full-stack classroom management with real-time attendance and resource sharing.',
    liveLink: 'https://smart-classroom-x7xs.onrender.com/',
    impact: '5+ schools',
    gradient: 'linear-gradient(135deg, rgba(42, 245, 152, 0.1), rgba(157, 78, 221, 0.1))'
  },
  {
    image: deeplearningImg,
    title: 'MediLink AI',
    category: 'AI/ML',
    techStack: ['Python', 'TensorFlow', 'NLP'],
    description: 'AI-powered medical diagnosis system with 95% accuracy using deep learning.',
    githubLink: 'https://github.com/PrajwalGaniga/MediLink-AI',
    impact: '95% accuracy',
    gradient: 'linear-gradient(135deg, rgba(157, 78, 221, 0.1), rgba(74, 177, 241, 0.1))'
  },
];

const chatbotKnowledge = {
  portfolio: "This is a modern React portfolio featuring glassmorphic design, smooth scroll animations, and optimized performance. Built with React and CSS Modules, deployed on Netlify.",
  classroom: "A comprehensive MERN stack application for schools with real-time updates, attendance tracking, resource management, and student analytics. Serves 5+ schools with 1000+ active users.",
  medilink: "An advanced AI medical diagnosis system using TensorFlow and NLP for preliminary symptom analysis. Achieves 95% accuracy with deep learning models trained on medical datasets.",
  frontend: "Frontend projects showcase expertise in React, modern CSS, responsive design, animations, and performance optimization for pixel-perfect user experiences.",
  fullstack: "Full-stack projects demonstrate end-to-end development with MERN stack, RESTful APIs, authentication, database design, and cloud deployment.",
  ai: "AI/ML projects leverage TensorFlow, PyTorch, computer vision, and NLP to solve real-world problems with production-ready deep learning models.",
};

function FeaturedProjects() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      text: "👋 Hi! I'm your AI guide. Ask me about any project—tech stack, features, or impact!",
      sender: 'bot',
      time: new Date()
    }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('portfolio') || q.includes('react') || q.includes('frontend')) {
      return chatbotKnowledge.portfolio;
    }
    if (q.includes('classroom') || q.includes('mern') || q.includes('fullstack') || q.includes('full stack')) {
      return chatbotKnowledge.classroom;
    }
    if (q.includes('medilink') || q.includes('ai') || q.includes('ml') || q.includes('medical')) {
      return chatbotKnowledge.medilink;
    }
    if (q.includes('tech') || q.includes('stack')) {
      return "Tech stack includes React, Node.js, MongoDB, Express, TensorFlow, Python, and modern deployment platforms. Each project uses cutting-edge technologies.";
    }
    if (q.includes('impact') || q.includes('results')) {
      return "These projects collectively serve thousands of users: 10K+ portfolio visits, 5+ schools using Smart Classroom, and 95% accuracy in MediLink AI diagnosis.";
    }
    
    return "Great question! Try asking about specific projects (Portfolio, Classroom, MediLink), tech stacks, or project impact. I'm here to help! 🚀";
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: 'user', time: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botMsg = {
        text: generateResponse(input),
        sender: 'bot',
        time: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 800);
  };

  return (
    <section className={styles.container}>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.gridPattern}></div>
      </div>

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>💼</span>
          <span>Featured Work</span>
        </div>
        
        <h2 className={styles.title}>
          Selected <span className={styles.accent}>Projects</span>
        </h2>
        
        <p className={styles.subtitle}>
          A curated showcase of our best work across web development and AI
        </p>

        <button 
          className={styles.aiToggle}
          onClick={() => setChatOpen(!chatOpen)}
        >
          <span className={styles.aiIcon}>🤖</span>
          <span>{chatOpen ? 'Close' : 'Ask AI'}</span>
          {!chatOpen && <span className={styles.aiPulse}></span>}
        </button>
      </div>

      {/* AI Chatbot */}
      {chatOpen && (
        <div className={styles.chatBox}>
          <div className={styles.chatHeader}>
            <div className={styles.chatInfo}>
              <span className={styles.chatAvatar}>🤖</span>
              <div>
                <h4>AI Project Guide</h4>
                <p><span className={styles.online}></span>Online</p>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} className={styles.closeBtn}>✕</button>
          </div>

          <div className={styles.chatBody}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.msg} ${styles[msg.sender]}`}>
                {msg.sender === 'bot' && <span className={styles.msgAvatar}>🤖</span>}
                <div className={styles.msgContent}>
                  <p>{msg.text}</p>
                  <span className={styles.msgTime}>
                    {msg.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {msg.sender === 'user' && <span className={styles.msgAvatar}>👤</span>}
              </div>
            ))}
            {typing && (
              <div className={`${styles.msg} ${styles.bot}`}>
                <span className={styles.msgAvatar}>🤖</span>
                <div className={styles.typing}>
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form className={styles.chatForm} onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects..."
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendBtn}>→</button>
          </form>

          <div className={styles.quickBtns}>
            <button onClick={() => setInput('Tell me about the portfolio')}>Portfolio</button>
            <button onClick={() => setInput('Smart Classroom details')}>Classroom</button>
            <button onClick={() => setInput('What is MediLink AI?')}>MediLink</button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={index} className={styles.card} style={{ '--gradient': project.gradient }}>
            <div className={styles.imageWrapper}>
              <img src={project.image} alt={project.title} className={styles.image} />
              <div className={styles.overlay}>
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className={styles.btn}>
                    <span>🚀</span>
                    Live Demo
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.btn}>
                    <span>💻</span>
                    GitHub
                  </a>
                )}
              </div>
              <div className={styles.categoryTag}>{project.category}</div>
            </div>

            <div className={styles.content}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              
              <div className={styles.tags}>
                {project.techStack.slice(0, 3).map((tech, i) => (
                  <span key={i} className={styles.tag}>{tech}</span>
                ))}
              </div>
              
              <p className={styles.desc}>{project.description}</p>

              <div className={styles.footer}>
                <span className={styles.impact}>
                  <span className={styles.impactIcon}>📊</span>
                  {project.impact}
                </span>
                <button 
                  className={styles.askBtn}
                  onClick={() => {
                    setChatOpen(true);
                    setInput(`Tell me about ${project.title}`);
                  }}
                >
                  Ask AI
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA to Full Portfolio */}
      <div className={styles.cta}>
        <h3 className={styles.ctaTitle}>Want to see more?</h3>
        <p className={styles.ctaText}>Explore our complete portfolio with detailed case studies</p>
        <Link to="/portfolio" className={styles.ctaBtn}>
          <span>View Full Portfolio</span>
          <span className={styles.ctaArrow}>→</span>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProjects;
