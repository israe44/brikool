import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import "./Landing.css";

const SERVICES_SHOWCASE = [
  { 
    title: "Home Cleaning", 
    img: "/cleaning/cleaning-1.png", 
    href: "/services?cat=cleaning",
    description: "Professional deep cleaning for your home"
  },
  { 
    title: "Handyman Services", 
    img: "/furniture-2.png", 
    href: "/services?cat=handyman",
    description: "Expert repairs and installations"
  },
  { 
    title: "Elder Care", 
    img: "/abidatema.png", 
    href: "/services?cat=elder",
    description: "Compassionate emergency assistance"
  },
  { 
    title: "Plumbing", 
    img: "/plumbing-1.png", 
    href: "/services?cat=plumbing",
    description: "Fast, reliable plumbing solutions"
  },
  { 
    title: "Electrical", 
    img: "/light-1.png", 
    href: "/services?cat=electrical",
    description: "Safe electrical installations & repairs"
  },
  { 
    title: "Painting", 
    img: "/painting-1.png", 
    href: "/services?cat=painting",
    description: "Transform your space with color"
  },
  { 
    title: "Smart Home", 
    img: "/wifi.png", 
    href: "/services?cat=smarthome",
    description: "Modern home automation setup"
  },
  { 
    title: "Birthday Events", 
    img: "/bday.png", 
    href: "/services?cat=birthdays",
    description: "Memorable celebration planning"
  },
];

const GALLERY_IMAGES = [
  { src: "/cleaning/cleaning-1.png", alt: "Professional cleaning service" },
  { src: "/furniture-2.png", alt: "Furniture assembly" },
  { src: "/plumbing-1.png", alt: "Plumbing repairs" },
  { src: "/light-1.png", alt: "Electrical work" },
  { src: "/painting-1.png", alt: "Interior painting" },
  { src: "/cleaning/cleaning-2.png", alt: "Deep cleaning" },
  { src: "/furniture-1.png", alt: "Home repairs" },
  { src: "/plumbing-2.png", alt: "Drain services" },
];

function FadeInWhenVisible({ children, delay = 0, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const directionVariants = {
    up: { y: 60, opacity: 0 },
    down: { y: -60, opacity: 0 },
    left: { x: 60, opacity: 0 },
    right: { x: -60, opacity: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={directionVariants[direction]}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : directionVariants[direction]}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.21, 0.45, 0.27, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
}

function ScaleInWhenVisible({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.85, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.85, opacity: 0 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.45, 0.27, 0.9],
      }}
    >
      {children}
    </motion.div>
  );
}

function HeroSection({ onBrowseClick }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.1]);

  return (
    <motion.section className="landing-hero" style={{ opacity }}>
      <motion.div 
        className="landing-hero__video"
        style={{ 
          backgroundImage: `url(servicesbg.png)`,
          scale,
        }}
      />
      
      <div className="landing-hero__overlay" />
      
      <div className="landing-hero__content">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="landing-hero__text"
        >
          <h1 className="landing-hero__title">
            Your Home,
            <br />
            <span className="landing-hero__title-accent">Perfectly Serviced</span>
          </h1>
          
          <p className="landing-hero__subtitle">
            Connect with trusted professionals for all your home needs.
            <br />
            From cleaning to repairs, we've got you covered.
          </p>

          <motion.button
            className="landing-hero__cta"
            onClick={onBrowseClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            Browse Services
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path 
                d="M7 4L13 10L7 16" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="landing-hero__scroll-indicator"
        >
          <span>Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function ServicesSection({ navigate }) {
  return (
    <section className="landing-services">
      <div className="landing-container">
        <FadeInWhenVisible>
          <div className="landing-section-header">
            <h2 className="landing-section-title">Our Services</h2>
            <p className="landing-section-subtitle">
              Professional solutions for every home need
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="landing-services-grid">
          {SERVICES_SHOWCASE.map((service, idx) => (
            <FadeInWhenVisible key={service.title} delay={idx * 0.08}>
              <motion.a
                href={service.href}
                onClick={(e) => {
                  if (navigate) {
                    e.preventDefault();
                    navigate(service.href);
                  }
                }}
                className="landing-service-card"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="landing-service-card__image-container">
                  <img 
                    src={service.img} 
                    alt={service.title}
                    className="landing-service-card__image"
                  />
                  <div className="landing-service-card__overlay" />
                </div>

                <div className="landing-service-card__content">
                  <h3 className="landing-service-card__title">{service.title}</h3>
                  <p className="landing-service-card__description">{service.description}</p>
                  
                  <div className="landing-service-card__arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path 
                        d="M5 12H19M19 12L12 5M19 12L12 19" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.a>
            </FadeInWhenVisible>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.4 });

  return (
    <section className="landing-about">
      <div className="landing-about__container">
        <div className="landing-about__grid">
          <FadeInWhenVisible direction="left">
            <div className="landing-about__content">
              <h2 className="landing-about__title">Who We Are</h2>
              
              <div className="landing-about__text">
                <p>
                  <strong>Finderr</strong> connects you with skilled, verified professionals 
                  across Morocco. We believe every home deserves quality care, and every 
                  service provider deserves fair opportunities.
                </p>
                
                <p>
                  From everyday maintenance to urgent emergencies, our platform makes it 
                  simple to find trusted help when you need it most. We're building a 
                  community where homeowners and service professionals thrive together.
                </p>
                
                <p>
                  With transparent pricing, real reviews, and instant booking, we're 
                  modernizing home services one appointment at a time.
                </p>
              </div>

              <div className="landing-about__stats">
                <div className="landing-about__stat">
                  <div className="landing-about__stat-number">5,000+</div>
                  <div className="landing-about__stat-label">Happy Customers</div>
                </div>
                
                <div className="landing-about__stat">
                  <div className="landing-about__stat-number">500+</div>
                  <div className="landing-about__stat-label">Verified Professionals</div>
                </div>
                
                <div className="landing-about__stat">
                  <div className="landing-about__stat-number">4.8★</div>
                  <div className="landing-about__stat-label">Average Rating</div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="right" delay={0.2}>
            <div className="landing-about__media" ref={videoRef}>
              <motion.div
                className="landing-about__video-container"
                animate={isInView ? { 
                  boxShadow: [
                    "0 20px 60px rgba(34, 197, 94, 0.15)",
                    "0 30px 80px rgba(34, 197, 94, 0.25)",
                    "0 20px 60px rgba(34, 197, 94, 0.15)",
                  ]
                } : {}}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div 
                  className="landing-about__video-placeholder"
                  style={{ backgroundImage: `url(/cleaning/cleaning-1.png)` }}
                >
                  <div className="landing-about__play-button">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <circle cx="24" cy="24" r="24" fill="white" fillOpacity="0.95" />
                      <path 
                        d="M19 15L33 24L19 33V15Z" 
                        fill="#22c55e" 
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>

              <div className="landing-about__decoration" />
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const scrollerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || isPaused) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollPosition >= scroller.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scroller.scrollLeft = scrollPosition;
      
      if (!isPaused) {
        requestAnimationFrame(animate);
      }
    };

    const animationFrame = requestAnimationFrame(animate);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  const duplicatedImages = [...GALLERY_IMAGES, ...GALLERY_IMAGES, ...GALLERY_IMAGES];

  return (
    <section className="landing-gallery">
      <div className="landing-container">
        <FadeInWhenVisible>
          <div className="landing-section-header">
            <h2 className="landing-section-title">See Our Work</h2>
            <p className="landing-section-subtitle">
              Real homes, real results from our trusted professionals
            </p>
          </div>
        </FadeInWhenVisible>
      </div>

      <FadeInWhenVisible delay={0.2}>
        <div 
          className="landing-gallery__wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={scrollerRef}
            className="landing-gallery__scroller"
          >
            {duplicatedImages.map((img, idx) => (
              <div key={`${img.src}-${idx}`} className="landing-gallery__item">
                <img 
                  src={img.src} 
                  alt={img.alt}
                  className="landing-gallery__image"
                />
                <div className="landing-gallery__item-overlay">
                  <span>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </FadeInWhenVisible>

      <div className="landing-gallery__hint">
        Hover to pause • Auto-scrolling gallery
      </div>
    </section>
  );
}

function CTASection({ onBrowseClick }) {
  return (
    <section className="landing-cta">
      <div className="landing-container">
        <ScaleInWhenVisible>
          <div className="landing-cta__content">
            <h2 className="landing-cta__title">
              Ready to Get Started?
            </h2>
            
            <p className="landing-cta__text">
              Join thousands of satisfied customers who trust Finderr 
              for their home service needs.
            </p>

            <motion.button
              className="landing-cta__button"
              onClick={onBrowseClick}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Service Now
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path 
                  d="M7 4L13 10L7 16" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </div>
        </ScaleInWhenVisible>
      </div>
    </section>
  );
}

export default function Landing({ navigate }) {
  const handleBrowseClick = () => {
    if (navigate) {
      navigate('/services');
    } else {
      window.location.href = '/services';
    }
  };

  return (
    <div className="landing-page">
      <HeroSection onBrowseClick={handleBrowseClick} />
      <ServicesSection navigate={navigate} />
      <AboutSection />
      <GallerySection />
      <CTASection onBrowseClick={handleBrowseClick} />
    </div>
  );
}
