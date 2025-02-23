import React, { useEffect, useRef, useState } from "react";
import css from "./Header.module.scss";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";
import { getMenuStyles, headerVariants } from "../../utils/motion";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import useHeaderShadow from "../../hooks/useHeaderShadow";

const Header = () => {
  const menuRef = useRef(null);
  const [menuOpened, setMenuOpened] = useState(false);
  const headerShadow = useHeaderShadow();

  // to handle click outside of sidebar on mobile
  useOutsideAlerter({
    menuRef,
    setMenuOpened,
  });

  const menuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      x: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      x: 20,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={headerVariants}
      initial="hidden"
      whileInView="show"
      className={`paddings ${css.wrapper}`}
      viewport={{ once: true, amount: 0.25 }}
      style={{ boxShadow: headerShadow }}
    >
      <div className={`innerWidth ${css.container} flexCenter`}>
        <div className={css.name}>Sourabh</div>
        
        <AnimatePresence>
          {(menuOpened || window.innerWidth > 768) && (
            <motion.ul
              ref={menuRef}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flexCenter ${css.menu}`}
            >
              <li>
                <a href="#portfolio" onClick={() => setMenuOpened(false)}>Portfolio</a>
              </li>
              <li>
                <a 
                  href="https://sourabhkalburgi18.wixsite.com/portfolio" 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={() => setMenuOpened(false)}
                >
                  UX PORTFOLIO
                </a>
              </li>
              <li>
                <a href="#work" onClick={() => setMenuOpened(false)}>About</a>
              </li>
              <li className={`flexCenter ${css.contact}`}>
                <a href="mailto:sourabhkalburgi35@gmail.com" onClick={() => setMenuOpened(false)}>
                  Contact
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Toggle button */}
        <div 
          className={css.menuIcon} 
          onClick={() => setMenuOpened(!menuOpened)}
        >
          {menuOpened ? (
            <BiX size={30} />
          ) : (
            <BiMenuAltRight size={30} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
