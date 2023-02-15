import React , {useContext} from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import userContext from '../Contexts/UserAndThemeContext';

function HabitPage() {
  const {user} = useContext(userContext)
  const {index} = useParams()

  return (
    <div>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
      <h2>hello i ma habit page {index} </h2>
    </div>
  )
}

export default HabitPage
