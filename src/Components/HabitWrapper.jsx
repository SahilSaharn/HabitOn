import React ,{useContext } from 'react';
import userContext from '../Contexts/UserAndThemeContext';

import NotAuthorizedPage from './NotAuthorizedPage';
import HabitsPage from './HabitsPage';

function HabitWrapper() {
    const {user } = useContext(userContext);
    if(user.auth === false){
        return ( <NotAuthorizedPage/> )
    }
    return ( <HabitsPage/> )
}

export default HabitWrapper
