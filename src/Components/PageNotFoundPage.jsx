import React ,{useContext  } from 'react';
import userContext from '../Contexts/UserAndThemeContext';
import notFoundImage from '../usedImages/pageNotFoundImage.svg'
import {FaAngleDoubleRight , FaFrown} from "react-icons/fa";
import { Link } from 'react-router-dom';

import "../Component_styles/NotAuthorized_and_NotFoundPage_styles.css"
function PageNotFoundPage() {
  const {user} = useContext(userContext)
  console.log(user)
  return (
    <>
      <div className="all-incenter sofi">
        <div align='center'>
          <img className='not-found-image' src={notFoundImage} alt="page not found :(" />
          <h3><FaFrown/> &nbsp; 404 : Page Not Found </h3>
          <Link to={ user.auth ? `/habits/${user.name.replace(/\s/g, "_")}` : '/signin' } > { user.auth ? "Your habits" : "Sign-in" } &nbsp; <FaAngleDoubleRight/> </Link>
        </div>
      </div>
    </>
  )
}

export default PageNotFoundPage
