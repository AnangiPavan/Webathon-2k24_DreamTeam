import React, { useState } from 'react'
import { UseForm, useForm } from 'react-hook-form'

import axios from 'axios'
import {  useNavigate } from 'react-router-dom'


function Register() {

  let {register,handleSubmit,formState:{errors}}=useForm()

  let navigate=useNavigate()

  let [error,setError]=useState("")
 
  let [Err,setErr]=useState("")
 
  
  
  let createuser=(newuser)=>{


    // let fd=new FormData()
    // // append new user object
    // fd.append("user",JSON.stringify(newuser))
    // // append file
    // fd.append("photo",SelectedFile)
    
    // console.log(fd)

    console.log(newuser)
    axios.post("http://localhost:3500/user-signup",newuser)
    .then(response=>{
      console.log(response)
      if(response.status===201){
        setErr("")
        navigate('/Login')
      }
      else{
        setErr("User already exist")
      }
    })
    .catch(error=>(console.log(error)))
  }

  return (
    <div className='users'>
      <p className="text-center text-danger"><h2>Register users</h2></p>

    <h2 className='text-center text-warning'>{error}</h2>

      <div className='row'>
      <div className='col-11 col-sm-8 col-md-6 mx-auto'>
      <form onSubmit={handleSubmit(createuser)}>
        {/* name */}
     <div className='mb-3'>
     <label htmlFor='name'>Name</label>
        <input type='text' id='name' className='form-control' {...register("name",{required:true})}>

      </input>
      {errors.name?.type==="required"&&<p className='text-danger'>*name is required</p>}
     </div>
     {/* password */}

     <div className='mb-3'>
     <label htmlFor='password'>Password</label>
        <input type='password' id='password' className='form-control' {...register("password",{required:true})}>

      </input>
      {errors.password?.type==="required"&&<p className='text-danger'>*password is required</p>}
     </div>

{/* dob */}
     {/* <div className='mb-3'>
     <label htmlFor='name'>Dob</label>
        <input type='date' id='dateofbirth' className='form-control' {...register("dateofbirth",{required:true})}>

      </input>
      {errors.name?.type=="required"&&<p className='text-danger'>*dob is required</p>}

     </div> */}
     {/* email */}
     <div className='mb-3'>
     <label htmlFor='Email'>Email</label>
        <input type='text' id='Email' className='form-control' {...register("Email",{required:true})}>

      </input>
      {errors.name?.type==="required"&&<p className='text-danger'>*Email is required</p>}
     </div>

     {/* url */}
     {/* <div className='mb-3'>
     <label htmlFor='name'>Image</label>
        <input type='text' id='image' className='form-control' {...register("image",{required:true})}>

      </input>
      {errors.name?.type=="required"&&<p className='text-danger'>*image is required</p>}
     </div> */}

     <button type='submit' className='btn btn-success text-center'>Register</button> 
      <span className='text-warning'>  or   </span><button className='btn btn-primary text-center' onClick={()=>navigate('/Login')}>Login</button>
    
        </form>

 
        
      </div>
      </div>

    </div>
  )
}

export default Register