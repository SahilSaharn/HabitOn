import React, { useState } from 'react'
import '../Component_styles/Navbar_styles.css'
import { easeInOut, motion } from 'framer-motion';

import { FaHome, FaCompass, FaUserPlus, FaBars, FaTimesCircle } from 'react-icons/fa';
import Mobilenav from './Mobilenav';
import '../Component_styles/Navbar_styles.css';
function Navbar() {

  const [showMobileNav, setShowMobileNav] = useState(false);
  return (<>
    <div className='navbar-cont' >
      <motion.h2

        initial={{
          opacity: 0,
          x: -100
        }}

        animate={{
          opacity: 1,
          x: 0
        }}

        transition={{
          duration: 0.6,
          ease: easeInOut,
          type: 'spring'
        }}

      >
        Habit-O(n)
      </motion.h2>
      <div className="links-cont sofi">
        <a href="/home"> <span> <FaHome /> Home </span> </a>
        <a href="/joke"> <span> <FaCompass /> Explore </span> </a>
        <a href="/coke" id='signup-btn'> <span> <FaUserPlus /> Sign In/Up </span> </a>
      </div>

      <motion.div
        className="mobile-nav"
        style={{ color: (showMobileNav) ? '#fb3636' : '#154ab1' }}
        onClick={() => setShowMobileNav((prev) => !prev)}
        initial={{
          rotate: '360deg',
          x: 50,git 
        }}
        animate={{
          rotate: '0deg',
          x: 0,
        }}
        transition={{
          duration: 0.5,
          type: 'spring',
          ease: easeInOut
        }}
      >
        {showMobileNav ? <FaTimesCircle /> : <FaBars />}
      </motion.div>
    </div>

    {showMobileNav && <Mobilenav />}
  </>)

}

export default Navbar