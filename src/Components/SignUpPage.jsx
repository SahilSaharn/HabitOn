import React , {useContext, useState ,useEffect} from 'react'
import ErrorContext from '../Contexts/ErrorContext'
import mailImage from "../usedImages/mail_illustartion.png"
import Loader from './Loader'
import { AnimatePresence, motion } from 'framer-motion'
import "../Component_styles/SignUpPage_styles.css"

function SignUpPage() {
    const cont = useContext(ErrorContext);

    //funtion and state fr our input field...
    const [mail ,setMail] = useState("");
    const [showLoader, setShowLoader] = useState(false);

    const getMail = (e) => {
        setMail(e.target.value)
    }
    console.log(mail);

    const formSubbed= (e) => {
        e.preventDefault();
        //now we have to make our post request here and redirect user...
        setShowLoader( (prev) => !prev )
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
            exit={{ x: "90vw", opacity : 0  }}
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
                        <input type="email" id="mail" spellCheck='false' onChange={getMail} value={mail} />
                    </div>
                    
                    <button>
                    <AnimatePresence exitBeforeEnter>
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
