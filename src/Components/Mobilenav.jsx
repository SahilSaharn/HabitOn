import React from 'react'
import "../Component_styles/Mobilenav.css"
import { FaHome , FaCompass , FaUserPlus , FaBars ,FaTimesCircle} from 'react-icons/fa';

function Mobilenav() {
  return (
    <div className='mobile-nav-cont'>
        <div className="links-holder sofi">
            <a href="/home"> <span> <FaHome/> Home </span> </a>
            <a href="/joke"> <span> <FaCompass/> Explore </span> </a>
            <a href="/coke"> <span> <FaUserPlus/> Sign In/Up </span> </a>
        </div>
    </div>
  )
}

export default Mobilenav
