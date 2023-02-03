import React, { useState, useEffect } from 'react';
import { FaClock } from "react-icons/fa";

function Clock({itsColor}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='curr-time' style={{color : itsColor}} >
      <FaClock/> &nbsp; {time.toLocaleString()}
    </div>
  );
}

export default Clock;
