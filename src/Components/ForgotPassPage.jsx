import React , {useContext, useState ,useEffect} from 'react'
import { useNavigate ,Link } from "react-router-dom";
import axios from 'axios'
import ErrorContext from '../Contexts/ErrorContext'
import userContext from '../Contexts/UserAndThemeContext';
import Loader from './Loader'
import VerifyPage from './VerifyPage'
import forgotPassImage from "../usedImages/forgotPassImage.svg"
import NewPassPage from './NewPassPage';
import "../Component_styles/SignInPage_styles.css"


import { motion , AnimatePresence } from 'framer-motion';
import { FaAngleDoubleRight } from "react-icons/fa";

function ForgotPassPage() {
    const {user} = useContext(userContext)
    const redirect = useNavigate()

    if(user.auth){
        redirect(`/habits/${user.name.replace(/\s/g, "_")}`)
        return (<SignInedPage user = {user} />)
    }

    //and if both verified is true and forgot pass is true then we will give the update pass page...
    if( user.forgotPass && user.forgorPassVerifiedCode ){
        return( <NewPassPage email={user.email} /> )
    } else if(user.forgotPass){
        return ( <VerifyPage usedFor={true} />)
    } else {
        return (<ForgetPassComponent/>)
    }
}

function ForgetPassComponent (){

    const cont = useContext(ErrorContext);
    const {user , setUser} = useContext(userContext);
  
    const [showLoader, setShowLoader] = useState(false);
    const [errorData , setErrorData] = useState({});
    const [mail ,setMail] = useState("");
    const [mailDoesNotExist , setMailDoesNotExist] = useState(false);
  
    useEffect(()=>{
        if(errorData.message){
            cont.addError(errorData.message , errorData.type)
        }
    } , [errorData]);
  
    const getMail = (e) => {

      if(mailDoesNotExist){
          setMailDoesNotExist(false)
      }
      if(showLoader){
          return
      } else {
          setMail(e.target.value)
      }

    }
  
    const handleMailSubmit = async (e) => {
      e.preventDefault();

      if(mailDoesNotExist){
        setErrorData({message : 'No such Account Exists :(' , type :false})
        return;
      }

      if(user.forgotPass){
        setErrorData({message : 'Code Already Sent Check Your Spam' , type :true})
        return;
      }

      if(showLoader){
          return;
      } else {
          setShowLoader(true)
      }
  
      //in this request we will set the forgot pass to true so then we can show verify page then confirm pass and new pass field
      //our post request here...
      console.log('making req.....')
      try{
        
          const headers = {
              'Content-Type': 'application/json',
              'Authorization': process.env.REACT_APP_API_KEY
          };
  
          const {data} = await axios.post('https://pouncing-iodized-lightyear.glitch.me/forgot_password' , {email : mail} ,{headers})
          console.log(data)
          if(data.type){
              //means it was success
              setErrorData({message : data.message , type : data.type});
              //setting our context here
              setTimeout( ()=> setUser( prev => ({
                  ...prev,
                  forgotPass : true,
                  email : data.email
              }) )  ,1000)
          } else {
              //mens req was success but something else went wrong
              setErrorData({message : data.message , type : data.type});
          }
  
      } catch (e) {
          if("response" in e){
              console.log(e.response.data)
              setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
              if(e.response.data.message === 'No such Account Exists :('){
                setMailDoesNotExist(true)
              }
          } else {
              setErrorData( {message : e.message ,type : false } )
          }
      }
      setShowLoader(false)
  
    }
  
    return (
      <>
          <div>
              <div className="signup-card-cont ">
                  <form className="signup-card " onSubmit={handleMailSubmit} >
  
                      <div align='center'>
                          <img draggable='false' id='imageCard' src={forgotPassImage} alt="!oopps" />
                      </div>
                      
                      <div className="input-field">
                          <label htmlFor="mail">Email</label>
                          <input type="email" id="mail" autoComplete='off' required spellCheck='false' onChange={getMail} value={mail} />
                      </div>
                      
                      <button>
                      <AnimatePresence mode='wait'>
                          { (showLoader) ? <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >Get Verify Code</motion.div> }
                      </AnimatePresence>
                      </button>
                      
                  </form>
              </div>
          </div>
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

// function ChangePass (){
//     return (
//     <>
//         <h2>change pass here</h2>
//         <h2>change pass here</h2>
//         <h2>change pass here</h2>
//         <h2>change pass here</h2>
//         <h2>change pass here</h2>
//         <h2>change pass here</h2>
//         <h2>change pass here</h2>
//     </>
//     )
// }

export default ForgotPassPage
