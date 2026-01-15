import React, { useEffect, useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNavigate } from "react-router-dom"
import { loginApi } from './auth.api'
import { jwtDecode } from 'jwt-decode'

function LoginForm() {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const loginUser = async ()=>{
    const res =  await loginApi({
        email :email,
        password : password
    })
    console.log('login data',res)
    localStorage.setItem('token',res.data.data.token)
    localStorage.setItem('refreshToken',res.data.data.refreshToken)
    navigate('products')
  }

  return (
    <div>
      <h3>Login Form</h3>
      <div>
        <input type='text' onChange={(e)=>setEmail(e.target.value)} />
        <input type='password' onChange={(e)=>setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={()=>loginUser()}>Login</button>
      </div>
    </div>
  )
}

export default LoginForm