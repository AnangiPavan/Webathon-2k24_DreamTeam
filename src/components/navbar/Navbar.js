import React from 'react'
import { Link } from 'react-router-dom'




function Navbar() {
  return (
    <div>
     <ul className='nav justify-content-center bg-light' style={{display:"flex",justifyContent:"space-around"}}>

    <nav className='nav-item'>
      <Link className='nav-link' to='/'>Home</Link>
    </nav>
    <nav className='nav-item'>
      <Link className='nav-link' to='/Login'>Login</Link>
    </nav>
    <nav className='nav-item'>
      <Link className='nav-link' to='/register'>Register</Link>
    </nav>
   
     </ul>

  
        

    </div>
  )
}

export default Navbar