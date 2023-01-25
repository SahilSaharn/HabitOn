import React , {useState , useEffect , useContext} from 'react'
import "../Component_styles/SignInPage_styles.css"
import userContext from '../Contexts/UserAndThemeContext'
import ErrorContext from '../Contexts/ErrorContext'
import Loader from './Loader';
import {FaEye ,FaEyeSlash } from "react-icons/fa";
import {motion  ,AnimatePresence} from 'framer-motion'
import signInmage from "../usedImages/loginSvg.svg"
import { useNavigate ,Link } from 'react-router-dom';

const checkString = (str) => {
  const lowercaseRegex = /[a-z]/;
  const uppercaseRegex = /[A-Z]/;
  const specialCharRegex = /[!@#$%^&*_(),.?":{}|<>]/;
  const numberRegex = /[0-9]/;

  if(str.length > 30){
    return ({message : "Too long password" , ans : false})
  } else if(str.trim().length < 8){
    return ({message : "Password must be 8 Characters" , ans : false})
  }

  if(!lowercaseRegex.test(str)){
    return ({message : "Noo lowercase letter in Password" , ans : false})
  } else if(!uppercaseRegex.test(str)) {
    return ({message : "Noo UPPERCASE letter in Password" , ans : false})
  } else if(!specialCharRegex.test(str)) {
    return ({message : "Noo Special Character in Password" , ans : false})
  } else if(!numberRegex.test(str)) {
    return ({message : "Noo Digit in Password" , ans : false})
  } 

  console.log('valid pass')
  return( {message : "" , ans :true} )
}

function SignInPage() {
  const {addError} = useContext(ErrorContext);
  const {user , setUser} = useContext(userContext);

  const [showLoader, setShowLoader] = useState(false);
  const [errorData , setErrorData] = useState({});
  const [userCreds , setUserCreds] = useState({
    email : "",
    password : ""
  });
  const [type , setType] = useState('password');

  const redirect = useNavigate();

  useEffect(()=>{
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);

  const toggleType = (e) => {
    e.preventDefault();
    if(type === 'password')
      setType("text")
    else setType("password")
  }

  const handleUserCreds = (e) => {
    setUserCreds( prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }) )
  }

  const signInUser= async e => {
    e.preventDefault();
    setShowLoader(true);
    const isValidPass = checkString(userCreds.password);
    if(!isValidPass.ans){
      setErrorData({message : isValidPass.message , type : false})
      setShowLoader(false);
      return;
    }

    //our post request here to validate user...

    setShowLoader(false);
  }

  console.log(userCreds);

  return (
    <>
        <motion.div
          initial = {{x: "-90vw", opacity : 0}}
          animate = {{x: 0, opacity : 1}}
          transition = {{duration : 0.6}}
          exit={{ x: "90vw", opacity : 0 }}
        >
            <div className="signin-card-cont ">
                <motion.form className="signin-card " onSubmit={signInUser}
                  initial = {{opacity :0 , scale : 0.4}}
                  animate = {{opacity :1 ,scale  :1}}
                  transition ={{delay :0.8, duration :1 ,type :'spring' ,bounce : 0.5}}
                >
                    <div align='center'>
                        <img draggable='false' id='sing-in-imageCard' src={signInmage} alt="!oopps" />
                    </div>
                    <div className="input-field">
                        <label htmlFor="mail">Email</label>
                        <input type="email" placeholder='Email' id="mail" autoComplete='off' name='email' required spellCheck='false' value={userCreds.email} onChange={handleUserCreds} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pass">Password</label>
                        <div className='pass-field'>
                          <input type={type} placeholder='password'  required autoComplete='off' id="pass" name='password' value={userCreds.password} onChange={handleUserCreds}  />
                          <button className='show-pass-icon' onMouseDown={toggleType} onMouseUp={toggleType} >{ (type==='password') ? <FaEye/> : <FaEyeSlash/> }</button>
                        </div>
                    </div>

                    <button>
                    <AnimatePresence mode='wait'>
                        { (showLoader) ? <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >Sign In</motion.div> }
                    </AnimatePresence>
                    </button>

                    <div className="sign-in-links-cont">
                      <Link to='/signup' className="sign-in-link">Sign Up</Link>
                      <Link className="sign-in-link">Forgot Password ?</Link>
                    </div>
                    
                </motion.form>
            </div>
        </motion.div>
    </>
  )
}

export default SignInPage
