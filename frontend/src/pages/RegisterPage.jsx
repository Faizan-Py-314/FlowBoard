import React, { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { RiUserAddFill, RiMailFill, RiDoorLockBoxFill, RiEyeLine, RiEyeCloseLine, RiUser6Fill } from "@remixicon/react";
import { Link, useNavigate } from 'react-router-dom'


const RegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' })
  const [inputError, setInputError] = useState('NOError')

  const navigate = useNavigate()
  const { register } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formData.name.length < 3) { setInputError('NameLengthError'); return }
    else if (formData.username.length < 5) { setInputError('UsernameLengthError'); return }
    else if (formData.email.length < 1) { setInputError('MailEmptyError'); return }
    else if (formData.password.length < 8) { setInputError('PasswordError'); return }

    // console.log(formData.name, formData.username, formData.email, formData.password)
    register(formData.name, formData.username, formData.email, formData.password)
  }

  return (
    <>
      <div className='flex items-center justify-center h-svh'>
        <div className='flex flex-col items-center w-80 border rounded-lg p-4 gap-3 sm:w-100 md:w-120 md:p-8'>
          <span className='bg-gray-200 p-4 rounded-md md:my-2'><RiUserAddFill /></span>
          <form onSubmit={handleSubmit} className='flex flex-col items-center text-center w-full'>
            <h2 className='font-bold text-2xl md:text-4xl'>Sign up with email</h2>
            <p className='text-sm text-gray-400 w-65 md:text-base md:mt-2'>Enter you email and password to use our all services</p>
            <div className='mt-3 w-full flex flex-col gap-2 md:gap-3 md:mt-5'>
              <div>
                <p className={`${inputError == 'NameLengthError' ? 'block' : 'hidden'} w-full text-start text-red-300 md:-mt-2 ml-2 text-xs md:text-sm`}>Name must be at least 3 characters long</p>
                <div className={`flex items-center gap-2 border ${inputError == 'NameLengthError' ? 'border-red-300' : 'border-gray-300'} rounded-md p-2 w-full`}>
                  <RiUser6Fill color='gray' size={20} />
                  <input onChange={handleChange} name='name' value={formData.name} className='w-full text-sm focus:outline-none md:text-base' type="text" placeholder='Full Name' />
                </div>
              </div>
              <div>
                <p className={`${inputError == 'UsernameLengthError' ? 'block' : 'hidden'} w-full text-start text-red-300 md:-mt-2 ml-2 text-xs md:text-sm`}>Username must be at least 5 characters long</p>
                <div className={`flex items-center gap-2 border ${inputError == 'UsernameLengthError' ? 'border-red-300' : 'border-gray-300'} rounded-md p-2 w-full`}>
                  <RiUser6Fill color='gray' size={20} />
                  <input onChange={handleChange} name='username' value={formData.username} className='w-full text-sm focus:outline-none md:text-base' type="text" placeholder='Username@123' />
                </div>
              </div>
              <div>
                <p className={`${inputError == 'MailEmptyError' ? 'block' : 'hidden'} w-full text-start text-red-300 md:-mt-2 ml-2 text-xs md:text-sm`}>Email must not be Empty</p>
                <div className={`flex items-center gap-2 border ${inputError == 'MailEmptyError' ? 'border-red-300' : 'border-gray-300'} rounded-md p-2 w-full`}>
                  <RiMailFill color='gray' size={20} />
                  <input onChange={handleChange} name='email' value={formData.email} className='w-full text-sm focus:outline-none md:text-base' type="email" placeholder='useremail@example.com' />
                </div>
              </div>
              <div>
                <p className={`${inputError == 'PasswordError' ? 'block' : 'hidden'} w-full text-start text-red-300 md:-mt-2 ml-2 text-xs md:text-sm`}>Password must be at least 8 characters long</p>
                <div className={`flex items-center gap-2 border ${inputError == 'PasswordError' ? 'border-red-300' : 'border-gray-300'} rounded-md p-2 w-full`}>
                  <RiDoorLockBoxFill color='gray' size={20} />
                  <input onChange={handleChange} name='password' value={formData.password} className='w-full text-sm focus:outline-none md:text-base' type={passwordVisible ? 'text' : "password"} placeholder='**************' />
                  <span onClick={() => setPasswordVisible(!passwordVisible)} className={`${formData.password == '' ? 'hidden' : 'block'} cursor-pointer`} > {passwordVisible ? <RiEyeLine size={20} color='gray' /> : <RiEyeCloseLine size={20} color='gray' />}</span>
                </div>
              </div>

            </div>
            <button className='bg-black text-white p-2 text-center w-full rounded-md text-sm mt-2 cursor-pointer md:text-base md:mt-3'>Sign up</button>
            <span className='text-xs mt-4 mb-2 md:text-sm md:mt-5'>Already have account <Link className='underline' to="/login">Sgin in</Link></span>
          </form>
        </div>
      </div>
    </>
  )
}

export default RegisterPage