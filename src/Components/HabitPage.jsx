import React , {useContext, useState ,useEffect} from 'react'
import { useParams , useNavigate } from 'react-router-dom';
import userContext from '../Contexts/UserAndThemeContext';
import ErrorContext from '../Contexts/ErrorContext';
import '../Component_styles/HabitPage_styles.css'
import { FaClock , FaAngry, FaGrinBeamSweat,FaInfoCircle ,FaGrinStars ,FaRedo } from "react-icons/fa";
import { ResponsiveContainer , LineChart , Line ,XAxis ,YAxis ,CartesianGrid, Tooltip } from 'recharts';
import axios from 'axios';
import Loader from './Loader';
import NotAuthorizedPage from './NotAuthorizedPage';
import {motion} from 'framer-motion'

function LoaderPage({theme}){
  return(
    <>
    <div className="habit-page-loader" >
      <Loader color={ theme ? '#0a1931' : '#f9f9f9' } width= {'clamp(3.81rem, 4.1vw + 2.79rem, 7.71rem)'} hieght ={'clamp(3.81rem, 4.1vw + 2.79rem, 7.71rem)'} />
    </div>
    </>
  )
}

function LineGraph({data , theme}){
  console.log('this is data in LineChartComponent ... ');
  console.log(data);
  return (
    <>
    <ResponsiveContainer width='100%' height={'100%'} >
      <LineChart data={data} >
        <XAxis dataKey={'date'} interval = {'preserveStartEnd'}/>
        <YAxis dataKey={'score'}/>
        <CartesianGrid strokeDasharray={'5 1'} />
        <Tooltip contentStyle={{
          color :theme ? '#f9f9f9' : '#0a1931',
          backgroundColor : theme ? '#0a1931' : '#f9f9f9' ,
          border : `1px solid ${theme ? '#f9f9f9' : '#0a1931' } `,
          borderRadius : '15px'
        }}
        itemStyle = {{
          color :theme ? '#f9f9f9' : '#0a1931' 
        }}
        />
        <Line dataKey={'score'} stroke = {theme ? '#0a1931' : '#f9f9f9'} strokeWidth={3} type = {'monotone'} />
      </LineChart>
    </ResponsiveContainer>
    </>
  )
}

function HabitPageComponent (){

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
    <motion.div style = {{ backgroundColor : theme ? '#f9f9f9' : '#0a1931' ,padding:'.1px' }}
      initial = {{opacity : 0}}
      animate = {{opacity : 1}}
      exit = {{x : 1100, opacity : 0}}
    >

      <div className="habit-data-cont sofi">

        <motion.h2 className="habit-data-name" style = {{color : theme ? '#0a1931' : '#f9f9f9'}}
          initial = {{x : -50 , opacity: 0}}
          animate = {{x : 0 , opacity: 1}}
          transition = {{delay : 0.3 , type : 'tween'}}
        >
          {habit.habit_name}
        </motion.h2>

        <motion.h5 className="habit-data-created-date" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} 
          initial = {{x : 50 , opacity: 0}}
          animate = {{x : 0 , opacity: 1}}
          transition = {{delay : 0.7 , type : 'tween'}}
        >
          <FaClock/> &nbsp; {new Date(habit.creation_date).toDateString()}
        </motion.h5>

        <motion.p className="habit-data-desc" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} 
          initial = {{opacity :0 , y : 50 ,scale : 0.9}}
          animate = {{y : 0, opacity :1 ,scale :1}}
          transition = {{duration : 0.5 , delay : 0.9}}
        >
          {habit.description}
        </motion.p>

        <motion.h4 className="habit-data-curr-score" style = {{color : theme ? '#0a1931' : '#f9f9f9'}} 
          initial = {{scale : 0 , opacity : 0}}
          animate = {{scale :1 , opacity :1}}
          transition = {{duration : 0.4 , delay : 1}}
        >
          Curr Score = &nbsp; <span style={{ color : iconsAndColorfrScore.color }} > {habit.score}% &nbsp; {iconsAndColorfrScore.icon} </span> 
        </motion.h4>

        <div className="habit-data-graph-cont" style={{ height : showLoader ? 'clamp(250px , 7vmin , 300px)' : 'auto' }} >
          {showLoader && <LoaderPage theme = {theme} />}
          {
            (graphData.length > 0) ?
            ( <div className = 'graph-cont' > <LineGraph data = {graphData} theme= {theme} /> </div> ) :
            ( 
              <motion.div style={{ height : 'clamp(250px , 7vmin , 300px)', display : 'flex' , alignItems :'center' , justifyContent : 'center' , backgroundColor : '#e6e6e620'}} 
                initial = {{scale : 0 , opacity :0}}
                animate = {{scale : 1 , opacity :1}}
              >
                { !showLoader && <button onClick= { () => setReload( prev => !prev ) } className='reload-btn' style= {{color :theme ? '#0a1931' : '#f9f9f9'}} > <FaRedo/> </button>}
              </motion.div>
            )
          }
        </div>
        <motion.h5 className="habit-data-created-date" style = {{color : '#fb3636'}} 
          initial = {{x : 50 , opacity: 0}}
          animate = {{x : 0 , opacity: 1}}
          transition = {{delay : 0.7 , type : 'tween'}}
        >
          <FaInfoCircle/> &nbsp; Note : This app Uses UTC timeLine so. Score can be a bit diffrent as per Your Timezone :)
        </motion.h5>

      </div>

    </motion.div>
  )
}

//wrapping our component for safer routing...
function HabitPage() {
  const {user , setUser } = useContext(userContext);
  const redirect = useNavigate()
  useEffect ( ()=> {
      if(user.auth === false){

        const user_auth =  Boolean( sessionStorage.getItem('auth') )
        const user_email = sessionStorage.getItem('email' )
        const user_name = sessionStorage.getItem('name' )
      
        if(user_auth && user_email && user_name ){
              redirect(`/habits/${user_name.replace(/\s/g, "_")}`)
        }
        
      }
    } , [] )

    if(user.auth === false){
        return ( <NotAuthorizedPage/> )
    }
    
    return ( <HabitPageComponent/> )
}

export default HabitPage
