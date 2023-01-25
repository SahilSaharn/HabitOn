import React ,{useState} from 'react'
import userContext from './UserAndThemeContext';
function UserAndThemeStates(props) {
    // here we can define our data which needs to be passed to children's
  const [user ,setUser] = useState({
    auth : false,
    name : "",
    email : "",
    gotCode : false,
    verifiedCode : false
  })

  return (
    <userContext.Provider value={{user, setUser}} >
       {props.children}
    </userContext.Provider>
  )
}

export default UserAndThemeStates
