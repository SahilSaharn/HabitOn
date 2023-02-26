import React , {useState , useEffect , useContext} from 'react'
import "../Component_styles/SignInPage_styles.css"
import userContext from '../Contexts/UserAndThemeContext'
import ErrorContext from '../Contexts/ErrorContext'
import Loader from './Loader';
import {FaEye ,FaEyeSlash  } from "react-icons/fa";
import pickPassImage from  "../usedImages/newPassImage.svg"
import {motion  ,AnimatePresence} from 'framer-motion'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

//wrapping this in a component so that is user signed in it will se only the 
function NewPassPage({email}) {

    const {addError} = useContext(ErrorContext);
    const {setUser} = useContext(userContext);
    const redirect = useNavigate();

    const [showLoader, setShowLoader] = useState(false);
    const [errorData , setErrorData] = useState({});
    const [type , setType] = useState('password');
    const [passData , setPassData] = useState ({
        newPassword : "",
        ConfirmNewPassword : ""
    })
  
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

    const handlePassFields = (e) => {
        setPassData( prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }) )
    }
  
    const updatePassword = async (e) => {
      e.preventDefault();
  
      if(showLoader){
        return;
      } else setShowLoader(true);
      
      const isValidPass = checkString(passData.newPassword);
      if(!isValidPass.ans){
        setErrorData({message : isValidPass.message , type : false})
        setShowLoader(false);
        return;
      }

      if(passData.newPassword !== passData.ConfirmNewPassword){
        setErrorData({message : "Confirm Password Should be Exact :(" , type : false})
        setShowLoader(false);
        return;
      }

      setErrorData({message : "Valid Password :)" , type : true})
      
      //our post request here to validate user...
      //reset pass is success then we will make forgot pass and verify code to false... so that if it comes back then shown again reset pass page from start...
      try{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_API_KEY
        };

        const req_body = {
          email : email,
          new_password : passData.newPassword
        }

        const {data} = await axios.put('https://pouncing-iodized-lightyear.glitch.me/update_password' , req_body , {headers})
        if(data.type){
          //means pass updated success...
          setErrorData({message : data.message , type : data.type})
          //changing our state...
          setTimeout( () => {

            redirect('/signin')
            setUser( prev => ({
              ...prev,
              forgotPass : false,
              forgorPassVerifiedCode :false
            }) )
            
          }  ,1000)
        } else {
          setErrorData({message : data.message , type : data.type})
        }
      } catch(e){
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
          <div>
              <div className="signin-card-cont ">
                  <form className="signin-card " onSubmit={updatePassword} >

                      <div align='center'>
                          <img draggable='false' id='sing-in-imageCard' src={pickPassImage} alt="!oopps" />
                      </div>

                      <div className="input-field">
                          <label htmlFor="new-pass">New Password</label>
                          <div className='pass-field'>
                            <input type={type} placeholder='new password'  required autoComplete='off' id="new-pass" name='newPassword' onChange={handlePassFields} value={passData.newPassword} />
                            <button type='button' className='show-pass-icon' onMouseDown={toggleType} onMouseUp={toggleType} onTouchStart={toggleType} onTouchEnd={toggleType} >{ (type==='password') ? <FaEye/> : <FaEyeSlash/> }</button>
                          </div>
                      </div>

                      <div className="input-field">
                          <label htmlFor="confirm-new-pass">Confirm New Password</label>
                          <div className='pass-field'>
                            <input type={type} placeholder='confirm new password'  required autoComplete='off' id="confirm-new-pass" name='ConfirmNewPassword' onChange={handlePassFields} value={passData.ConfirmNewPassword} />
                            <button type='button' className='show-pass-icon' onMouseDown={toggleType} onMouseUp={toggleType} onTouchStart={toggleType} onTouchEnd={toggleType} >{ (type==='password') ? <FaEye/> : <FaEyeSlash/> }</button>
                          </div>
                      </div>
  
                      <button type='submit' > 
                      <AnimatePresence mode='wait'>
                          { (showLoader) ? <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >Reset Password</motion.div> }
                      </AnimatePresence>
                      </button>
                        
                  </form>
              </div>
          </div>
      </>
    )
}

export default NewPassPage
