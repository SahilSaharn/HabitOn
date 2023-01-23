import React, {useContext} from 'react'
import ErrorContext from '../Contexts/ErrorContext'
import Marquee from 'react-fast-marquee';
import "../Component_styles/ErrorComponent_styles.css"
import { FaCheck ,FaTimesCircle } from "react-icons/fa";
import { motion ,AnimatePresence } from 'framer-motion';

const errorAnimate = {
  from : {
    opacity : 0,
    y : 65
  },
  to : {
    opacity : 1,
    y : 0,
  }
}

const Error = (props) => {

  return (
    <motion.div className="error-cont sofi" style={{
      backgroundColor : "#071324",
      color : (props.type) ? '#66d441' : '#fb3636',
      bottom : ((props.place+1) * ( (window.innerWidth <= 425) ? 25 : 50) ),
      border : '2px solid',
      borderColor : (props.type) ? '#66d441' : '#fb3636',

    }}
      variants = {errorAnimate} initial = {'from'} animate = {'to'} exit={{ opacity :0 , x :-350 }}
    >
      <div className='error-icon'> { (props.type) ? <FaCheck/> : <FaTimesCircle/> }</div>
      { 
        (props.message.length < 40) ? 
        <div className="error-message">
          {props.message} 
        </div> : 
        <Marquee speed={50} className='error-message' gradient={false} pauseOnHover={true} >
          {props.message} 
        </Marquee>
      }
    </motion.div>
  );
}

function ErrorComponent() {

  const cont = useContext(ErrorContext);

  return (
    <div>
      <AnimatePresence>
      { cont.errors.map( (ele ,i) => <Error key={i} message={ele.message} type={ele.type} place={i} /> ) }
      </AnimatePresence>
    </div>
  )

}

export default ErrorComponent;
