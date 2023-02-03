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
    forgotPass : false
  })

  const [theme ,setTheme] = useState(true);
  //true means white and false means dark mode...
  const toggleTheme = ( ) => {
    setTheme( (prev) => !prev )
  } 

  return (
    <userContext.Provider value={{user, setUser , theme , toggleTheme}} >
       {props.children}
    </userContext.Provider>
  )
  
}

export default UserAndThemeStates
