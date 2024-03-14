import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import { useState } from 'react'
import axios from 'axios'



function Signup() {
  const [values, setValues]=useState({
    name: '',
    email:'',
    password:''
  })
  const navigate= useNavigate();
  const [errors, setErrors]=useState({})
  
  const handleInput=(event)=>{
    setValues(prev=>({...prev, [event.target.name]: [event.target.value]}))
  }
  
  const handleSubmit=(event)=>{
    event.preventDefault();
   
    setErrors(Validation(values))

    if(errors.name==="" && errors.email==="" && errors.password===""){
      axios.post('http://localhost:8081/signup', values)
      .then(res=>{
        navigate('/')
      })
      .catch(err=>console.log(err))
    }


  
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundColor:"#d1d1d1"}}>
      <div className='bg-white p-3 rounded w-25'>
        <form action="" onSubmit={handleSubmit}>

        <div className='mb-3'>
            <label htmlFor="Name"><strong>Name</strong></label>
            <input type="text" placeholder='enter Email'  name='name'
            onChange={handleInput} className='form-control rounded-0'/>
            {errors.name && <span className='text-danger' >{errors.name}</span>} 
          </div>

          <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
            <input type="email" placeholder='enter Email'  name='email'
            onChange={handleInput} className='form-control rounded-0'/>
            {errors.email && <span className='text-danger' >{errors.email}</span>} 
          </div>

          <div className="mb-3">
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="password" placeholder='Enter password' name='password'
            onChange={handleInput} className='form-control rounded-0'/>
            {errors.password && <span className='text-danger' >{errors.password}</span>} 
          </div>

          <button className='btn btn-success w-100' type='submit'><strong>Sign in</strong></button>
          <p> You agree to our terms conditions</p>
          <Link to='/' className='btn btn-default border w-100 bg-light rounded-0'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup