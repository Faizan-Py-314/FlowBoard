import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { RiMenuLine, RiArrowRightSLine, RiArrowDropDownLine } from "@remixicon/react";


const Topbar = ({setNavActive}) => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)

  const profileName = () => {
    if (user) {
      const fist_letters = []
      const name = user.name.split(' ')
      
      for (const letters in name){
        fist_letters.push(name[letters][0])

      }
      const result = fist_letters.join('')
      return result
    } else { return 'NO' }
  }

  return (
    <>
      <div className='w-full h-13 p-4 flex justify-between items-center bbs lg:h-17 lg:px-6 xl:px-10'>
        <div className='searchBar'>
          <span onClick={() => setNavActive(true)} className='lg:hidden'><RiMenuLine /></span>
          <span className='hidden lg:flex'>Flow Board <RiArrowRightSLine /> <strong>Overview</strong> </span>
        </div>

        <div className={`${user? 'hidden':'flex'} items-center gap-2 text-xs lg:text-sm lg:gap-4`}>
          <button onClick={() => navigate('/login')} className='border border-gray-200 py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-300 lg:py-2 lg:px-3 lg:rounded-md'>Sgin in</button>
          <button onClick={() => navigate('/register')} className='bg-gray-200 py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-300 lg:py-2 lg:px-3 lg:rounded-md'>Sgin up</button>
        </div>

        <div className={`${user? 'flex':'hidden'} gap-3 items-center`}>
          <div className='py-1.5 px-3.5 font-bold rounded-sm bg-gray-200 md:py-2 md:px-4'>{profileName()}</div>
          <div className='hidden flex-col md:flex'>
            <span className='text-sm'>{user? user.email: 'mail not found'}</span>
            <span className='text-sm -mt-1'>{user? user.username: 'username not found'}</span>
          </div>
          <RiArrowDropDownLine className='cursor-pointer hidden md:block' />
        </div>
      </div>
    </>
  )
}

export default Topbar