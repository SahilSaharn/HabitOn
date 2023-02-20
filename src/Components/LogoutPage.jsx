import React from 'react'
import '../Component_styles/LogOut_styles.css'
import { FaPowerOff } from 'react-icons/fa';

function LogoutPage() {
  return (
    <div className='logout-cont sofi'>
      <button className='button-5' > <FaPowerOff/> &nbsp; Logout ? </button>
    </div>
  )
}

export default LogoutPage
