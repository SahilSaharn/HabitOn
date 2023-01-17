import React ,{useState} from 'react'
import userContext from './UserAndThemeContext';
function UserAndThemeStates(props) {
    // here we can define our data which needs to be passed to children's
  const [userInfo , setUserInfo] = useState({
    email : null,
    isAuth : false,
    isDark : false,
  });
  return (
    <userContext.Provider value = {{
      userInfo : userInfo,
      isAuth : isAuth,
      isDarkTheme : isDark
    }} 
    >
       {props.children}
    </userContext.Provider>
  )
}

export default UserAndThemeStates
