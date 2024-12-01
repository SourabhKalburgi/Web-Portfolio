import React from "react";
import { motion } from "framer-motion";
import css from "./Portfolio.module.scss";
import { fadeIn, staggerChildren, textVariant } from "../../utils/motion";

const Portfolio = () => {
  return (
    <motion.section
      variants={staggerChildren}
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={css.wrapper}
    >
      <a className={css.anchor} id="portfolio"></a>
      <div className={css.container}>
        <motion.div variants={textVariant(0.4)} className={css.heading}>
          <h2>My Latest Works</h2>
        </motion.div>
        <div className={css.showcase}>
        <PortfolioItem
            href="https://sourabhkalburgi18.wixsite.com/portfolio"
            imgSrc="./showCase3.png"
            alt="UX Portfolio Website"
            delay={0.9}
            projectName="UX Portfolio Website"
          />
          <PortfolioItem
            href="https://groupstudymernui.onrender.com/"
            imgSrc="./showCase1.png"
            alt="Sound App"
            delay={0.5}
            projectName="Group Study App"
          />
          <PortfolioItem
            href="https://keeperapp-gy3m.onrender.com/"
            imgSrc="./showCase2.png"
            alt="Keeper App"
            delay={0.7}
            projectName="Keeper App"
          />
        </div>
      </div>
    </motion.section>
  );
};

const PortfolioItem = ({ href, imgSrc, alt, delay, projectName }) => (
  <motion.div variants={fadeIn("up", "tween", delay, 0.6)}>
    <a href={href} target="_blank" rel="noopener noreferrer" className={css.portfolioItem}>
      <img src={imgSrc} alt={alt} />
      <div className={css.overlay}>
        <span className={css.projectName}>{projectName}</span>
      </div>
    </a>
  </motion.div>
);

export default Portfolio;