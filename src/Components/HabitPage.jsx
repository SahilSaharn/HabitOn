import React , {useContext} from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import userContext from '../Contexts/UserAndThemeContext';

function HabitPage() {
  const {user} = useContext(userContext)

  const index = Number( window.atob( useParams().index ) )
  //index is user's habit clicked habit in our user habits data
  console.log(index)

  const habit = user.userHabits[index]
  //here habit is the habit on which user want to see and now we fetch its data...
  console.log(habit)
  
  return (
    <div>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
    </div>
  )
}

export default HabitPage
