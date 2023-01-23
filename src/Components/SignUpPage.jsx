import React , {useContext, useState ,useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import ErrorContext from '../Contexts/ErrorContext'
import userContext from '../Contexts/UserAndThemeContext';
import mailImage from "../usedImages/mail_illustartion.png"
import Loader from './Loader'
import { AnimatePresence, motion } from 'framer-motion'
import "../Component_styles/SignUpPage_styles.css"

function SignUpPage() {
    const cont = useContext(ErrorContext);
    const {user , setUser} = useContext(userContext);
    //funtion and state fr our input field...

    const [mail ,setMail] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [errorData , setErrorData] = useState({});

    const redirect = useNavigate();

    useEffect(()=>{
        if(errorData.message){
            cont.addError(errorData.message , errorData.type)
        }
    } , [errorData]);

    useEffect( ()=>{
        if (user.gotCode) {
            setErrorData({message : "Verification code sent success : Redirecting to verify page     " , type : true});
            const timeoutId = setTimeout(() => {
              redirect(`/verify/${user.email}`);
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    } ,[user.gotCode , redirect] )

    const getMail = (e) => {
        setMail(e.target.value)
    }

    console.log(mail);
    // habit-0(n)*gurjass-2015^<sahil>!jaiMataDi... [api_key]...
    const formSubbed= async (e) => {
        e.preventDefault();
        console.log('making request');
        // now we have to make our post request here and redirect user...
        if(user.gotCode){
            setErrorData({message : "Code Already Has been sent" , type : true});
            return;
        }

        if(showLoader)
            return;
        else setShowLoader(true);
        
        try{
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': process.env.REACT_APP_API_KEY
            };
            const {data} = await axios.post('http://localhost:5050/generate_code' , {email : mail} ,{headers})
            if(data.type){
                //means its true...
                // setErrorData({message : data.message , type : data.type});
                setUser( (prev) => ({...prev , gotCode : true , email : mail}) );
            }
            
        } catch(e) {
            if("response" in e){
                console.log(e.response.data)
                setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
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

export default SignUpPage
