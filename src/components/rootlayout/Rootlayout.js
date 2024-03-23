import React from 'react'
import Navigation from './navigationbar/Navigation'
import { Outlet } from 'react-router-dom'
import UserLoginStore from '../contexts/UserLoginStore'


function Rootlayout() {
  return (
    <div>

    {/* navbar */}
    <Navigation/>

    <div className='container'>
     <UserLoginStore>
      {/* outlet */}
      
    <Outlet/>
     </UserLoginStore>
      
    </div>

    </div>
  )
}

export default Rootlayout