import React, { useState, useEffect } from 'react';
import { FaClock } from "react-icons/fa";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='curr-time' >
      <FaClock/> &nbsp; {time.toLocaleString()}
    </div>
  );
}

export default Clock;
