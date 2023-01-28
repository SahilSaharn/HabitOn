import React, { useState ,useContext } from 'react'
import '../Component_styles/Navbar_styles.css'
import { easeInOut, motion ,AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaCompass, FaUserPlus, FaBars, FaTimesCircle ,FaUser ,FaCalendarAlt } from 'react-icons/fa';
import Mobilenav from './Mobilenav';
import userContext from '../Contexts/UserAndThemeContext';
import '../Component_styles/Navbar_styles.css';
import userEvent from '@testing-library/user-event';
function Navbar() {

  const {user} = useContext(userContext);
  

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
      <motion.div className="links-cont sofi"
        initial = {{opacity :0, y:-100}}
        animate = {{opacity :1 , y:0}}
        transition = {{delay :0.7}}
      >
        <Link to="/"> <span> <FaHome /> &nbsp; Home </span> </Link>
        <Link to="/explore"> <span> <FaCompass /> &nbsp; Explore </span> </Link>
        {(user.auth && <Link to="/explore"> <span> <FaCalendarAlt /> &nbsp; Habits </span> </Link> )}

        {
          (user.auth) ? 
          <Link to="/signin" > <span> <FaUser/> &nbsp; {(user.name.length > 13) ? `${user.name.substring(0,15)}...` : user.name} </span> </Link> :
          <Link to="/signin" id='signup-btn' > <span> <FaUserPlus /> &nbsp; Sign In/Up </span> </Link>
        }
      </motion.div>

      <div
        className="mobile-nav"
        style={{ color: (showMobileNav) ? '#fb3636' : '#154ab1' }}
        onClick={() => setShowMobileNav((prev) => !prev)}
      >
        <AnimatePresence>
        {showMobileNav ?
        ( <motion.div key="circle" 
        initial ={{scale:0, rotate:"180deg"}} 
        animate={{scale :1, rotate: "0deg"}} 
        exit={{x:100 ,rotate:"-180deg" }}
        transition = {{duration : 0.6}}
        ><FaTimesCircle/></motion.div> )
        : (<motion.div key="bars" 
        initial ={{scale:0, rotate:"180deg"}} 
        animate={{scale :1, rotate: "0deg"}} 
        exit={{x:100 ,rotate:"-180deg" }}
        transition = {{duration : 0.6}}
        ><FaBars/></motion.div> )
        }
        </AnimatePresence>
      </div>
    </div>
    <AnimatePresence>
    {showMobileNav && <Mobilenav key={'hello'} closeMobileNav={setShowMobileNav} />}
    </AnimatePresence>
  </>)

}

export default Navbar