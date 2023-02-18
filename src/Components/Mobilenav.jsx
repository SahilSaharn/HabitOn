import React , {useContext} from 'react'
import "../Component_styles/Mobilenav.css"
import userContext from '../Contexts/UserAndThemeContext';
import { motion } from 'framer-motion';
import { FaHome, FaCompass, FaUserPlus ,FaUser ,FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Mobilenav(props) {

  const {user} = useContext(userContext);
  const closeMobileNav = () => {
    props.closeMobileNav( prev => !prev )
  }

  return (
    <motion.div className='mobile-nav-cont'
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      transition={{
        duration: 0.4
      }}
      exit= {{
        opacity :0
      }}
    >
      <motion.div className="links-holder sofi"
        key='hii'
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
        exit={{
          opacity: 0,
          x: 500
        }}
      >
        <Link to="/" onClick={closeMobileNav}> <span> <FaHome /> Home </span> </Link>
        {/* <Link to="/explore" onClick={closeMobileNav}> <span> <FaCompass /> Explore </span> </Link> */}
        { (user.auth) && <Link to={`/habits/${user.name.replace(/\s/g, "_")}`} onClick={closeMobileNav}> <span> <FaCalendarAlt /> Habits </span> </Link> }
        {
          (user.auth) ? 
          <Link to="/profile" onClick={closeMobileNav}> <span> <FaUser /> {(user.name.length > 13) ? `${user.name.substring(0,15)}...` : user.name} </span> </Link> :
          <Link to="/signin" onClick={closeMobileNav}> <span> <FaUserPlus /> Sign In/Up </span> </Link> 
        }
        {/* <Link to="/signin" onClick={closeMobileNav}> <span> <FaUserPlus /> Sign In/Up </span> </Link> */}
      </motion.div>
    </motion.div>
  )
}

export default Mobilenav
