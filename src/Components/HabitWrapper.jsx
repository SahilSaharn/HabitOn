import React ,{useContext , useEffect } from 'react';
import userContext from '../Contexts/UserAndThemeContext';

import NotAuthorizedPage from './NotAuthorizedPage';
import HabitsPage from './HabitsPage';

function HabitWrapper() {
    const {user , setUser } = useContext(userContext);
    useEffect ( ()=> {

        const user_auth =  Boolean( sessionStorage.getItem('auth') )
        const user_email = sessionStorage.getItem('email' )
        const user_name = sessionStorage.getItem('name' )
    
        if(user_auth && user_email && user_name ){
            setUser( prev => ({
                ...prev, 
                auth : user_auth,
                name : user_name,
                email : user_email,
            }))
        }

    } , [] )

    if(user.auth === false){
        return ( <NotAuthorizedPage/> )
    }
    
    return ( <HabitsPage/> )
}

export default HabitWrapper
