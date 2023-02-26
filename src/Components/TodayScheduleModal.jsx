import React , {useEffect ,useState ,useContext} from 'react'
import '../Component_styles/TodayScheduleModal_styles.css'
import toDoImage from '../usedImages/todaySchedulePageImage.svg'
import Clock from './Clock';
import userContext from '../Contexts/UserAndThemeContext';
import ErrorContext from '../Contexts/ErrorContext';
import axios from 'axios';
import { FaTimesCircle ,FaCalendar, FaCheck } from 'react-icons/fa';
import { AnimatePresence , motion } from 'framer-motion';
import Loader from './Loader';

function ListComponent({theme , hname , index , habit_id , removeHabit , registerRecord}){
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  let str_size_to_show = 15;
  if( windowWidth < 450 )
    str_size_to_show = 15;
  else if( windowWidth < 650 )
    str_size_to_show = 25;
  else if( windowWidth < 950 )
    str_size_to_show = 35;
  else if( windowWidth > 950 )
    str_size_to_show = 40;

  return(
    <>
      <motion.div className='to-do-list-eles-cont'
        style ={ {backgroundColor : theme ? 'rgba(10, 25, 49, 0.05)' : 'rgba(249, 249, 249, 0.05)'}}
        initial = {{y: -50 , opacity : 0}}
        animate = {{y :0 , opacity :1}}
        transition = {{delay : (index+1)*0.2 }}
        layoutId = {((index+1)*98)}
        exit = {{ opacity : 0 , transition : {duration : 0.3} }}
      >
        <h4 className="to-do-hname"
        style ={ { color : theme ? '#0a1931' : '#f9f9f9'}}
        > <FaCalendar/> &nbsp; { `${hname.substring(0 ,str_size_to_show)}...` } </h4>
        <div className="to-do-list-btn-cont">
          <button onClick = { () => registerRecord(habit_id , index) } > <FaCheck/> </button>
          <button onClick= { () => removeHabit(index) } > <FaTimesCircle/> </button>
        </div>

      </motion.div>
    </>
  )
}

function TodayScheduleModal( {toggleModal , theme} ) {
  const {removeTodayHabit , user ,setUser} = useContext(userContext);
  const {addError} = useContext(ErrorContext);

  const [showLoader , setShowLoader] = useState(false);
  const [errorData , setErrorData] = useState({});

  useEffect(()=>{
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);


  //this will have the post request function... and a page loader... and error data state...
  const removeHabitRecord = (i) => {
    removeTodayHabit(i)
  }

  const registerRecord = async (habit_id , index) => {
    //our post request here for registering record here...
    console.log(habit_id , index)
    if(showLoader){
      return 
    } else setShowLoader(true)

    //our post request here...
    try{

      const req_body = {
        habit_id : habit_id,
        creation_date : user.userHabits[index].creation_date,
        daysOn : user.userHabits[index].daysOn
      }
      
      console.log('this is req_body')
      console.log(req_body)

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY
      };

      const {data} = await axios.post('https://pouncing-iodized-lightyear.glitch.me/add_record' , req_body ,{headers})
      //now update the score with got by 
      console.log(data)
      setErrorData( {message : data.message ,type : data.type } )

      let newHabits = user.userHabits;
      newHabits[index] = {
        ...newHabits[index],
        score : data.score
      }

      setUser( prev => ({
        ...prev,
        userHabits : newHabits,
      }) )

      removeTodayHabit(index)
      
    } catch(e) {
      console.log(e)
      if("response" in e){
        // console.log(e.response.data)
        setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
      } else {
        setErrorData( {message : e.message ,type : false } )
      }
    }
    setShowLoader(false)
  }

  return (
    <>
    <div className="today-modal-holder sofi"
      style={{
        backgroundColor : theme ? 'rgba(249, 249, 249, 0.7)' : 'rgba(10, 25, 49, 0.7)'
      }}
    >
      <motion.div className='today-sched-card'
        style = {{  backgroundColor : theme ? '#f9f9f9' : '#081427' }}
        initial = {{x : -1000 , opacity  :0}}
        animate = {{x :0 , opacity :1}}
        exit= {{x : 1000, opacity : 0}}
      >
        { showLoader && (
          <div className='today-loader-cont' 
            // style = {{backgroundColor : theme ? 'rgba(249, 249, 249, 0.7)' : 'rgba(10, 25, 49, 0.7)'}}
          >
            <Loader color = {theme ? '#0a1931' : '#f9f9f9'} width={'4rem'} hieght={'clamp(2rem, 1.37vw + 1.61rem, 4rem)'} />
          </div>
        ) }
        <div align='center'>
          <img draggable='false' id='to-do-image' src={toDoImage} alt="!oopps" />
        </div>

        { (user.todayHabits.length <= 0) ? (
          <h2 align='center' className='no-sched-habits-title'
          style = {{color : theme ? "rgba(10, 25, 49, 0.5)" : 'rgba(230, 230, 230, 0.5)' }}
          >No Habits For Today!</h2>
        ) : (
          <div>
            <AnimatePresence>
              {
                user.todayHabits.map( (ele , i) => (
                  <ListComponent
                    key = {ele.habit_id}
                    theme = {theme}
                    hname = {ele.habit_name} 
                    habit_id = {ele.habit_id}
                    index = {i}
                    removeHabit = {removeHabitRecord} 
                    registerRecord = {registerRecord}
                  />
                ))
              }
            </AnimatePresence>
          </div>
        ) }

        <Clock itsColor = {(theme) ? "rgba(10, 25, 49, 0.5)" : '#e6e6e6'} />
        <button id='close-today-modal-btn' onClick={toggleModal} ><FaTimesCircle/></button>
      </motion.div>
    </div>
    </>
  )
}

export default TodayScheduleModal
