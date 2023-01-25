import React , {useEffect ,useContext ,useState} from 'react'
import '../Component_styles/RegisterUserPage_styles.css'
import userContext from '../Contexts/UserAndThemeContext'
import ErrorContext from '../Contexts/ErrorContext'
import Loader from './Loader'
import registerImg from '../usedImages/undraw_account_re_o7id.svg'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {FaEye ,FaEyeSlash ,FaExchangeAlt} from "react-icons/fa";
import {motion  ,AnimatePresence} from 'framer-motion'

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


function RegisterUserPage() {
  
  const {addError} = useContext(ErrorContext);
  const {user , setUser} = useContext(userContext);

  const [showLoader, setShowLoader] = useState(false);
  const [errorData , setErrorData] = useState({});
  const [type , setType] = useState('password');
  const redirect = useNavigate();

  const [formData ,setFormData] = useState({
    email : user.email,
    name : "",
    password : "",
    cpassword : "",
    gender : "Male",
    dob : ""
  })

  useEffect( ()=>{

    if(!user.gotCode){
      redirect("/signup")
    } else if(!user.verifiedCode){
      redirect(`/verify/${user.email}`)
    }

  } , [])
  
  //to show the error...
  useEffect(()=>{
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);

  const handleFormData = (e) => {
    setFormData( prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }) )
  }

  const toggleType = (e) => {
    e.preventDefault();
    if(type === 'password')
      setType("text")
    else setType("password")
  }
  
  const handleGender = (e) => {
    e.preventDefault();
    setFormData( (prev) => ({
      ...prev,
      gender : (prev.gender === "Male") ? "Female" : "Male"
    }) )
  }

  const registerUser = async (e) => {
    //our regex to test any special characters in name...
    e.preventDefault();
    if( showLoader )
      return;
    else setShowLoader(true);

    //validating name of user 
    const regex = /[^a-zA-Z\s]/;
    if( regex.test(formData.name) ){
      setErrorData({message : "Name Cannot Contain special Characters" , type : false})
      setShowLoader(false);
      return;
    } else if( formData.name.length > 40 ){
      setErrorData({message : "Name tooo Long MaxCharacter(40)" , type : false})
      setShowLoader(false);
      return;
    } else if( formData.name.trim().length <= 2 ){
      setErrorData({message : "Name to Short" , type : false})
      setShowLoader(false);
      return;
    }else if (formData.name.trim().length  <= 0) {
      setErrorData({message : "Invalid Name" , type : false})
      setShowLoader(false);
      return;
    }

    //validaing password..
    const isValidPass = checkString(formData.password);
    if(!isValidPass.ans){
      setErrorData({message : isValidPass.message , type : false})
      setShowLoader(false);
      return;
    }

    //validating password and confirm password
    if(formData.password !== formData.cpassword){
      setErrorData({message : "Password And Confirm Password must match" , type : false})
      setShowLoader(false);
      return;
    }

    //till here now we are good to go for our post request and register user...
    console.log('our nice post request :)');
    
    const req_body = {
      email : formData.email,
      name : formData.name,
      password : formData.password.replace(/"/g, '\\"'),
      gender : (formData.gender === "Male") ? "M" : "F",
      dob : formData.dob
    }
    // .replace(/"/g, '\"')
    console.log(req_body)

    try{

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY
      };

      const res = await axios.post('http://localhost:5050/register_user' , req_body , {headers})
      console.log(res);
      if(res.data.type){
        setErrorData( {message : res.data.message ,type :res.data.type } )
        //means we registered user correctly
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

  // console.log(formData);
  let date = new Date();
  const maxDate = date.toISOString().split('T')[0];

  return (
    <>
          <motion.div>
            <div className="register-card-cont ">
                <motion.form className="register-card" onSubmit={registerUser} >

                    <div align='center'>
                        <img draggable='false' id='verify-imageCard' src={registerImg} alt="!oopps" />
                    </div>

                    <p className="text">Fill Out the form to Create a Account on Habit-O(n)</p>

                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" placeholder='Full-Name' onChange={handleFormData}  required  autoComplete='off' spellCheck='false' id="name" name='name'  />
                    </div>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder='Email' readOnly={true} defaultValue={user.email} id="email" name='email'  />
                    </div>
                    <div className="input-field">
                        <label htmlFor="pass">Password</label>
                        <div className='pass-field ' >
                          <input type={type} placeholder='password'  onChange={handleFormData}  required autoComplete='off' id="pass" name='password'  />
                          <button className='show-pass-icon' onClick={toggleType} >{ (type==='password') ? <FaEye/> : <FaEyeSlash/> }</button>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="cpass">Confirm Password</label>
                        <div className='pass-field ' >
                          <input type={type} placeholder='password'  onChange={handleFormData}  required autoComplete='off' id="cpass" name='cpassword'  />
                          <button className='show-pass-icon' onClick={toggleType} >{ (type==='password') ? <FaEye/> : <FaEyeSlash/> }</button>
                        </div>
                    </div>

                    {/* gender input */}
                    <div className="input-field">
                        <label htmlFor="gender">Gender</label>
                        <div className='pass-field ' >
                          <input type='text' readOnly='true' required autoComplete='off' value={formData.gender} id='gender' style={{
                              backgroundColor : (formData.gender === 'Male') ? '#87cefa' : '#ffb6c1'
                            }}  
                          />
                          <button className='show-pass-icon' onClick={handleGender} > <FaExchangeAlt/> </button>
                        </div>
                    </div>
                  
                    <div className="input-field">
                        <label htmlFor="dob">Date Of Birth</label>
                        <div className='pass-field'>
                          <input type='date' placeholder='Date of birth' required min={"1900-01-01"} max={maxDate} onChange={handleFormData} autoComplete='off' id="dob" name='dob'  />
                        </div>
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

export default RegisterUserPage
