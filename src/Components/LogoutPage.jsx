import React, {useContext ,useState } from 'react'
import '../Component_styles/LogOut_styles.css'
import userContext from '../Contexts/UserAndThemeContext';
// import ErrorContext from '../Contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import { motion } from 'framer-motion';
function LogoutPage() {

  // const {addError} = useContext(ErrorContext);
  const {setUser} = useContext(userContext);

  // const [errorData , setErrorData] = useState({});
  const redirect = useNavigate()

  // useEffect(()=>{ 
  //   if(errorData.message){
  //       addError(errorData.message , errorData.type)
  //   }
  // } , [errorData]);

  const logOut = () => {
    sessionStorage.clear()
    setUser( {
      auth : false,
      name : "",
      email : "",
      gotCode : false,
      verifiedCode : false,
      forgotPass : false,
      forgorPassVerifiedCode :false,
      userHabits : [],
      todayHabits : []
    } )

    redirect('/signin')
  }

  return (
    <motion.div className='logout-cont sofi'
      initial = {{opacity : 0}}
      animate = {{opacity : 1}}
      exit= {{opacity : 0}}
    >
      <motion.button className='button-5' onClick={logOut} 
        initial = {{opacity : 0 , scale : 0}}
        animate = {{opacity : 1 , scale : 1 }}
        transition = {{ delay : 0.3 , duration : 0.5 , bounce : 2 }}
      > <FaPowerOff/> &nbsp; Logout ? </motion.button>
    </motion.div>
  )
}

export default LogoutPage
