import React ,{useState} from 'react'
import userContext from './UserAndThemeContext';
function UserAndThemeStates(props) {
    // here we can define our data which needs to be passed to children's
  const [user ,setUser] = useState({
    auth : false,
    name : "sahil saharn",
    email : "sahilsaharn2003@gmail.com",
    gotCode : false,
    verifiedCode : false,
    forgotPass : false,
    userHabits : [],
    todayHabits : []
  })

  const [theme ,setTheme] = useState(true);
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
    newUserHabits.splice(i , 1)
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
    <userContext.Provider value={{user, setUser , theme , toggleTheme , removeUserHabit , removeTodayHabit}} >
       {props.children}
    </userContext.Provider>
  )
  
}

export default UserAndThemeStates
