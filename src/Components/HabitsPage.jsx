import React ,{ useState ,useContext ,useEffect } from 'react'
import "../Component_styles/HabitsPage_styles.css"
import { FaCalendarPlus ,FaCalendarDay , FaCalendar ,FaAngleDoubleRight ,FaCalendarTimes ,FaSun ,FaMoon } from "react-icons/fa";
import Clock from './Clock';
import userContext from '../Contexts/UserAndThemeContext';
import ErrorContext from '../Contexts/ErrorContext';
import AddHabitPage from './AddHabitPage';
import TodayScheduleModal from './TodayScheduleModal';
import DeleteHabitModal from './DeleteHabitModal'
import Loader from './Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence , motion } from 'framer-motion';


function Cards({ theme, index , hname , score , hid , removeHabit }) {

  let barColor = '#f9f9f9'
  if( score < 40){
    barColor = '#fb3636'
  } else if(  score > 70 ){
    barColor = '#66d441'
  } else {
    barColor = '#e8ec17'
  }
  
  return (
      <motion.div className="habit-card sofi"
        style   = {{backgroundColor : theme ? '#f9f9f9' : '#f9f9f909'}}
        initial = {{opacity : 0 , scale : 0}}
        animate = {{opacity : 1 , scale : 1}}
        transition = {{delay : (index+1)* 0.2 }}
        layoutId = {hid}
        exit    = {{opacity : 0 , scale : 0 ,transition : {duration : 0.5}}}
      >
        <h4 className='habit-title'
          style= { {color : theme ? '#0a1931' : '#f9f9f9'} }
        > <FaCalendar/> &nbsp; { hname.length > 25 ? `${hname.substring(0,25)}...` : hname} </h4>
        <div className="score-cont">
          <h6 style= { {color : theme ? '#0a1931' : '#f9f9f9'} } >
            Score
          </h6>
          <div className="progress-bar-cont" 
          style= { {
            backgroundColor : theme ? '#e0e0e0' : '#0a1931',
            borderColor : theme ? '#0a1931' : '#f9f9f9'
          } } 
          >
            <div className="progress-bar" style={{backgroundColor : barColor , width : `${score}%`}} >
              
            </div>
          </div>
          <h6 style= { {color : theme ? '#0a1931' : '#f9f9f9'} } >
            {score}%
          </h6>
        </div>

        <div className="habit-card-btns-cont">
          <a href="/" className="open-habit-card-link"> Open &nbsp; <FaAngleDoubleRight/> </a>
          <button
            style= {{
              color : theme ? '#0a1931' : '#e6e6e6',
              borderColor : theme ? '#0a1931' : '#e6e6e6'
            }}
            onClick = { ()=>{
              removeHabit( {i : index , habit_name : hname , habit_id : hid} )
            } }
          > <FaCalendarTimes/> </button>
        </div>
      </motion.div>
  );
  
}

function LoaderPage(){
  return(
    <>
    <div className="big-loader-container">
      <Loader color={'#0a1931'} width= {'clamp(3.81rem, 4.1vw + 2.79rem, 7.71rem)'} hieght ={'clamp(3.81rem, 4.1vw + 2.79rem, 7.71rem)'} />
    </div>
    </>
  )
}

function HabitsPage() {

  const {user ,setUser, theme ,toggleTheme , gotData ,setGotData} = useContext(userContext);
  const {addError} = useContext(ErrorContext);
  const redirect = useNavigate();

  const [showAddHabitModal , setShowAddHabitModal ] = useState( false );
  const [showTodayScheduleModal , setShowTodayScheduleModal] = useState( false );
  const [showBigLoader , setShowBigLoader ] = useState(true);
  const [removingHabitData , setRemovingHabitData] = useState({})
  const [errorData , setErrorData] = useState({});

  
  useEffect(()=>{
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);

  useEffect(()=>{

    const fetchUserData = async () => {

      try{
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_API_KEY
        };

        const {data} = await axios.get( `http://localhost:5050/get_user_habits/${user.email}` , {headers})
        console.log(data)
        setErrorData( {message : data.message ,type : data.type } )
        
        //setting context here...
        //getTodayday

        const days_map = {
          0: 'Sunday',
          1: 'Monday',
          2: 'Tuesday',
          3: 'Wednesday',
          4: 'Thursday',
          5: 'Friday',
          6: 'Saturday'
        }
      
        const currDay = days_map[new Date().getDay()]
        //currDay will have a string of currday...
        const todayHabits = data.habitData.filter( (ele) => ele.daysOn.indexOf(currDay) > -1 )
        setGotData(true)
        setUser( (prev) => ({
          ...prev,
          userHabits : data.habitData,
          todayHabits : todayHabits
        }) )

      } catch(e){
        console.log(e)
        if("response" in e){
          // console.log(e.response.data)
          setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
        } else {
          setErrorData( {message : e.message ,type : false } )
        }
      }
      
    }
    setShowBigLoader(false)
    if(gotData === false){
      fetchUserData()
    }

  } , [gotData] )


  const toggleAddHabitModal = () => {
    document.body.style.overflow =  (showAddHabitModal) ? 'auto' : 'hidden'
    setShowAddHabitModal(!showAddHabitModal)
  }

  const toggleTodayScheduleModal = () => {
    document.body.style.overflow =  (showTodayScheduleModal) ? 'auto' : 'hidden'
    setShowTodayScheduleModal(!showTodayScheduleModal)
  }
  
  console.log(user)
  return (
    <>

    { (showBigLoader) ? <LoaderPage/> : (

    <div style={{ backgroundColor : (theme) ? "#f9f9f9" : '#0a1931' , hieght :'100vh' , padding :'.01em'}} className='hfull' >
      <div className="main-habits-cont">
        <h2 className="your-habits-title sofi" style={{color : (theme) ? '#0a1931' : '#f9f9f9'}} >
          Your Habit's
        </h2>
        <Clock itsColor = {(theme) ? "rgba(10, 25, 49, 0.5)" : '#e6e6e6'} />
        
        <AnimatePresence mode ='wait'>
        { 
          ( user.userHabits.length < 1) ? (
            <motion.h2 className='no-data-title' 
              key = 'no-data-key'
              style = {{color : theme ? "rgba(10, 25, 49, 0.5)" : 'rgba(230, 230, 230, 0.5)' }}
              initial ={{opacity : 0 , scale :0}}
              animate = {{opacity : 1 , scale :1}}
              exit = {{opacity : 0 , scale :0}}
            >
              No Habits !
            </motion.h2>
            ) : (
            <div className="habit-grid" key='habit-grid-key' >
              <AnimatePresence>
                { user.userHabits.map( (ele , i) => 
                    <Cards 
                      key=   {ele.habit_id} 
                      theme= {theme} 
                      hname= {ele.habit_name} 
                      score ={ele.score} 
                      index= {i} 
                      hid=   {ele.habit_id}
                      removeHabit = {setRemovingHabitData}
                    />
                  )  
                }
              </AnimatePresence>        
            </div>
          ) 
        }
        </AnimatePresence>

        {/* here we will have a cards container and cards inside it ... */}

        <div className="add-and-schedule-btns">
          <button id="todayScheduleBtn" className={ (theme) ? 'today-sched-light' : 'today-sched-dark' } 
            onClick = {toggleTodayScheduleModal}
          >
             <FaCalendarDay/> &nbsp; <span> Today Schedule </span> 
          </button>
          <button id="addHabitBtn" onClick={ toggleAddHabitModal } > <FaCalendarPlus/> &nbsp; <span> Add Habit </span> </button>
        </div>
      </div>

      <motion.button id='toggle-theme-btn' onClick={toggleTheme} 
        style = {{
          color : theme ? '#f9f9f9' : '#0a1931',
          backgroundColor : theme ? '#0a1931' : '#f9f9f9',
          borderColor : theme ? '#f9f9f9' : '#0a1931',
        }}

        initial = {{ opacity: 0 , x : 100 }}
        animate = {{ opacity: 1  , x : 0}}
        transition = {{ duration : 1  ,delay : 1}}
      >
        <AnimatePresence mode='wait' >
        { theme ?
        (<motion.span key="moon-icon" className='inline-block'
          initial = {{scale : 0 , rotate : '360deg'}}
          animate = {{scale : 1 ,rotate : '0deg'}}
          exit = {{x : 50 , rotate : '360deg'}}
          transition = {{duration : 0.3}}
        ><FaMoon/></motion.span> ) :
        (<motion.span key="sun-icon" className='inline-block'
          initial = {{scale : 0 , rotate : '360deg'}}
          animate = {{scale : 1 ,rotate : '0deg'}}
          exit = {{x : 50 , rotate : '360deg'}}
          transition = {{duration : 0.3}}
        ><FaSun/></motion.span> )
        }
        </AnimatePresence>

      </motion.button>

      

    </div>

    ) }


    <AnimatePresence>
      { showAddHabitModal && <AddHabitPage toggleModal= {toggleAddHabitModal} theme = {theme}  key='addHabitModal' /> }
    </AnimatePresence>
    <AnimatePresence>
      {showTodayScheduleModal && <TodayScheduleModal toggleModal = {toggleTodayScheduleModal} theme = {theme}/> }
    </AnimatePresence>
    <AnimatePresence>
    { "i" in removingHabitData && <DeleteHabitModal habit_name={removingHabitData.habit_name} habit_i ={removingHabitData.i} habit_id = {removingHabitData.habit_id} toggleModal={setRemovingHabitData} theme = {theme} />}
    </AnimatePresence>
    
    </>
  )
}

export default HabitsPage
