import React from 'react'
import "../Component_styles/Mobilenav.css"
import { motion } from 'framer-motion';
import { FaHome, FaCompass, FaUserPlus, FaBars, FaTimesCircle } from 'react-icons/fa';

function Mobilenav() {
  return (
    <motion.div className='mobile-nav-cont'
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.3
      }}
    >
      <motion.div className="links-holder sofi"
        initial={{
          opacity: 0,
          x: -500,
        }}
        animate={{
          opacity: 1,
          x: 0
        }}
        transition={{
          duration: 0.5,
          type: 'spring'
        }}
      >
        <a href="/home"> <span> <FaHome /> Home </span> </a>
        <a href="/joke"> <span> <FaCompass /> Explore </span> </a>
        <a href="/coke"> <span> <FaUserPlus /> Sign In/Up </span> </a>
      </motion.div>
    </motion.div>

  )
}

export default Mobilenav
