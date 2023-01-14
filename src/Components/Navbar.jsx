import React, { useState } from 'react'
import '../Component_styles/Navbar_styles.css'

import { FaHome , FaCompass , FaUserPlus , FaBars} from 'react-icons/fa';

import '../Component_styles/Navbar_styles.css';
function Navbar() {

  const [showMobileNav , setShowMobileNav] = useState(false);
  return (<>
    <div className='navbar-cont' >
        <h2>
          Habit-O(n)
        </h2>
        <div className="links-cont sofi">
          <a href="/home"> <span> <FaHome/> Home </span> </a>
          <a href="/joke"> <span> <FaCompass/> Explore </span> </a>
          <a href="/coke" id='signup-btn'> <span> <FaUserPlus/> Sign In/Up </span> </a>
        </div>
        <div className="mobile-nav" onClick={ () => setShowMobileNav( (prev)=> !prev ) } >
          { showMobileNav ? <FaCompass/> : <FaBars/> }
        </div>
    </div>
  </>)

}

export default Navbar
