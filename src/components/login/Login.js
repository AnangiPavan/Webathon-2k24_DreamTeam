// import { useState } from 'react'
// import { UseForm, useForm } from 'react-hook-form'
// import { UseFormHandleSubmit } from 'react-hook-form'
// import axios from 'axios'
// import { upload } from '@testing-library/user-event/dist/upload'
// import { Outlet, useNavigate } from 'react-router-dom'

// import { useContext } from 'react'
// import { LoginContext } from '../../contexts/LoginContext'
// import UserLoginStore from '../../contexts/UserLoginStore'


// import React from 'react'

// function Login() {

//   console.log(useContext(LoginContext))
//   let [LoggedinUser,userLoginStatus,loginErr,loginuser]=useContext(LoginContext)
//   let {register,handleSubmit,formState:{errors}}=useForm()
//   const navigate=useNavigate()

 


//     // let createuser=(newuser)=>{
//     //     console.log(newuser)
        
//     //     axios.post("http://localhost:3500/login-users",newuser)
        
//     //     .then(response=>{
//     //         console.log(response)
//     //         if(response.status===201){
//     //             navigate('/upload')
                
//     //         }
//     //     })
//     //     .catch(error=>(console.log(error)))

       
//     //   }

//     let createuser=(LoginuserObj)=>{
//         console.log(LoginuserObj)
//         loginuser(LoginuserObj)
//         console.log(LoggedinUser)
//       }

//   return (
//     <div>
//         <center>
//         <h1 className='text-center'>Enter login details</h1>
//         <div className='row'>
//       <div className='col-11 col-sm-8 col-md-6 mx-auto'>
//         <form onSubmit={handleSubmit(createuser)}>
//         {/* <h3 className='text-center text-danger'>{loginErr}</h3> */}
//         {/* name */}
//      <div className='mb-3'>
//      <label htmlFor='name'>Name</label>
//         <input type='text' id='name' className='form-control' {...register("name",{required:true})}/>

//       {errors.name?.type=="required"&&<p className='text-danger'>*name is required</p>}
//      </div>
//      {/* password */}

//      <div className='mb-3'>
//      <label htmlFor='password'>Password</label>
//         <input type='password' id='password' className='form-control' {...register("password",{required:true})}>

//       </input>
//       {errors.password?.type=="required"&&<p className='text-danger'>*password is required</p>}
//      </div>
//      <button className='btn btn-primary text-center'>Login</button>
    
//         </form>

//    </div>
//    </div>
//    </center>
   
//     </div>
//   )
// }

// export default Login



// // import React, { useContext } from 'react'
// // import './Login.css'
// // import { useState } from 'react';
// // import { useForm} from 'react-hook-form'
// // import { navigate,useNavigate } from 'react-router-dom';
// // // import Userprofile from '../userprofile/Userprofile';
// // import { loginContext } from '../../contexts/logincontext';
// // import UserLoginStore from '../../contexts/UserLoginStore';
// // // import Userprofile from '../userprofile/Userprofile';
// // // import Products from '../products/Products';
// // // import Cart from '../cart/Cart';

// // function Login() {

// //   let [LoggedinUser,userLoginStatus,loginErr,loginuser]=useContext(loginContext)
// // //   console.log(loginuser)
// //   let {register,handleSubmit,formState:{errors}}=useForm()
// //   const navigate=useNavigate()

// //   let handler=(LoginuserObj)=>{
// //     console.log(LoginuserObj)
// //     // console.log(loginuser)
// //     loginuser(LoginuserObj)

// //     console.log(LoggedinUser)
// //   }

// //   return(
// //     <div>
// //       {/* <form>
// //         <div className='form-group'> 
     
// //           <input type='text' name='username'   ></input>
// //           <label name="username"  className='form-label' >Username</label>
// //         </div>
// //         <div className='form-group'>
         
// //           <input type='password' name='username'  ></input>
// //           <label name="username"  className='form-label' >Password</label>
// //         </div>
// //       </form> */}
// //        <div className='row'>
// //       <div className='col-11 col-sm-8 col-md-6 mx-auto'>
// //         <form onSubmit={handleSubmit(handler)}>
// //         {/* name */}
// //      <div className='mb-3'>
// //       <h3 className='text-center text-danger'>{loginErr}</h3>
// //      <label htmlFor='name'>Name</label>
// //         <input type='text' id='name' className='form-control' {...register("name",{required:true})}>

// //       </input>
// //       {errors.name?.type=="required"&&<p className='text-danger'>*name is required</p>}
// //      </div>
// //  {/* password */}
// //  <div className='mb-3'>
// //      <label htmlFor='password'>Password</label>
// //         <input type='password' id='password' className='form-control' {...register("password",{required:true})}>

// //       </input>
// //       {errors.password?.type=="required"&&<p className='text-danger'>*password is required</p>}
// //      </div>
    


   
// //      <button type='submit' className='btn btn-warning text-center'>Login</button>
// //         </form>

// //     </div>
// //     </div>
// //     </div>
// //   )
// // }

// // export default Login



import React, { useContext } from 'react'
import axios from 'axios';
import './Login.css'
import { useState } from 'react';
import { useForm} from 'react-hook-form'
import { navigate,useNavigate } from 'react-router-dom';
import Upload from '../upload/Upload';
import { loginContext } from '../../contexts/loginContext';


function Login() {

  // let [LoggedinUser,userLoginStatus,loginErr,loginuser]=useContext(loginContext)
  // console.log(useContext(loginContext))
  let {register,handleSubmit,formState:{errors}}=useForm()
  let navigate=useNavigate()



  let [err,setErr]=useState("")

  let handler=(LoginuserObj)=>{
  //   console.log(LoginuserObj)
  //   console.log(LoggedinUser)
  //   console.log(userLoginStatus)
  //  loginuser(LoginuserObj)
   
  //   if(userLoginStatus===true){
  //     navigate('/upload')
  //   }
    
    // console.log(userLoginStatus)

    axios.post("http://localhost:3500/user-login",LoginuserObj)
    .then(res=>{
        console.log(res)
        if(res.data.message==='Valid user'){
            setErr("")
           
            
            console.log(res.data.user)
            
           
            // save to local storage
            localStorage.setItem('token',res.data.token)
            navigate('/upload')
           
             
        }
        else{
            // setStatus(false)
            console.log("login failed",res.data.message)
            setErr(res.data.message)
        }
    })
    .catch(err=>{
        console.log("error in login",err)
    })
  }

  return(
    <div>
      {/* <form>
        <div className='form-group'> 
     
          <input type='text' name='username'   ></input>
          <label name="username"  className='form-label' >Username</label>
        </div>
        <div className='form-group'>
         
          <input type='password' name='username'  ></input>
          <label name="username"  className='form-label' >Password</label>
        </div>
      </form> */}
       <div className='row'>
      <div className='col-11 col-sm-8 col-md-6 mx-auto'>
        <form onSubmit={handleSubmit(handler)}>
        {/* name */}
     <div className='mb-3'>
      <h3 className='text-center text-danger'>{err}</h3>
     <label htmlFor='name'>Name</label>
        <input type='text' id='name' className='form-control' {...register("name",{required:true})}>

      </input>
      {errors.name?.type=="required"&&<p className='text-danger'>*name is required</p>}
     </div>
 {/* password */}
 <div className='mb-3'>
     <label htmlFor='password'>Password</label>
        <input type='password' id='password' className='form-control' {...register("password",{required:true})}>

      </input>
      {errors.password?.type=="required"&&<p className='text-danger'>*password is required</p>}
     </div>
    


   
     <button type='submit' className='btn btn-warning text-center'>Login</button>
        </form>

    </div>
    </div>
    </div>
  )
}

export default Login