import React , {useState , useEffect , useContext} from 'react'
import "../Component_styles/SignInPage_styles.css"
import userContext from '../Contexts/UserAndThemeContext'
import ErrorContext from '../Contexts/ErrorContext'
import Loader from './Loader';
import {FaEye ,FaEyeSlash ,FaAngleDoubleRight } from "react-icons/fa";
import {motion  ,AnimatePresence} from 'framer-motion'
import signInmage from "../usedImages/loginSvg.svg"
import { useNavigate ,Link } from 'react-router-dom';
import axios from 'axios';

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
  const { user ,setUser } = useContext(userContext)
  const redirect = useNavigate()

  useEffect ( ()=> {

      const user_auth =  Boolean( sessionStorage.getItem('auth') )
      const user_email = sessionStorage.getItem('email' )
      const user_name = sessionStorage.getItem('name' )
    
      if(user_auth && user_email && user_name ){
          setUser( prev => ({
              ...prev, 
              auth : user_auth,
              name : user_name,
              email : user_email,
          }))
      }

  } , [] )

  if(user.auth){
    redirect(`/habits/${user.name.replace(/\s/g, "_")}`)
    return ( <SignInedPage user={user} /> )
  } else {
    return ( <SignIn_Page/> )
  }
}

function SignIn_Page(){
  const {addError} = useContext(ErrorContext);
  const {setUser} = useContext(userContext);
  
  const [showLoader, setShowLoader] = useState(false);
  const [errorData , setErrorData] = useState({});
  const [userCreds , setUserCreds] = useState({
    email : "",
    password : ""
  });

  const [type , setType] = useState('password');

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

    if(showLoader){
      return;
    } else setShowLoader(true);
    
    const isValidPass = checkString(userCreds.password);
    if(!isValidPass.ans){
      setErrorData({message : isValidPass.message , type : false})
      setShowLoader(false);
      return;
    }

    //our post request here to validate user...
    const req_body = {
      email : userCreds.email,
      password : userCreds.password.replace(/"/g, '\\"')
    }

    try{

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY
      };

      const res = await axios.post('http://localhost:5050/verify_user_creds' , req_body , {headers})
      console.log(res.data);
      if(res.data.type){

        setErrorData( {message : res.data.message ,type :res.data.type } )
        //means user authentecated right correctly set user here...
        setTimeout( () => {

          //setting user info in session storage...
          sessionStorage.setItem('auth' , true)
          sessionStorage.setItem('email' , res.data.email)
          sessionStorage.setItem('name' , res.data.name)

          setUser( (prev) => ({
            ...prev,
            auth : true,
            gotCode : false,
            verifiedCode : false,
            forgotPass : false,
            email : res.data.email,
            name : res.data.name,
          }) )
        }  ,1000)
        
      } else {
        setErrorData( {message : res.data.message ,type :res.data.type } )
      }

    } catch (e) {

      console.log(e)
      if("response" in e){
        setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
      } else {
        setErrorData( {message : e.message ,type : false } )
      }

    }

    setShowLoader(false);
  }
  // console.log(user)
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
                          <button type='button' className='show-pass-icon' onMouseDown={toggleType} onMouseUp={toggleType} >{ (type==='password') ? <FaEye/> : <FaEyeSlash/> }</button>
                        </div>
                    </div>

                    <button type='submit' >
                    <AnimatePresence mode='wait'>
                        { (showLoader) ? <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >Sign In</motion.div> }
                    </AnimatePresence>
                    </button>

                    <div className="sign-in-links-cont">
                      <Link to='/signup' className="sign-in-link">Sign Up</Link>
                      <Link to='/forgotpassword' className="sign-in-link">Forgot Password ?</Link>
                    </div>
                    
                </motion.form>
            </div>
        </motion.div>
    </>
  )
}

function SignInedPage({user}){
  return( 
    <>
    <div className='all-incenter sofi' >
      <Link className='habits-link' to ={`/habits/${user.name.replace(/\s/g, "_")}`} > Your Habits &nbsp; <FaAngleDoubleRight/> </Link>
    </div>
    </>
  )
}

export default SignInPage
