import React , {useContext, useState ,useEffect} from 'react'
import { useNavigate ,Link } from "react-router-dom";
import axios from 'axios'
import ErrorContext from '../Contexts/ErrorContext'
import userContext from '../Contexts/UserAndThemeContext';
import mailImage from "../usedImages/mail_illustartion.png"
import Loader from './Loader'
import { FaAngleDoubleRight } from "react-icons/fa";

import VerifyPage from './VerifyPage';
import RegisterUserPage from './RegisterUserPage';

import { AnimatePresence, motion } from 'framer-motion'
import "../Component_styles/SignUpPage_styles.css"

function SignUpPage() {
    const {user} = useContext(userContext)
    const redirect = useNavigate()

    if(user.auth){
        redirect(`/habits/${user.name.replace(/\s/g, "_")}`)
        return (<SignInedPage user = {user} />)
    }

    if(user.gotCode && user.verifiedCode){
        return (< RegisterUserPage />)
    } else if( user.gotCode ){
        return (< VerifyPage usedFor={false} />)
    } else {
        return ( <SignUpComponent/> )
    }
}

function SignUpComponent() {
    const cont = useContext(ErrorContext);
    const {user , setUser} = useContext(userContext);
    //funtion and state fr our input field...

    const [mail ,setMail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [errorData , setErrorData] = useState({});
    const [mailExist , setMailExist] = useState(false);

    useEffect(()=>{
        if(errorData.message){
            cont.addError(errorData.message , errorData.type)
        }
    } , [errorData]);

    const getMail = (e) => {
        if(mailExist){
            //means user changed the exisiting mail so then we will let them make a request...
            setMailExist(false)
        }
        if(showLoader){
            return
        } else {
            setMail(e.target.value)
        }
    }

    const formSubbed= async (e) => {
        e.preventDefault();
        // console.log('making request');
        // now we have to make our post request here and redirect user...
        if(user.gotCode){
            setErrorData({message : "Code Already Has been sent" , type : true});
            return;
        } else if (mailExist) {
            setErrorData({message : "Email Already In Use !" , type : false});
            return;
        }

        if(showLoader)
            return;
        else setShowLoader(true);
        
        console.log('making request')
        try{

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': process.env.REACT_APP_API_KEY
            };

            const {data} = await axios.post('https://pouncing-iodized-lightyear.glitch.me/generate_code' , {email : mail} ,{headers})
            if(data.type){
                //means its true...
                setErrorData({message : data.message , type : data.type});
                setTimeout( () => setUser( (prev) => ({...prev , gotCode : true , email : data.email}) ) , 1000 );
            }
            
        } catch(e) {
            
            if("response" in e){
                console.log(e.response.data)
                setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
                if(e.response.data.message === "Email Already In Use !" ){
                    setMailExist(true)
                }
            } else {
                setErrorData( {message : e.message ,type : false } )
            }
        }

        setShowLoader(false);
    }

    const handleExitComplete = () => {
        setShowLoader(!showLoader);
    };

    return (
    <>
        <motion.div
            initial = {{x: "-90vw", opacity : 0}}
            animate = {{x: 0, opacity : 1}}
            transition = {{duration : 0.6}}
            exit={{ x: "90vw", opacity : 0 }}
        >
            <div className="signup-card-cont ">
                <motion.form className="signup-card " onSubmit={formSubbed}
                    initial = {{opacity :0 , scale : 0.4}}
                    animate = {{opacity :1 ,scale  :1}}
                    transition ={{delay :0.8, duration :1 ,type :'spring' ,bounce : 0.5}}
                >
                    <div align='center'>
                        <img draggable='false' id='imageCard' src={mailImage} alt="!oopps" />
                    </div>
                    
                    <div className="input-field">
                        <label htmlFor="mail">Email</label>
                        <input type="email" id="mail" autoComplete='off' required spellCheck='false' onChange={getMail} value={mail} />
                    </div>
                    
                    <button>
                    <AnimatePresence mode='wait'>
                        { (showLoader) ? <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >Sign Up</motion.div> }
                    </AnimatePresence>
                    </button>
                    
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

export default SignUpPage
