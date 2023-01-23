import React, { useEffect, useState } from 'react'
import ErrorContext from './ErrorContext'
function ErrorState(props) {

  const [errors , setErrors] = useState([]);

  const addError = (message , type) => {
    let element = {message , type}
    setErrors([...errors, element]);
  };

  useEffect(() => {
    let timeoutId;
    if (errors.length > 0) {
      timeoutId = setTimeout(() => {
        setErrors((prevArray) => prevArray.slice(1));
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [errors]);

  return (
    <ErrorContext.Provider value={{errors , addError}}>
        {props.children}
    </ErrorContext.Provider>
  )

}

export default ErrorState
