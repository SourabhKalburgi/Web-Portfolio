import React, { useEffect, useRef, useState } from "react";
import { fadeIn, staggerContainer } from "../../utils/motion";
import css from "./Hero.module.scss";
import { motion } from "framer-motion";

const Hero = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  const [currentText, setCurrentText] = useState("Full Stack");
  const phrases = ["Full Stack Development", "Artificial Intelligence", "DevOps", "UI/UX"];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    // Set canvas size
    const setCanvasSize = () => {
      const wrapper = canvas.parentElement;
      canvas.width = wrapper.offsetWidth;
      canvas.height = wrapper.offsetHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse move handler
    const handleMouseMove = (e) => {
      // Get canvas position
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate distance moved
      const dx = mouseX - prevMouseRef.current.x;
      const dy = mouseY - prevMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0) {
        const particleCount = Math.floor(distance / 5);
        for (let i = 0; i < particleCount; i++) {
          const ratio = i / particleCount;
          particlesRef.current.push({
            x: prevMouseRef.current.x + dx * ratio,
            y: prevMouseRef.current.y + dy * ratio,
            size: Math.random() * 3 + 2,
            life: 1,
            speedX: dx * 0.1,
            speedY: dy * 0.1
          });
        }
      }

      prevMouseRef.current = { x: mouseX, y: mouseY };
      mouseRef.current = { x: mouseX, y: mouseY };
    };

    // Add mousemove listener to wrapper instead of canvas
    const wrapper = canvas.parentElement;
    wrapper.addEventListener('mousemove', handleMouseMove);

    // Animation
    const animate = () => {
      // Create fade effect
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Gradually slow down
        particle.speedX *= 0.96;
        particle.speedY *= 0.96;
        
        // Update life
        particle.life -= 0.017;

        if (particle.life > 0) {
          // Create comet effect
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          
          // Brighter core
          gradient.addColorStop(0, `rgba(255, 174, 0, ${particle.life})`);
          // Dimmer tail
          gradient.addColorStop(0.4, `rgba(255, 78, 0, ${particle.life * 0.5})`);
          gradient.addColorStop(1, 'rgba(255, 78, 0, 0)');

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        } else {
          particlesRef.current.splice(index, 1);
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      wrapper.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText(prev => {
        const currentIndex = phrases.indexOf(prev);
        return phrases[(currentIndex + 1) % phrases.length];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className={css.wrapper}>
      <canvas ref={canvasRef} className={css.backgroundEffect} />
      
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={css.container}
      >
        <div className={css.content}>
          <motion.div 
            className={css.headline}
            variants={fadeIn("down", "tween", 0.2, 1)}
          >
            <h1>Software Engineer</h1>
            <h2>
              <span className={css.staticText}>Mastering </span>
              <span className={css.morphingText} data-text={currentText}>
                {currentText}
              </span>
            </h2>
          </motion.div>

          <motion.div 
            className={css.intro}
            variants={fadeIn("up", "tween", 0.4, 1)}
          >
            <p>Hey, I'm Sourabh</p>
            <p className={css.description}>
              I blend Full Stack Development, AI Integration, and DevOps practices 
              to create innovative digital solutions. With a keen eye for UI/UX, 
              I build seamless experiences that make complex technology accessible.
            </p>
            <div className={css.expertise}>
              <span>Full Stack Development</span>
              <span>Artificial Intelligence</span>
              <span>DevOps</span>
              <span>UI/UX Design</span>
            </div>
            <div className={css.cta}>
              <a href="#portfolio" className={css.primaryBtn}>View My Work</a>
              <a href="mailto:sourabhkalburgi35@gmail.com" className={css.secondaryBtn}>Contact Me</a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className={css.stats}
          variants={fadeIn("up", "tween", 0.6, 1)}
        >
          <div className={css.stat}>
            <span className={css.number}>Numerous</span>
            <span className={css.label}>Full Stack Projects</span>
          </div>
          <div className={css.stat}>
            <span className={css.number}>Smart</span>
            <span className={css.label}>AI Integrations</span>
          </div>
          <div className={css.stat}>
            <span className={css.number}>Creative</span>
            <span className={css.label}>UI/UX Designs</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
