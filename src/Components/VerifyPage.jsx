import React , {useContext ,useEffect ,useState} from 'react'
import userContext from '../Contexts/UserAndThemeContext';
import ErrorContext from '../Contexts/ErrorContext';
import Loader from './Loader';
import { motion ,AnimatePresence } from 'framer-motion';
import mailSentImage from '../usedImages/mailSentimage.png'
import axios from 'axios';
import "../Component_styles/VerifyPage_styles.css"

function VerifyPage({usedFor}) {
  //in the verify page if usedFor is true we will update the [forgorPassVerifiedCode] this prop to true else we will update verifiedCode in user context ...
  const {user , setUser} = useContext(userContext);
  const {addError} = useContext(ErrorContext);
  const [errorData , setErrorData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [code ,setCode] = useState("");
  const [incorrectCode , setIncorrectCode] = useState(false);
  // const {email} = useParams();

  // const redirect = useNavigate();

  // useEffect( () => {
  //   // console.log('re - render');
  //   if(!user.gotCode){
  //     redirect('/signup')
  //   }
  //   if(user.verifiedCode){
  //     redirect('/register')
  //   }
  // } ,[user])

  useEffect(()=>{
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData , addError]);


  const verifyCode = async (e) => {
    e.preventDefault()

    if(user.verifiedCode){
      setErrorData({message :  "Already Verfied." , type: true})
      return;
    }

    if(incorrectCode){
      setErrorData({message :  "Incorrect Code :(" , type: false})
      return;
    }

    setShowLoader( true )
    console.log('making request .. .. .')
    try{

      const headers = {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_API_KEY
      };

      const {data} = await axios.post('https://pouncing-iodized-lightyear.glitch.me/verify_code' , {email : user.email ,code} ,{headers})
      // console.log(data)
      if(data.type){
        setErrorData({message : `Verified ${data.message}` , type: data.type})
        if(usedFor){
          setTimeout( () => setUser( (prev) => ({...prev , forgorPassVerifiedCode : true , verifiedCode : false}) ) , 1000 )
        } else {
          setTimeout( () => setUser( (prev) => ({...prev , verifiedCode : true , forgorPassVerifiedCode : false}) ) , 1000 )
        }
      } else {
        setErrorData({message :  data.message , type: data.type})
      }
      
    } catch(e) {
      // console.log(e.response.data)
      if("response" in e){
        setErrorData({message :  e.response.data.message , type :e.response.data.type})
        if(e.response.data.message === 'Incorrect Code :('){
          setIncorrectCode(true)
        }
      } else {
        setErrorData({message :  e.message , type:false})
      }
    }

    setShowLoader( false )
  }

  const handleCode = (e) =>{
    if(incorrectCode){
      setIncorrectCode(false)
    }
    if(e.target.value.length > 6)
      return;
    else setCode( () => parseInt(e.target.value , 10) );
  } 

  return (
      <>
          <motion.div
            initial = {{x: "-90vw", opacity : 0}}
            animate = {{x: 0, opacity : 1}}
            transition = {{duration : 0.6}}
            exit={{ x: "90vw", opacity : 0 }}
          >
            <div className="verify-card-cont ">
                <motion.form className="verify-card " onSubmit={verifyCode}
                  initial = {{opacity :0 , scale : 0.4}}
                  animate = {{opacity :1 ,scale  :1}}
                  transition ={{delay :0.8, duration :1 ,type :'spring' ,bounce : 0.5}}
                >
                    <div align='center'>
                        <img draggable='false' id='imageCard' src={mailSentImage} alt="!oopps" />
                    </div>
                    <p className="text">Verification code sent to {user.email} check your inbox or spam folder to get your code.</p>
                    <div className="input-field">
                        <label htmlFor="code">Code</label>
                        <input type="number" min="100000" required max="999999" autoComplete='off' id="code" value={String(code)} onChange={handleCode} />
                    </div>
                    <button>
                    <AnimatePresence mode='wait'>
                        { (showLoader) ? <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >Verify</motion.div> }
                    </AnimatePresence>
                    </button>
                    
                </motion.form>
            </div>
        </motion.div>
    </>
  )
}

export default VerifyPage
