import React ,{useState} from 'react'
import userContext from './UserAndThemeContext';
function UserAndThemeStates(props) {
    // here we can define our data which needs to be passed to children's
  const [user ,setUser] = useState({
    auth : false,
    name : "",
    email : "",
    gotCode : false,
    verifiedCode : false,
    forgotPass : false,
    forgorPassVerifiedCode :false,
    userHabits : [],
    todayHabits : []
  })

  const [theme ,setTheme] = useState(true);
  const [gotData , setGotData] = useState(false);
  //true means white and false means dark mode...
  const toggleTheme = ( ) => {
    setTheme( (prev) => !prev )
  } 

  const removeUserHabit = (i) => {
    if( i >= user.userHabits.length || i < 0){
      return;
    }

    let newUserHabits = user.userHabits
    //splice modifies the orignal array rather than returning the new array...
    const removed_habit = newUserHabits.splice(i , 1)[0]
    console.log(removed_habit)
    const toRemove_i = user.todayHabits.findIndex( (habit) => habit.habit_id === removed_habit.habit_id )
    if( toRemove_i > -1){
      removeTodayHabit(toRemove_i)
    }
    
    setUser( prev => ({
      ...prev,
      userHabits : newUserHabits
    }) )
  }

  const removeTodayHabit = (i) => {
    if( i >= user.todayHabits.length || i < 0){
      return;
    }

    let newTodayHabits = user.todayHabits
    newTodayHabits.splice(i , 1)
    setUser( ( prev  => ({...prev , todayHabits : newTodayHabits}) ) ) 
  }

  return (
    <userContext.Provider value={{user, setUser , theme , toggleTheme , removeUserHabit , removeTodayHabit , gotData ,setGotData }} >
       {props.children}
    </userContext.Provider>
  )
  
}

export default UserAndThemeStates
