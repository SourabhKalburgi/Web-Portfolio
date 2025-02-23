import React, { useState } from "react";
import { motion } from "framer-motion";
import css from "./Portfolio.module.scss";
import { fadeIn, staggerChildren } from "../../utils/motion";

const Portfolio = () => {
  const [activeProject, setActiveProject] = useState(null);

  const projects = [
    {
      id: 1,
      title: "Group Study App",
      description: "A collaborative learning platform built with MERN stack",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      image: "./showCase1.png",
      link: "https://groupstudymernui.onrender.com/",
      category: "Full Stack"
    },
    {
      id: 2,
      title: "AI Research Assistant",
      description: "AI-powered tool for academic research and analysis",
      tech: ["Python", "OpenAI", "React", "FastAPI"],
      image: "./project-4.png",
      link: "https://airesearchassistant-frontend.onrender.com/",
      category: "AI"
    },
    {
      id: 3,
      title: "UX Portfolio",
      description: "Showcase of UI/UX design projects and case studies",
      tech: ["Figma", "Adobe XD", "Prototyping"],
      image: "./showCase3.png",
      link: "https://sourabhkalburgi18.wixsite.com/portfolio",
      category: "UI/UX"
    },
    {
      id: 4,
      title: "Keeper App",
      description: "Note-taking application with cloud sync",
      tech: ["React", "Firebase", "Material-UI"],
      image: "./showCase2.png",
      link: "https://keeperapp-gy3m.onrender.com/",
      category: "Full Stack"
    }
  ];

  return (
    <motion.section
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={css.wrapper}
    >
      <a className={css.anchor} id="portfolio"></a>

      <div className={css.container}>
        <motion.div variants={fadeIn("down", "tween", 0.2, 1)} className={css.heading}>
          <h2>Featured Projects</h2>
          <p>Exploring the intersection of design and technology</p>
        </motion.div>

        <div className={css.projectGrid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={fadeIn("up", "tween", 0.2 * index, 0.5)}
              className={`${css.projectCard} ${activeProject === project.id ? css.active : ''}`}
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className={css.projectContent}>
                <div className={css.projectImage}>
                  <img src={project.image} alt={project.title} />
                  <div className={css.category}>{project.category}</div>
                </div>
                
                <div className={css.projectInfo}>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  
                  <div className={css.techStack}>
                    {project.tech.map((tech, i) => (
                      <span key={i}>{tech}</span>
                    ))}
                  </div>

                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={css.viewProject}
                  >
                    View Project
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M16.004 9.414l-8.607 8.607-1.414-1.414L14.589 8H7.004V6h11v11h-2V9.414z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Portfolio;