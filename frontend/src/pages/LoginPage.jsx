import React, { useContext, useState } from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { RiLoginBoxLine, RiMailFill, RiDoorLockBoxFill, RiEyeLine, RiEyeCloseLine } from "@remixicon/react"


const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({username:'', password:''})
  const { isDark } = useTheme()

  const { login } = useContext(AuthContext)

  // Theme classes
  const pageBg = isDark ? 'bg-[#1b1b1d]' : 'bg-white'
  const cardBg = isDark ? 'bg-zinc-800' : 'bg-white'
  const borderColor = isDark ? 'border-zinc-600' : 'border-gray-300'
  const textPrimary = isDark ? 'text-zinc-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-600'
  const textMuted = isDark ? 'text-zinc-500' : 'text-gray-400'
  const inputBg = isDark ? 'bg-zinc-700' : 'bg-white'
  const inputText = isDark ? 'text-zinc-100' : 'text-gray-900'
  const iconColor = isDark ? 'text-zinc-400' : 'gray'
  const btnPrimary = isDark ? 'bg-zinc-100 text-zinc-900' : 'bg-black text-white'
  const btnHover = isDark ? 'hover:bg-zinc-200' : 'hover:bg-gray-800'
  const linkColor = isDark ? 'text-zinc-300' : 'underline text-gray-700'

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData.username, formData.password)
  }

  return (
    <>
      <div className={`flex items-center justify-center h-svh ${pageBg}`}>
        <div className={`flex flex-col items-center w-80 border ${borderColor} rounded-lg p-4 gap-3 sm:w-100 md:w-120 md:p-8 ${cardBg}`}>
          <span className={`${isDark ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200'} p-4 rounded-md md:my-2`}><RiLoginBoxLine size={40} className={isDark ? 'text-zinc-300' : 'text-gray-600'} /></span>
          <form onSubmit={handleSubmit} className='flex flex-col items-center text-center w-full'>
            <h2 className={`font-bold text-2xl md:text-4xl ${textPrimary}`}>Sign in with email</h2>
            <p className={`text-sm ${textSecondary} w-65 md:text-base md:mt-2`}>Enter you email and password to use our all services</p>
            <div className='mt-3 w-full flex flex-col gap-2 md:gap-3 md:mt-5'>
              <div className={`flex items-center gap-2 border ${borderColor} rounded-md p-2 w-full ${inputBg}`}>
                <RiMailFill size={20} className={iconColor} />
                <input onChange={handleChange} required name='username' value={formData.username} className={`w-full text-sm focus:outline-none md:text-base ${inputBg} ${inputText}`} type="email" placeholder='useremail@example.com' />
              </div>
              <div className={`flex items-center gap-2 border ${borderColor} rounded-md p-2 w-full ${inputBg}`}>
                <RiDoorLockBoxFill size={20} className={iconColor} />
                <input onChange={handleChange} required name='password' value={formData.password} className={`w-full text-sm focus:outline-none md:text-base ${inputBg} ${inputText}`} type={passwordVisible?'text':"password"} placeholder='**************' />
                <span onClick={() => setPasswordVisible(!passwordVisible)} className={`${formData.password == ''? 'hidden':'block'} cursor-pointer ${iconColor}`} > {passwordVisible? <RiEyeLine size={20} />:<RiEyeCloseLine size={20} />}</span>
              </div>
            </div>
            <a className={`text-xs w-full text-start mt-2 ml-4 cursor-pointer hover:underline md:text-sm md:mt-3 ${textSecondary}`} >Forgot Password</a>
            <button className={`${btnPrimary} ${btnHover} p-2 text-center w-full rounded-md text-sm mt-2 cursor-pointer md:text-base md:mt-3`}>Sign in</button>
            <span className={`text-xs mt-4 mb-2 md:text-sm md:mt-5 ${textSecondary}`}>Don't have an account <Link to="/register" className={linkColor}>Sgin up</Link></span>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginPage