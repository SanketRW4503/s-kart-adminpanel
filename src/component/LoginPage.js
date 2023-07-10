import { validate } from 'email-validator';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import store from '../utility/store';
import { setLoginStatus } from '../utility/loginSlice';

export default function LoginPage() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate= useNavigate()
  const loginstatus= useSelector(store=>store.login.status);
  const dispatch= useDispatch()

  // this will check validation
  function validateData(e) {
    e.preventDefault()
    let admindata = { email: email, password: password }

    if (!validate(email)) {
      toast.error('INVALID EMAIL')
    } else if (password.length > 8) {
      toast.error('PASSWORD LENGTH SHOULD BE GREATTER THAN 8')
    } else {
      toast.loading('checking credentials')
      admindata = JSON.stringify(admindata)
      loginAdmin(admindata)
    }

  
    async function loginAdmin(admindata) {
      const res = await fetch(process.env.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: admindata
      })
      const json = await res.json()
      console.log(json)
      if (json.success) {
        toast.dismiss()
        toast.success('welcome admin !')
        dispatch(setLoginStatus(true))

      } else {
        toast.dismiss()
      
        toast.error('INVALID EMAIL OR PASSWORD !')

      }

    }


  }

  useEffect(()=>{
    if(loginstatus==true){
        navigate('/home')
    }

  },[loginstatus])
  return (
    <div>
     
      <form className='flex-col flex justify-between border m-[auto] w-[600px] p-[20px]'>

        <input required type='email' value={email} className='outline-none border-b-2 mb-[20px]' placeholder='email' onChange={(e) => {
          setEmail(e.target.value)
        }} />
        <input required type='password' value={password} className='outline-none border-b-2 mb-[20px]' placeholder='password' onChange={(e) => {
          setPassword(e.target.value)
        }} />
        <button onClick={(e) => validateData(e)} className='bg-theme text-t-theme text-white rounded-xl px-4 py-2'>Login</button>
      </form>
    </div>
  )
}
