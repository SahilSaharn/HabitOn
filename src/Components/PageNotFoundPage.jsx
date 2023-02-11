import React ,{useContext  } from 'react';
import userContext from '../Contexts/UserAndThemeContext';
import notFoundImage from '../usedImages/pageNotFoundImage.svg'
import {FaAngleDoubleRight , FaFrown} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import "../Component_styles/NotAuthorized_and_NotFoundPage_styles.css"
function PageNotFoundPage() {
  const {user} = useContext(userContext)
  console.log(user)
  return (
    <>
      <motion.div className="all-incenter sofi"
        initial = {{opacity : 0}}
        animate = {{opacity : 1}}
        transition = {{duration : 0.5}}
        exit ={{opacity : 0}}
      >
        <div align='center'>
          <img className='not-found-image' src={notFoundImage} alt="page not found :(" />
          <motion.h3
            initial = {{opacity : 0 , scale :0}}
            animate = {{opacity : 1 , scale :1}}
            transition = {{delay : 0.6 , type : 'spring' , bounce : 0.7 , duration : 0.5}}
          ><FaFrown/> &nbsp; 404 : Page Not Found </motion.h3>
          <motion.span
            initial = {{y : 50 , opacity:0}}
            animate = {{y : 0 , opacity:1}}
            transition = {{delay : 0.8  ,type :'tween' ,duration : 0.3}}
          >
            <Link to={ user.auth ? `/habits/${user.name.replace(/\s/g, "_")}` : '/signin' } > { user.auth ? "Your habits" : "Sign-in" } &nbsp; <FaAngleDoubleRight/> </Link>
          </motion.span>
        </div>
      </motion.div>
    </>
  )
}

export default PageNotFoundPage
