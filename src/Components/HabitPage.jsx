import React , {useContext} from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import userContext from '../Contexts/UserAndThemeContext';
import '../Component_styles/HabitPage_styles.css'
import { FaClock , FaAngry, FaGrinBeamSweat ,FaGrinStars } from "react-icons/fa";

function HabitPage() {

  const {user ,theme} = useContext(userContext)
  const {index} = useParams()


  const real_index = Number( atob(index) )
  const habit = user.userHabits[real_index]
  console.log(habit , theme)

  let iconsAndColorfrScore = {
    icon  : <FaGrinBeamSweat/>,
    color : '#000000'
  }

  return (
    <div>
      <div className="habit-data-cont sofi">

        <h2 className="habit-data-name">
          {habit.habit_name}
        </h2>

        <h5 className="habit-data-created-date">
          <FaClock/> &nbsp; {new Date(habit.creation_date).toDateString()}
        </h5>

        <p className="habit-data-desc">
          {habit.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur perspiciatis voluptatum officia suscipit molestiae quos maxime adipisci esse, quo cumque unde, ab aliquid quidem? Consectetur nulla omnis quod ducimus? Iure quis laudantium, modi aspernatur veritatis corrupti atque et. Quae pariatur accusantium ex maiores laboriosam a ut ullam natus quos aspernatur.
        </p>

        <h4 className="habit-data-curr-score">
          Curr Score = &nbsp; <span> {habit.score}% &nbsp; {icons_to_show.icon} </span> 
        </h4>
      </div>


    </div>
  )
}

export default HabitPage
