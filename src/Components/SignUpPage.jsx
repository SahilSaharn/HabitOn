import React , {useContext, useState ,useEffect} from 'react'
import ErrorContext from '../Contexts/ErrorContext'

import "../Component_styles/SignUpPage_styles.css"

function SignUpPage() {
    const cont = useContext(ErrorContext);
    const [x ,setx] = useState(true);

    useEffect( () => {
        cont.addError("hello this is a error" , false)
    } ,[x])

    return (<>
        
    </>)
}

export default SignUpPage
