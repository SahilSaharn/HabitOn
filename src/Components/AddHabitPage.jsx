import React , {useState , useEffect , useContext} from 'react'
import axios from 'axios';
import '../Component_styles/AddHabitPage_styles.css'
import AddHabitImage from '../usedImages/addHabitPageImage.svg'
import ErrorContext from '../Contexts/ErrorContext';
import UserContext from '../Contexts/UserAndThemeContext'
import { FaTimesCircle ,FaCalendarPlus } from 'react-icons/fa';
import {motion  ,AnimatePresence} from 'framer-motion'
import Loader from './Loader';


function AddHabitPage({toggleModal , theme}) {

  const {addError} = useContext(ErrorContext);
  const {user , setUser} = useContext(UserContext);

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
    } else if( habitData.habit_name.length > 50 ){
      setErrorData({message : "Name tooo Long MaxCharacter's(50)" , type : false})
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

      const {data} = await axios.post('http://localhost:5050/add_habit' , req_body , {headers})
      console.log(data);
      if(data.type){
        setErrorData({message : `Habit : ${data.addedHabit.habit_name} has been added successfully` , type : data.type})
        //after adding habit we change context here ...
        
        const days_map = {
          0: 'Sunday',
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday'
        }
        
        let newTodayHabits = user.todayHabits
        const currDay = days_map[new Date().getDay()]
        if(data.addedHabit.daysOn.indexOf(currDay) > -1){
          newTodayHabits.push(data.addedHabit)
        }
        console.log(newTodayHabits)
        setUser (prev => ({
          ...prev,
          userHabits : [...prev.userHabits , data.addedHabit],
          todayHabits : newTodayHabits
        }))

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
      <motion.div className="add-modal-holder"
        style={{
          backgroundColor : theme ? 'rgba(249, 249, 249, 0.7)' : 'rgba(10, 25, 49, 0.7)'
        }}
        initial = {{opacity : 0}}
        animate=  {{opacity : 1}}
        exit =    {{opacity : 0, transition : { delay : 0.8} }}
        
      >
      <motion.form className='add-modal-card sofi' onSubmit={handleAddHabitSubmit} 
        style = {{  backgroundColor : theme ? '#f9f9f9' : '#081427' }}
        initial = {{scale : 0.2 , y : -600}}
        animate = {{scale :1 , y : 0}}
        exit = {{scale :0.2 , y : 600}}
        transition = {{ duration : 0.5  ,type : 'tween'}}
      >
          <div align='center'>
            <img draggable='false' id='add-habit-image' src={AddHabitImage} alt="!oopps" />
          </div>

          <div className="add-input-field">
            <label htmlFor="hname"
              style={{ color : theme ? '#154ab1' : '#f9f9f9' }}
            >Habit Name</label>
            <input type="text" placeholder='habit name' id='hname' autoComplete='off' required spellCheck='false' name='habit_name' value={habitData.habit_name} onChange={handleHabitData}
              style = {{
                color : theme? '#0a1931' : '#e6e6e6',
                backgroundColor : theme ? '#e6e6e6' : '#0a1931'
              }}
            />
          </div>

          <div className="add-input-field">
            <label htmlFor="hdesc"
              style={{ color : theme ? '#154ab1' : '#f9f9f9' }}
            >Habit Description</label>
            <textarea placeholder='Describe your habit here' rows={3} name="habit_description" autoComplete='off' id="hdesc" required spellCheck='false' value={habitData.habit_description} onChange={handleHabitData} 
              style = {{
                color : theme? '#0a1931' : '#e6e6e6',
                backgroundColor : theme ? '#e6e6e6' : '#0a1931'
              }}
            ></textarea>
          </div>

          <div className="add-input-field">
            <label
              style={{ color : theme ? '#154ab1' : '#f9f9f9' }}
            >Pick Days per Week</label>
            <div className="add-days-btns">
              {daysStr.map( (ele , i) => <button className="add-days-btn" key={i} 
                onClick = {(e) => {
                  e.preventDefault();
                  toggleDay(i);
                }}
                style = {{
                  color : (days[i]) ? '#f9f9f9' : '#0a1931',
                  backgroundColor: (days[i]) ? '#0a1931' : '#e6e6e6',
                  boxShadow: (days[i]) ? "0px 3px 3px #66d441" : "" ,
                  transform : (days[i]) ? 'scale(1.15)' : 'scale(1)'
                }}
              > {ele} </button> )}
            </div>
          </div>
          
          <div align='center'>
            {/* <button id='add-submit-btn' > <FaCalendarPlus/> &nbsp; Add Habit </button> */}
          <button id= 'add-submit-btn' 
            style = {{ 
              color : theme ? '#f9f9f9' : '#0a1931',
              backgroundColor : theme ? '#0a1931' : '#f9f9f9'
            }}
          >
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
      </motion.form>
      </motion.div>
    </>
  )
}
export default AddHabitPage