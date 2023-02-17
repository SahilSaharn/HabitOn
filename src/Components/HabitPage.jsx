import React , {useContext, useState ,useEffect} from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import userContext from '../Contexts/UserAndThemeContext';
import ErrorContext from '../Contexts/ErrorContext';
import '../Component_styles/HabitPage_styles.css'
import { FaClock , FaAngry, FaGrinBeamSweat ,FaGrinStars ,FaRedo } from "react-icons/fa";
import axios from 'axios';
import Loader from './Loader';

function LoaderPage({theme}){
  return(
    <>
    <div className="habit-page-loader" >
      <Loader color={ theme ? '#0a1931' : '#f9f9f9' } width= {'clamp(3.81rem, 4.1vw + 2.79rem, 7.71rem)'} hieght ={'clamp(3.81rem, 4.1vw + 2.79rem, 7.71rem)'} />
    </div>
    </>
  )
}

function LineChart({data , theme}){
  console.log('this is data in LineChartComponent ... ');
  console.log(data);
  return (
    <>
    i am line chart...
    </>
  )
}

function HabitPage() {

  const {user ,theme} = useContext(userContext)
  const {addError} = useContext(ErrorContext);
  const {index} = useParams()
  
  const [graphData , setGraphData] = useState([])
  const [showLoader , setShowLoader] = useState(true)
  const [errorData , setErrorData] = useState({});
  const [reload , setReload] = useState(false)

  const real_index = Number( atob(index) )
  const habit = user.userHabits[real_index]
  // console.log('this is the habit graph');
  // console.log(habit);

  useEffect(()=>{
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);

  useEffect( () => {

    const getGraphData = async() => {
      setShowLoader(true)
      try{

        const headers = {
          'Content-Type': 'application/json',
          'Authorization': process.env.REACT_APP_API_KEY
        }

        const req_body ={
          habit_id : habit.habit_id,
          creation_date : habit.creation_date,
          daysOn : habit.daysOn
        }

        console.log(req_body);

        const {data} = await axios.get('http://localhost:5050/get_graph_data' , {
          params : {
            habit_id : habit.habit_id,
            creation_date : habit.creation_date,
            daysOn : habit.daysOn.join(',')
          } , 
          headers
        })

        console.log(data);
        if(data.type){
          setErrorData( {message : data.message ,type : data.type } )
          setGraphData( data.graph_data )
        } else {
          setErrorData( {message : data.message ,type : data.type } )
        }

      } catch (e) {
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
    getGraphData()
  }  , [reload])

  let iconsAndColorfrScore = {
    icon  : <FaAngry/>,
    color : '#fb3636'
  }

  if( habit.score < 40){
    iconsAndColorfrScore = {
      icon : <FaAngry/>,
      color : '#fb3636'
    }
  } else if(  habit.score > 70 ){
    iconsAndColorfrScore = {
      icon : <FaGrinStars/>,
      color : '#66d441'
    }
  } else {
    iconsAndColorfrScore = {
      icon : <FaGrinBeamSweat/>,
      color : '#e8ec17'
    }
  }
  
  return (
    <div style = {{ backgroundColor : theme ? '#f9f9f9' : '#0a1931' ,padding:'.1px' }}>

      <div className="habit-data-cont sofi">

        <h2 className="habit-data-name" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} >
          {habit.habit_name}
        </h2>

        <h5 className="habit-data-created-date" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} >
          <FaClock/> &nbsp; {new Date(habit.creation_date).toDateString()}
        </h5>

        <p className="habit-data-desc" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} >
          {habit.description} Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur perspiciatis voluptatum officia suscipit molestiae quos maxime adipisci esse, quo cumque unde, ab aliquid quidem? Consectetur nulla omnis quod ducimus? Iure quis laudantium, modi aspernatur veritatis corrupti atque et. Quae pariatur accusantium ex maiores laboriosam a ut ullam natus quos aspernatur.
        </p>

        <h4 className="habit-data-curr-score" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} >
          Curr Score = &nbsp; <span style={{ color : iconsAndColorfrScore.color }} > {habit.score}% &nbsp; {iconsAndColorfrScore.icon} </span> 
        </h4>

        <div className="habit-data-graph-cont" style={{ height : showLoader ? 'clamp(250px , 7vmin , 300px)' : 'auto' }} >
          {showLoader && <LoaderPage theme = {theme} />}
          {
            (graphData.length > 0) ?
            ( <LineChart data = {graphData} theme= {theme} /> ) :
            ( 
              <div style={{ height : 'clamp(250px , 7vmin , 300px)', display : 'flex' , alignItems :'center' , justifyContent : 'center' , backgroundColor : '#e6e6e620'}} >
                { !showLoader && <button onClick= { () => setReload( prev => !prev ) } className='reload-btn' style= {{color :theme ? '#0a1931' : '#f9f9f9'}} > <FaRedo/> </button>}
              </div>
            )
          }
        </div>

      </div>

    </div>
  )
}

export default HabitPage
