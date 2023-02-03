import React , {useState ,useEffect  ,useContext} from 'react'
import axios from 'axios';
import '../Component_styles/AddHabitPage_styles.css'
import AddHabitImage from '../usedImages/addHabitPageImage.svg'
import ErrorContext from '../Contexts/ErrorContext';
import UserContext from '../Contexts/UserAndThemeContext'
import { FaTimesCircle ,FaCalendarPlus } from 'react-icons/fa';
import {motion  ,AnimatePresence, calcLength} from 'framer-motion'
import Loader from './Loader';


function AddHabitPage({toggleModal}) {

  const {addError} = useContext(ErrorContext);
  const {user} = useContext(UserContext); 

  const [habitData, setHabitData] = useState({
    habit_name : "",
    habit_description : ""
  })

  const [days ,setDays] = useState([false,false,false,false,false,false,false]);
  const [showLoader, setShowLoader] = useState(false);
  const [errorData , setErrorData] = useState({});

  useEffect(()=>{ 
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);

  useEffect( () => {
    console.log(user)
  },[] )

  const handleAddHabitSubmit = async (e) => {
    e.preventDefault();
    if( showLoader )
      return;
    else setShowLoader(true);
    //our validation here and our post...

    //validating habit name 
    const regex = /^[a-zA-Z_\-\s]+$/
    const onlyAlphabets = /[a-zA-Z]/

    if( !regex.test(habitData.habit_name) ){
      setErrorData({message : "Name Cannot Contain special Characters" , type : false})
      setShowLoader(false);
      return;
    } else if ( !onlyAlphabets.test(habitData.habit_name) ){
      setErrorData({message : "Name Must contain alphabets" , type : false})
      setShowLoader(false);
      return;
    } else if( habitData.habit_name.length > 40 ){
      setErrorData({message : "Name tooo Long MaxCharacter's(40)" , type : false})
      setShowLoader(false);
      return;
    } else if( habitData.habit_name.trim().length <= 5 ){
      setErrorData({message : "Name to Short" , type : false})
      setShowLoader(false);
      return;
    }else if (habitData.habit_name.trim().length  <= 0) {
      setErrorData({message : "Invalid Name" , type : false})
      setShowLoader(false);
      return;
    }

    //validating habit_description...
    if(habitData.habit_description.trim().length <= 10){
      setErrorData({message : "Very short description!" , type : false})
      setShowLoader(false);
      return;
    } else if ( !onlyAlphabets.test(habitData.habit_description.trim()) ){
      setErrorData({message : "description Must contain alphabets" , type : false})
      setShowLoader(false);
      return;
    }

    //validating days user must have one chossen...
    if( days.filter( ele => ele === true ).length <= 0 ){
      setErrorData({message : "Must Choose a Day for your habit" , type : false})
      setShowLoader(false);
      return;
    }

    //till now we can make the post request ...
    try{

      const req_body = {
        email : user.email,
        habit_name : habitData.habit_name,
        habit_desc : habitData.habit_description.replace(/"/g, '\\"'),
        daysOn : days
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY
      };

      const res = await axios.post('http://localhost:5050/add_habit' , req_body , {headers})
      console.log(res)
      if(res.data.type){
        setErrorData({message : `Habit : ${res.data.habit_name} has been added successfully` , type : res.data.type})
        //after adding habit we change context here ...
        setTimeout( ()=> toggleModal() ,2000 );
      }
      
    } catch(e) {
      console.log(e)
      if("response" in e){
        setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
      } else {
        setErrorData( {message : e.message ,type : false } )
      }
    }
    setShowLoader(false);
  }

  const toggleDay = (i) => {
    setDays( (prev) =>{
      let temp = [...prev]
      temp[i] = !temp[i]
      return temp;
    } )
  }

  const handleHabitData = (e) => {
    setHabitData( prev => ({
      ...prev,
      [e.target.name] : e.target.value
    }) )
  }

  const daysStr = ['S' , 'M' , 'T' , 'W' ,'T' , 'F' ,'S'];
  // console.log(days)
  // console.log(habitData);
  return (
    <>
      <div className="add-modal-holder">
      <form className='add-modal-card sofi' onSubmit={handleAddHabitSubmit} >
          <div align='center'>
            <img draggable='false' id='add-habit-image' src={AddHabitImage} alt="!oopps" />
          </div>

          <div className="add-input-field">
            <label htmlFor="hname">Habit Name</label>
            <input type="text" placeholder='habit name' id='hname' autoComplete='off' required spellCheck='false' name='habit_name' value={habitData.habit_name} onChange={handleHabitData} />
          </div>

          <div className="add-input-field">
            <label htmlFor="hdesc">Habit Description</label>
            <textarea placeholder='Describe your habit here' rows={3} name="habit_description" autoComplete='off' id="hdesc" required spellCheck='false' value={habitData.habit_description} onChange={handleHabitData} ></textarea>
          </div>

          <div className="add-input-field">
            <label htmlFor="hdesc">Pick Days per Week</label>
            <div className="add-days-btns">
              {daysStr.map( (ele , i) => <button className="add-days-btn" key={i} 
                onClick = {(e) => {
                  e.preventDefault();
                  toggleDay(i);
                }}
                style = {{
                  color : (days[i]) ? '#f9f9f9' : '#0a1931',
                  backgroundColor: (days[i]) ? '#0a1931' : '#e6e6e6',
                  boxShadow: (days[i]) ? "0px 3px 3px #66d441" : "" 
                }}
              > {ele} </button> )}
            </div>
          </div>
          
          <div align='center'>
            {/* <button id='add-submit-btn' > <FaCalendarPlus/> &nbsp; Add Habit </button> */}
          <button id= 'add-submit-btn' >
            <AnimatePresence mode='wait'>

              { (showLoader) ? 
              <Loader color={'#f9f9f9'} hieght={'1.6rem'} width= {'1.6rem'} key={1} /> : 
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:1}} key={2} >
                 <FaCalendarPlus/> &nbsp; Add Habit
              </motion.div> }

            </AnimatePresence>
          </button>
          </div>

          <button id='close-modal-btn' onClick={ (e)=>{
            e.preventDefault();
            toggleModal();
          } } > <FaTimesCircle/> </button>
      </form>
      </div>
    </>
  )
}

export default AddHabitPage