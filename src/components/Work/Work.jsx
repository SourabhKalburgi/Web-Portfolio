import React from "react";
import { workExp } from "../../utils/data";
import css from "./Work.module.scss";
import { motion } from 'framer-motion';
import { fadeIn, staggerChildren } from "../../utils/motion";

const Work = () => {
  return (
    <motion.section 
      variants={staggerChildren}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={css.wrapper}
    >
      <a className="anchor" id="work"></a>

      <div className={css.container}>
        <motion.div 
          variants={fadeIn("down", "tween", 0.2, 1)}
          className={css.heading}
        >
          <h2>Professional Journey</h2>
          <p>Building innovative solutions across different domains</p>
        </motion.div>

        <div className={css.timeline}>
          {workExp.map((exp, i) => (
            <motion.div 
              key={i}
              variants={fadeIn("up", "tween", 0.2 * i, 0.5)}
              className={css.timelineItem}
            >
              <div className={css.timelineContent}>
                <div className={css.timeHeader}>
                  <span className={css.date}>{exp.tenure}</span>
                  <span className={css.company}>{exp.place}</span>
                </div>
                
                <div className={css.role}>
                  <h3>{exp.role}</h3>
                  <p>{exp.detail}</p>
                </div>

                <div className={css.skills}>
                  {exp.skills?.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
              </div>
              
              <div className={css.timelineDot}>
                <div className={css.dot}></div>
                <div className={css.line}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
