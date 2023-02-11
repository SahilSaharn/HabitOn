import React from 'react'
import "../Component_styles/NotAuthorized_and_NotFoundPage_styles.css"
import authImage from '../usedImages/accessDeniedImage.svg'
import {FaAngleDoubleRight , FaFrown} from "react-icons/fa";
import { Link } from 'react-router-dom';


function NotAuthorizedPage() {
  return (
    <div className='all-incenter' >
        <div align='center'>
          <img className='not-auth-image' src={authImage} alt="page not found :(" />
          <h3 className='not-auth-title' ><FaFrown/> &nbsp; 409 : Not Authorized </h3>
          <Link to={ "/signin" } > sign-in/up &nbsp; <FaAngleDoubleRight/> </Link>
        </div>
    </div>
  )
}

export default NotAuthorizedPage
