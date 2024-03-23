import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react'

import { loginContext } from './loginContext'
import Upload from '../components/upload/Upload'



function UserLoginStore({children}) {
    // let navigate=useNavigate()
    let [LoggedinUser,setLoggedinUser]=useState({})
    let [loginErr,setloginErr]=useState("")
   
    let [userLoginStatus,setStatus]=useState(false)
    // func to make user login request
    const loginuser=(userCredintial)=>{
      
        axios.post("http://localhost:3500/user-login",userCredintial)
        .then(res=>{
            console.log(res)
            if(res.data.message==='Valid user'){
                setloginErr("")
               
                setStatus(true)
                console.log(res.data.user)
                setLoggedinUser(res.data.user)
               
                // save to local storage
                localStorage.setItem('token',res.data.token)
               
                 
            }
            else{
                setStatus(false)
                console.log("login failed",res.data.message)
                setloginErr(res.data.message)
            }
        })
        .catch(err=>{
            console.log("error in login",err)
        })
    }
  return(
    <loginContext.Provider value={[LoggedinUser,userLoginStatus,loginErr,loginuser]}>
        {children}
    </loginContext.Provider>
  )
}

export default UserLoginStore

