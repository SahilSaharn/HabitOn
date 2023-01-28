import React from 'react'
import "../Component_styles/HabitsPage_styles.css"
import { FaCalendarPlus ,FaCalendarDay } from "react-icons/fa";
import Clock from './Clock';
function HabitsPage() {
  
  return (
    <>
      <div className="main-habits-cont">
        <h2 className="your-habits-title sofi">
          Your Habit's
        </h2>
        <Clock/>
        {/* here we weill have a cards container and cards inside it ... */}
        <button id="addHabitBtn" > <FaCalendarPlus/> &nbsp; Add Habit </button>
        <button id="todayScheduleBtn" > <FaCalendarDay/> &nbsp; Today Schedule </button>
      </div>
    </>
  )
}

export default HabitsPage
