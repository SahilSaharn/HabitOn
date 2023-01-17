import React, {useContext, useEffect, useState} from 'react'
import ErrorContext from '../Contexts/ErrorContext'
import "../Component_styles/ErrorComponent_styles.css"
import { FaCheck ,FaTimesCircle } from "react-icons/fa";

const error = (props) => {
  
  const styles = {
    
  }

  return (
    <>

    </>
  );
}

function ErrorComponent() {

  const cont = useContext(ErrorContext);
  const [add ,setAdd] = useState(true);

  useEffect(()=>{
    cont.addError("hello world" , true)
  }, [add])

  console.log(cont.errors);

  return (
    <div>
      { cont.errors.map( (ele ,i) => <h1 key={i}>{ele.message}</h1> ) }
      <button onClick={ ()=>setAdd( (prev) => !prev ) }>add message :)</button>
    </div>
  )

}

export default ErrorComponent;
