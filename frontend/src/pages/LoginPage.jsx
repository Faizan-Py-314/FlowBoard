import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { RiLoginBoxLine, RiMailFill, RiDoorLockBoxFill, RiEyeLine, RiEyeCloseLine } from "@remixicon/react";


const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({username:'', password:''})

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(formData.username, formData.password)
    login(formData.username, formData.password)
    navigate('/')
  }

  return (
    <>
      <div className='flex items-center justify-center h-svh'>
        <div className='flex flex-col items-center w-80 border rounded-lg p-4 gap-3 sm:w-100 md:w-120 md:p-8'>
          <span className='bg-gray-200 p-4 rounded-md md:my-2'><RiLoginBoxLine /></span>
          <form onSubmit={handleSubmit} className='flex flex-col items-center text-center w-full'>
            <h2 className='font-bold text-2xl md:text-4xl'>Sign in with email</h2>
            <p className='text-sm text-gray-400 w-65 md:text-base md:mt-2'>Enter you email and password to use our all services</p>
            <div className='mt-3 w-full flex flex-col gap-2 md:gap-3 md:mt-5'>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md p-2 w-full'>
                <RiMailFill color='gray' size={20} />
                <input onChange={handleChange} name='username' value={formData.username} className='w-full text-sm focus:outline-none md:text-base' type="email" placeholder='useremail@example.com' />
              </div>
              <div className='flex items-center gap-2 border border-gray-300 rounded-md p-2 w-full'>
                <RiDoorLockBoxFill color='gray' size={20} />
                <input onChange={handleChange} name='password' value={formData.password} className='w-full text-sm focus:outline-none md:text-base' type={passwordVisible?'text':"password"} placeholder='**************' />
                <span onClick={() => setPasswordVisible(!passwordVisible)} className={`${formData.password == ''? 'hidden':'block'} cursor-pointer`} > {passwordVisible? <RiEyeLine size={20} color='gray' />:<RiEyeCloseLine size={20} color='gray' />}</span>
              </div>
            </div>
            <a className='text-xs w-full text-start mt-2 ml-4 cursor-pointer hover:underline md:text-sm md:mt-3' >Forgot Password</a>
            <button className='bg-black text-white p-2 text-center w-full rounded-md text-sm mt-2 cursor-pointer md:text-base md:mt-3'>Sign in</button>
            <span className='text-xs mt-4 mb-2 md:text-sm md:mt-5'>Don't have an account <Link className='underline' to="/register">Sgin up</Link></span>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage