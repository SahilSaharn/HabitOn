import React ,{ useState ,useContext ,useEffect } from 'react'
import "../Component_styles/HabitsPage_styles.css"
import { FaCalendarPlus ,FaCalendarDay , FaCalendar ,FaAngleDoubleRight ,FaCalendarTimes ,FaSun ,FaMoon } from "react-icons/fa";
import Clock from './Clock';
import userContext from '../Contexts/UserAndThemeContext';
import AddHabitPage from './AddHabitPage';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence , motion } from 'framer-motion';


function Cards({theme}) {

  return (
    <>
      <div className="habit-card sofi"
        style = {{backgroundColor : theme ? '#f9f9f9' : '#f9f9f909'}}
      >
        <h4 className='habit-title'
          style= { {color : theme ? '#0a1931' : '#f9f9f9'} }
        > <FaCalendar/> &nbsp; Habit number 3 </h4>
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
            <div className="progress-bar" style={{backgroundColor : theme ? '#0a1931' : '#f9f9f9'}} >
              
            </div>
          </div>
          <h6 style= { {color : theme ? '#0a1931' : '#f9f9f9'} } >
            50%
          </h6>
        </div>

        <div className="habit-card-btns-cont">
          <a href="/" className="open-habit-card-link"> Open &nbsp; <FaAngleDoubleRight/> </a>
          <button
            style= {{
              color : theme ? '#0a1931' : '#e6e6e6',
              borderColor : theme ? '#0a1931' : '#e6e6e6'
            }} 
          > <FaCalendarTimes/> </button>
        </div>
      </div>
    </>
  );
  
}

function HabitsPage() {

  const {user , theme ,toggleTheme } = useContext(userContext);
  const redirect = useNavigate();
  
  const [showAddHabitModal , setShowAddHabitModal ] = useState(false);

  // useEffect ( () => {
  //   console.log(user)
  //   if(!user.auth){
  //     redirect('/signin')
  //   }
  // } ,[])

  const toggleModal = () => {
    document.body.style.overflow =  (showAddHabitModal) ? 'auto' : 'hidden'
    setShowAddHabitModal(!showAddHabitModal)
  }

  return (
    <>
    <div style={{ backgroundColor : (theme) ? "#f9f9f9" : '#0a1931' , hieght :'100vh' , padding :'.01em'}} >
      <div className="main-habits-cont">
        <h2 className="your-habits-title sofi" style={{color : (theme) ? '#0a1931' : '#f9f9f9'}} >
          Your Habit's
        </h2>
        <Clock itsColor = {(theme) ? "rgba(10, 25, 49, 0.5)" : '#e6e6e6'} />
        
        <div className="habit-grid" >
          <Cards theme={theme} />
          <Cards theme={theme} />
          <Cards theme={theme} />
          <Cards theme={theme} />
          <Cards theme={theme} />
          <Cards theme={theme} />
          <Cards theme={theme} />
          <Cards theme={theme} />
        </div>

        {/* here we will have a cards container and cards inside it ... */}

        <div className="add-and-schedule-btns">
          <button id="todayScheduleBtn" className={ (theme) ? 'today-sched-light' : 'today-sched-dark' } >
             <FaCalendarDay/> &nbsp; <span> Today Schedule </span> 
          </button>
          <button id="addHabitBtn" onClick={ toggleModal } > <FaCalendarPlus/> &nbsp; <span> Add Habit </span> </button>
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
    { showAddHabitModal && <AddHabitPage toggleModal= {toggleModal} theme = {theme}/> }
    </>
  )
}

export default HabitsPage
