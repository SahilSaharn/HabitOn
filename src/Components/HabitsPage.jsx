import React ,{ useState ,useContext ,useEffect } from 'react'
import "../Component_styles/HabitsPage_styles.css"
import { FaCalendarPlus ,FaCalendarDay , FaCalendar ,FaAngleDoubleRight ,FaCalendarTimes } from "react-icons/fa";
import Clock from './Clock';
import userContext from '../Contexts/UserAndThemeContext';
import AddHabitPage from './AddHabitPage';
import { useNavigate } from 'react-router-dom';


function Cards() {
  return (
    <>
      <div className="habit-card sofi">
        <h4 className='habit-title' > <FaCalendar/> &nbsp; Habit number 3 </h4>
        <div className="score-cont">
          <h6>
            Score
          </h6>
          <div className="progress-bar-cont">
            <div className="progress-bar">
              
            </div>
          </div>
          <h6>
            50%
          </h6>
        </div>

        <div className="habit-card-btns-cont">
          <a href="/" className="open-habit-card-link"> Open &nbsp; <FaAngleDoubleRight/> </a>
          <button> <FaCalendarTimes/> </button>
        </div>
      </div>
    </>
  );
}

function HabitsPage() {

  const {user} = useContext(userContext);
  const redirect = useNavigate();
  
  const [showAddHabitModal , setShowAddHabitModal ] = useState(false);

  useEffect ( () => {
    console.log(user)
    if(!user.auth){
      redirect('/signin')
    }
  } ,[])

  const toggleModal = () => {
    document.body.style.overflow =  (showAddHabitModal) ? 'auto' : 'hidden'
    setShowAddHabitModal(!showAddHabitModal)
  }

  return (
    <>
      <div className="main-habits-cont" style = {{overflow : (showAddHabitModal) ? 'hidden' : 'auto'}} >
        <h2 className="your-habits-title sofi">
          Your Habit's
        </h2>
        <Clock/>
        
        <div className="habit-grid" >
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
          <Cards/>
        </div>

        {/* here we will have a cards container and cards inside it ... */}

        <div className="add-and-schedule-btns">
          <button id="todayScheduleBtn" > <FaCalendarDay/> &nbsp; <span> Today Schedule </span> </button>
          <button id="addHabitBtn" onClick={ toggleModal } > <FaCalendarPlus/> &nbsp; <span> Add Habit </span> </button>
        </div>
      </div>
      { showAddHabitModal && <AddHabitPage toggleModal= {toggleModal} /> }
    </>
  )
}

export default HabitsPage
