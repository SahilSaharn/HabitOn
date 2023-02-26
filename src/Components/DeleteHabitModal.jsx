import React, {useContext , useState ,useEffect} from 'react'
import "../Component_styles/DeleteHabitModal_styles.css"
import userContext from '../Contexts/UserAndThemeContext';
import ErrorContext from '../Contexts/ErrorContext';
import Loader from './Loader';
import axios from 'axios';
import {FaCalendarTimes , FaTrash , FaTimes } from "react-icons/fa";
import { motion } from 'framer-motion';


function DeleteHabitModal({toggleModal , habit_i , habit_id , habit_name , theme}) {

  const {removeUserHabit , user} = useContext(userContext)
  const {addError} = useContext(ErrorContext);

  const [showLoader ,setShowLoader] = useState(false)
  const [errorData , setErrorData] = useState({});

  useEffect(()=>{ 
    if(errorData.message){
        addError(errorData.message , errorData.type)
    }
  } , [errorData]);

  const removeHabit = async (habit_i , habit_id) => {
    // set a loading page for request
    if(showLoader){
      return
    } else setShowLoader(true)
    
    //we have the id for our delete request and we have habit_i as index to remove it from the UI...
    console.log(habit_i , habit_id)
    try{
      console.log(`deleting ${user.userHabits[habit_i].habit_name}`)
      const req_body = {
        habit_id : habit_id,
        habit_name : user.userHabits[habit_i].habit_name
      }

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': process.env.REACT_APP_API_KEY
      };

      const {data} = await axios.delete('https://pouncing-iodized-lightyear.glitch.me/delete_habit' , {
        data: req_body,
        headers
      })

      console.log(data);
      if(data.type){
        ///this means request was a success...
        setErrorData( {message: data.message , type :data.type} )

        //now remove it from the frontend...
        removeUserHabit(habit_i)

        //then close the modal
        setTimeout( () => toggleModal({}) , 1000 )

      } else {
        setErrorData( {message: data.message , type :data.type} )
        setShowLoader(false)
      }

    } catch(e) {
        console.log(e)
        if("response" in e){
          setErrorData( {message : e.response.data.message ,type : e.response.data.type } )
        } else {
          setErrorData( {message : e.message ,type : false } )
        }
        setShowLoader(false)
    }

  }

  return (
    <motion.div className='delete-habit-modal-cont sofi'
      style={{
        backgroundColor : theme ? 'rgba(249, 249, 249, 0.7)' : 'rgba(10, 25, 49, 0.7)'
      }}
      initial = {{opacity : 0 }}
      animate = {{opacity : 1 }}
      exit= {{opacity : 0 , transition : {delay : 0.5} }}
      transition = {{duration : 0.3}}
    >
      <motion.div className="delete-habit-modal-card"
        style = {{  backgroundColor : theme ? '#f9f9f9' : '#081427' }}
        initial = {{opacity : 0 ,scale :0 , y: -200}}
        animate = {{opacity : 1 ,scale :1 , y:0}}
        exit=     {{opacity : 0 , scale: 0 , y :200}}
        transition = {{delay : 0.6 ,duration : 0.3}}
      > 
        {showLoader && (
          <div className="loader-cont"
            style={{backgroundColor : theme ? 'rgba(249, 249, 249, 0.5)' : 'rgba(10, 25, 49,0.5)' }}
          >
            <Loader color = { theme ? '#0a1931' : '#f9f9f9'} width= {'clamp(2.44rem, 2vw + 1.94rem, 4.34rem)'} hieght = {'clamp(2.44rem, 2vw + 1.94rem, 4.34rem)'} />
          </div>
        ) }
        
        <div className="delete-habit-modal-content"
          style = {{  color : theme ? '#0a1931' : '#f9f9f9' }}
        >
          <FaCalendarTimes className='hidicon' /> &nbsp; <p> are you sure ?  you want to <span style={{color : '#fb3636' , fontWeight : 'bold'}} >Delete</span> habit <span style={{fontWeight : 'bold'}} >"{habit_name}"</span> ! </p>
        </div>
        <div className="delete-modal-btns sofi">
          <button onClick={ () => toggleModal({}) } > <FaTimes/> &nbsp; Close</button>
          <button
            onClick={ () => { removeHabit(habit_i , habit_id) } }
          > <FaTrash/> &nbsp; Delete </button>
        </div>
        
      </motion.div>
    </motion.div>
  )
}

export default DeleteHabitModal
