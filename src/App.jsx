import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Phone, MessageSquare, Zap, Cpu, Globe, 
  ArrowRight, Menu, X, CheckCircle2, BarChart3, 
  Shield, ChevronRight, Send, Loader2, Users, Mail, Briefcase, Sparkles
} from 'lucide-react';

/**
 * JENIX AI - ULTRA EDITION
 * * Upgrade Log:
 * - NEW LOGO: Created <InteractiveLogo /> with individual letter animation and cyber-glitch feel.
 * - SPOTLIGHT EFFECT: Added <SpotlightCard /> for high-end mouse-tracking glow on features.
 * - TEXT SHIMMER: Added 'animate-text-shimmer' to the hero headline.
 * - BUTTON GLOW: Enhanced CTA buttons with pulsing borders.
 * - PREVIOUS FEATURES: All functional links, modals, and team images retained.
 */

// --- UTILS: Smooth Scroll ---
const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// --- DATA: Legal Content ---
const LEGAL_CONTENT = {
  privacy: {
    title: "Privacy Policy",
    text: `Last Updated: January 2025\n\nAt Jenix Media, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our AI integration services.\n\n1. Information Collection\nWe collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.\n\n2. Use of Data\nWe use the collected data to provide, operate, and maintain our services; improve, personalize, and expand our website; and communicate with you, either directly or through one of our partners.`
  },
  terms: {
    title: "Terms of Service",
    text: `Last Updated: January 2025\n\nPlease read these Terms of Service ("Terms", "Terms of Service") carefully before using the Jenix AI website and services operated by Jenix Media.\n\n1. Acceptance of Terms\nBy accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.\n\n2. Intellectual Property\nThe Service and its original content, features, and functionality are and will remain the exclusive property of Jenix Media and its licensors.\n\n3. Termination\nWe may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.`
  }
};

// --- COMPONENT: Interactive Logo ---
const InteractiveLogo = ({ size = "default" }) => {
  return (
    <div className="group flex items-center space-x-3 cursor-pointer select-none" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
      {/* Logo Icon with Spin Effect */}
      <div className={`relative ${size === 'large' ? 'w-12 h-12' : 'w-9 h-9'} transition-transform duration-500 group-hover:rotate-180`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute inset-0 bg-[#0a0a0a] rounded-xl border border-white/10 flex items-center justify-center z-10">
           <Bot size={size === 'large' ? 28 : 20} className="text-white group-hover:text-cyan-400 transition-colors" />
        </div>
      </div>
      
      {/* Cyber Text Animation */}
      <div className="flex flex-col leading-none">
        <div className="flex tracking-widest font-black text-white group-hover:tracking-[0.2em] transition-all duration-300">
          {"JENIX".split('').map((char, i) => (
            <span key={i} className={`inline-block transition-transform duration-300 group-hover:-translate-y-0.5 delay-[${i * 30}ms]`}>
              {char}
            </span>
          ))}
        </div>
        <div className={`flex ${size === 'large' ? 'text-sm' : 'text-[0.65rem]'} font-bold text-cyan-400 tracking-[0.3em] group-hover:tracking-[0.5em] transition-all duration-500`}>
          AI SYSTEMS
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: Spotlight Card (High-End Hover Effect) ---
const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(6,182,212,0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// --- COMPONENT: Animated Section (Scroll Reveal) ---
const FadeIn = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- COMPONENT: Neural Background (Enhanced) ---
const NeuralBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: null, y: null, radius: 200 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.1})`;
      }

      update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
          this.x -= directionX;
          this.y -= directionY;
        } else {
          if (this.x !== this.baseX) {
            let dx = this.x - this.baseX;
            this.x -= dx/10;
          }
          if (this.y !== this.baseY) {
            let dy = this.y - this.baseY;
            this.y -= dy/10;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let particles = [];
    const init = () => {
      particles = [];
      for (let i = 0; i < 150; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      
      // Draw Connections
      particles.forEach((a, index) => {
        particles.slice(index + 1).forEach(b => {
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.1 - distance/1000})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
};

// --- COMPONENT: Lead Capture Modal ---
const Modal = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState('idle'); // idle, loading, success

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/xkgykpye", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('idle');
        alert("There was a problem submitting your form. Please try again.");
      }
    } catch (error) {
      setStatus('idle');
      alert("There was a problem submitting your form. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border border-cyan-900/50 w-full max-w-lg rounded-2xl p-8 shadow-[0_0_50px_rgba(6,182,212,0.2)] animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white">
          <X size={20} />
        </button>
        
        {status === 'success' ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
            <p className="text-gray-400">Our team will contact you within 24 hours.</p>
            <button onClick={onClose} className="mt-6 px-6 py-2 bg-white/10 rounded-full text-white hover:bg-white/20">
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-white mb-2">Deploy Your First Agent</h3>
            <p className="text-gray-400 mb-6">Fill out the form below to schedule a consultation.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Business Name</label>
                <input required name="business_name" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="Acme Corp" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Work Email</label>
                  <input required name="email" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="you@company.com" />
                </div>
                <div>
                  <label className="block text-xs uppercase text-gray-500 mb-1">Phone Number</label>
                  <input required name="phone" type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-1">Interested In</label>
                <select name="interest" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors appearance-none">
                  <option value="Voice Agents">AI Voice Agents</option>
                  <option value="WhatsApp Bots">WhatsApp Bots</option>
                  <option value="Automation Suite">Full Automation Suite</option>
                </select>
              </div>
              <button disabled={status === 'loading'} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-lg mt-4 transition-all flex items-center justify-center shadow-lg shadow-cyan-500/20">
                {status === 'loading' ? <Loader2 className="animate-spin" /> : 'Request Consultation'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// --- COMPONENT: Legal Modal ---
const LegalModal = ({ isOpen, onClose, content }) => {
  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-2xl p-8 shadow-2xl max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 animate-in slide-in-from-bottom-10 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>
        <h3 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">{content.title}</h3>
        <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap font-light">
          {content.text}
        </div>
        <button onClick={onClose} className="mt-8 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
          Close Document
        </button>
      </div>
    </div>
  );
};

// --- COMPONENT: Navbar ---
const Navbar = ({ onOpenModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', id: 'solutions' },
    { name: 'Process', id: 'process' },
    { name: 'Team', id: 'team' },
    { name: 'Contact', id: 'contact' }
  ];

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    scrollToSection(id);
  };

  return (
    <>
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#050505]/80 backdrop-blur-lg border-b border-white/5 py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Interactive Logo */}
          <InteractiveLogo />

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors uppercase tracking-wide hover:scale-105 transform duration-200"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={onOpenModal}
              className="px-6 py-2.5 bg-white text-black font-bold text-sm rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] duration-300"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-[#050505] border-b border-white/10 transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="p-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link.id)}
              className="text-left text-lg font-medium text-gray-300 hover:text-cyan-400 py-2 border-b border-white/5"
            >
              {link.name}
            </button>
          ))}
          <button onClick={onOpenModal} className="w-full py-3 bg-cyan-600 text-white font-bold rounded-lg mt-2">
            Get Started
          </button>
        </div>
      </div>
    </nav>
    </>
  );
};

// --- APP COMPONENT ---
const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [legalModal, setLegalModal] = useState({ isOpen: false, content: null });
  const [formStatus, setFormStatus] = useState('idle');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch("https://formspree.io/f/xkgykpye", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setFormStatus('success');
      } else {
        setFormStatus('idle');
        alert("There was a problem submitting your message. Please try again.");
      }
    } catch (error) {
      setFormStatus('idle');
      alert("There was a problem submitting your message. Please try again.");
    }
  };

  // Realistic SMB names for "Trusted By"
  const trustedCompanies = [
    "Apex Logistics", "Urban Realty", "NextGen Retail", "HealthPlus Clinics", "TechFlow Solutions",
    "Prime Motors", "GreenLeaf Foods", "Swift Legal"
  ];

  const openLegal = (type) => {
    setLegalModal({ isOpen: true, content: LEGAL_CONTENT[type] });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-cyan-500/30 selection:text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-text-shimmer {
          background: linear-gradient(
            to right, 
            #ffffff 0%, 
            #06b6d4 50%, 
            #ffffff 100%
          );
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 5s linear infinite;
        }
      `}</style>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <LegalModal 
        isOpen={legalModal.isOpen} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
        content={legalModal.content}
      />
      <Navbar onOpenModal={() => setModalOpen(true)} />

      {/* --- HERO --- */}
      <header className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
        <NeuralBackground />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-8 hover:bg-cyan-500/10 transition-colors">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"/>
              <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase">Jenix Media Intelligence</span>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[1.1]">
              Scale Your Business <br/>
              <span className="animate-text-shimmer">
                With AI Agents.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The first AI workforce that doesn't sleep. We build and integrate autonomous calling agents and neural chatbots tailored to your business.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setModalOpen(true)}
                className="group relative px-8 py-4 bg-cyan-500 text-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/30 group-hover:translate-x-full duration-500 transition-transform"></div>
                <span className="relative flex items-center gap-2">
                  Deploy Agent <Zap size={18} className="fill-black" />
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('solutions')}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all flex items-center gap-2 backdrop-blur-sm hover:border-cyan-500/50"
              >
                View Solutions <ChevronRight size={18} />
              </button>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* --- TRUSTED BY (Ticker) --- */}
      <div className="w-full border-y border-white/5 bg-black/50 overflow-hidden py-8 backdrop-blur-sm">
        <div className="flex items-center gap-24 animate-[scroll_40s_linear_infinite] whitespace-nowrap opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          {/* Repeated logos for effect */}
          {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
            <div key={i} className="text-lg font-bold text-gray-300 flex items-center gap-3 hover:text-cyan-400 transition-colors cursor-default">
              <Globe size={20} /> {name}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* --- BENTO GRID FEATURES --- */}
      <section id="solutions" className="py-32 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">The Intelligence Suite</h2>
              <p className="text-gray-400 text-lg max-w-2xl">Replace your entire support and sales stack with three core autonomous modules.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px]">
            {/* Large Card - Voice */}
            <div className="md:col-span-2 row-span-1 md:row-span-2">
              <SpotlightCard className="h-full p-10 flex flex-col justify-between group">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                  <Phone size={200} />
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:border-cyan-400/50 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                    <Phone className="text-cyan-400" size={32} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4 text-white group-hover:text-cyan-100 transition-colors">Voice Calling Agents</h3>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-lg group-hover:text-gray-300 transition-colors">
                    Capable of handling 10,000 concurrent calls. Human-like latency (500ms), emotional intelligence, and direct CRM injection. Perfect for cold outreach and support triage.
                  </p>
                </div>
                <div className="flex items-center text-cyan-400 font-bold group-hover:translate-x-2 transition-transform">
                  Learn more <ArrowRight className="ml-2" size={18} />
                </div>
              </SpotlightCard>
            </div>

            {/* Tall Card - Chat */}
            <SpotlightCard className="p-8 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 border border-purple-500/20 group-hover:border-purple-400/50 transition-colors">
                  <MessageSquare className="text-purple-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Neural Chat</h3>
                <p className="text-gray-400 text-sm">WhatsApp & Web automation that negotiates and closes.</p>
              </div>
              <div className="mt-6 bg-black/60 rounded-xl p-5 border border-white/5 text-xs font-mono space-y-3 shadow-inner">
                <div className="text-gray-500 flex gap-2"><span className="text-gray-600">User:</span> Pricing?</div>
                <div className="text-purple-400 flex gap-2"><span className="text-purple-600">AI:</span> Plans start at $99.</div>
                <div className="h-1 w-2 bg-purple-500 animate-pulse rounded-full"/>
              </div>
            </SpotlightCard>

            {/* Standard Card - Integration */}
            <SpotlightCard className="p-8 group">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-6 border border-green-500/20 group-hover:border-green-400/50 transition-colors">
                <Cpu className="text-green-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">API-First</h3>
              <p className="text-gray-400 leading-relaxed">Connects with Salesforce, HubSpot, and Zapier instantly.</p>
            </SpotlightCard>

            {/* Standard Card - Security */}
            <SpotlightCard className="p-8 group">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:border-blue-400/50 transition-colors">
                <Shield className="text-blue-400" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Enterprise Secure</h3>
              <p className="text-gray-400 leading-relaxed">SOC2 Compliant. Your data never leaves our encrypted private cloud.</p>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* --- AGENCY STEPS SECTION --- */}
      <section id="process" className="py-32 bg-[#050505] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20">
            <h2 className="text-4xl font-bold">Built for Your Business</h2>
            <button onClick={() => setModalOpen(true)} className="text-cyan-400 hover:text-white transition-colors flex items-center gap-2 mt-4 md:mt-0 font-semibold group">
              Start Consultation <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Discovery & Strategy", desc: "We analyze your workflows to identify where AI Agents can drive the most revenue and savings.", icon: <Globe /> },
              { title: "Custom Development", desc: "Our 25+ member team builds tailored agents trained on your specific data and brand voice.", icon: <Cpu /> },
              { title: "Integration & Launch", desc: "Seamless deployment into your existing CRM and communication channels.", icon: <Zap /> }
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 150}>
                <div className="relative pl-8 border-l border-gray-800 hover:border-cyan-500 transition-colors duration-500 group">
                  <span className="absolute -left-3 top-0 w-6 h-6 bg-[#050505] border border-gray-700 group-hover:border-cyan-500 rounded-full flex items-center justify-center text-xs font-mono text-gray-500 group-hover:text-cyan-500 transition-colors">
                    {i + 1}
                  </span>
                  <div className="mb-4 text-cyan-500 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all origin-left">{step.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-cyan-100 transition-colors">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- TEAM / LEADERSHIP --- */}
      <section id="team" className="py-32 px-4 bg-[#080808] border-b border-white/5">
         <div className="max-w-7xl mx-auto">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Meet The Leadership</h2>
                <p className="text-gray-400">Leading a team of 25+ AI Experts & Engineers.</p>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {/* Founder 1 */}
               <FadeIn delay={100}>
                 <SpotlightCard className="p-8 text-center">
                    <div className="relative inline-block mb-6 group">
                      <img 
                        src="https://i.postimg.cc/vm18Rx9D/a-studio-portrait-photograph-of-a-confid-28Lfqe0ISx-Ob9CTp6Sbg-SA-w-Bt-Wpb-EQSQ-m-U0C46z-Wg-Q.jpg" 
                        alt="Jasveer Singh" 
                        className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/5 group-hover:border-cyan-500/50 transition-colors duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-28 h-28 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mx-auto hidden items-center justify-center text-4xl font-bold text-white shadow-lg shadow-cyan-500/20">J</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Jasveer Singh</h3>
                    <p className="text-cyan-400 font-bold text-sm tracking-wide mb-4 uppercase">Co-Founder & Operations</p>
                    <p className="text-gray-400 text-sm leading-relaxed">Ensuring seamless delivery and operational excellence for every client integration.</p>
                 </SpotlightCard>
               </FadeIn>

               {/* Founder 2 */}
               <FadeIn delay={200}>
                 <SpotlightCard className="p-8 text-center">
                    <div className="relative inline-block mb-6 group">
                      <img 
                        src="https://i.postimg.cc/xjmkJhX5/a-professional-studio-portrait-of-a-man-tcoo8Z2i-Qc-CXFt-Pv-Ib-QI9g-c-Y5GGQe5Sc-Cyp-AKx-JOx3Fw.jpg" 
                        alt="Aniket Singh" 
                        className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/5 group-hover:border-purple-500/50 transition-colors duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-28 h-28 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full mx-auto hidden items-center justify-center text-4xl font-bold text-white shadow-lg shadow-purple-500/20">A</div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Aniket Singh</h3>
                    <p className="text-purple-400 font-bold text-sm tracking-wide mb-4 uppercase">Co-Founder & Growth</p>
                    <p className="text-gray-400 text-sm leading-relaxed">Spearheading strategic partnerships and driving business value for our partners.</p>
                 </SpotlightCard>
               </FadeIn>

               {/* Team Stat */}
               <FadeIn delay={300}>
                 <SpotlightCard className="p-8 text-center flex flex-col justify-center h-full">
                    <div className="relative inline-block mb-6 group">
                      <img 
                        src="https://i.postimg.cc/8PMwkZdD/Whisk-e0c41473440a84eb110499973b31a9c8dr-Copy.jpg" 
                        alt="Team Members" 
                        className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/5 group-hover:border-white/20 transition-colors duration-500 grayscale group-hover:grayscale-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                       <div className="w-28 h-28 bg-white/10 rounded-full mx-auto hidden items-center justify-center">
                        <Users size={40} className="text-white"/>
                      </div>
                    </div>
                    <h3 className="text-5xl font-black text-white mb-2 tracking-tight">25+</h3>
                    <p className="text-white font-bold mb-2">Team Members</p>
                    <p className="text-gray-500 text-sm">Engineers, Data Scientists, and AI Specialists working for you.</p>
                 </SpotlightCard>
               </FadeIn>
            </div>
         </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-16 backdrop-blur-sm shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Talk to us</h2>
            <p className="text-gray-400 mb-8">Ready to transform your customer experience? Let's get you onboarded.</p>
            
            {/* Contact Details Grid */}
            <div className="flex flex-col md:flex-row justify-center gap-6 mb-10 text-sm">
               <a href="mailto:info@jenixmedia.com" className="flex items-center justify-center gap-3 px-6 py-3 bg-black/50 rounded-full border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group">
                  <Mail size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 group-hover:text-white">info@jenixmedia.com</span>
               </a>
               <a href="tel:+919220271117" className="flex items-center justify-center gap-3 px-6 py-3 bg-black/50 rounded-full border border-white/10 hover:border-cyan-500/50 hover:text-cyan-400 transition-all group">
                  <Phone size={16} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-300 group-hover:text-white">+91 9220271117</span>
               </a>
            </div>
          </div>

          {formStatus === 'success' ? (
             <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-8 text-center animate-pulse">
               <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
               <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
               <p className="text-gray-400 mt-2">We'll be in touch shortly.</p>
             </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium uppercase tracking-wider">Name</label>
                  <input required name="name" type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 font-medium uppercase tracking-wider">Email</label>
                  <input required name="email" type="email" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium uppercase tracking-wider">Message</label>
                <textarea required name="message" rows="4" className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all outline-none" placeholder="I want to automate my sales calls..." />
              </div>
              <button disabled={formStatus === 'loading'} className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 text-lg group">
                {formStatus === 'loading' ? <Loader2 className="animate-spin" /> : <>Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-white/10 pt-16 pb-8 px-4 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="mb-6">
              <InteractiveLogo size="default" />
            </div>
            <p className="text-gray-500 mb-6 max-w-xs">The autonomous enterprise future is here. Integrating intelligent agents into your business workflows.</p>
            <div className="flex gap-4">
              {/* Social Placeholders */}
              {[1,2,3].map(i => <div key={i} className="w-8 h-8 bg-white/5 rounded-full hover:bg-cyan-500/20 hover:text-cyan-400 transition-all cursor-pointer flex items-center justify-center text-gray-500 border border-white/5 hover:border-cyan-500/30"><Globe size={14}/></div>)}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider">Platform</h4>
            <ul className="space-y-4 text-gray-500">
              <li onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 cursor-pointer transition-colors">Voice Agents</li>
              <li onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 cursor-pointer transition-colors">Chat Automation</li>
              <li onClick={() => scrollToSection('solutions')} className="hover:text-cyan-400 cursor-pointer transition-colors">Integrations</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li onClick={() => scrollToSection('team')} className="hover:text-cyan-400 cursor-pointer transition-colors">About Us</li>
              <li onClick={() => scrollToSection('team')} className="hover:text-cyan-400 cursor-pointer transition-colors">Our Team</li>
              <li onClick={() => scrollToSection('contact')} className="hover:text-cyan-400 cursor-pointer transition-colors">Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-4 text-gray-500">
              <li onClick={() => openLegal('privacy')} className="hover:text-cyan-400 cursor-pointer transition-colors">Privacy Policy</li>
              <li onClick={() => openLegal('terms')} className="hover:text-cyan-400 cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between text-gray-600">
          <div>© 2025 Jenix Media. All rights reserved.</div>
          <div className="flex items-center gap-1 mt-2 md:mt-0">Made with <Zap size={12} className="text-cyan-500"/> by Jenix AI</div>
        </div>
      </footer>
    </div>
  );
};

export default App;