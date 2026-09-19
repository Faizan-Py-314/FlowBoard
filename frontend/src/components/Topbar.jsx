import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { RiMenuLine, RiArrowRightSLine, RiArrowDropDownLine } from "@remixicon/react";

const Topbar = ({setNavActive}) => {

  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const { isDark } = useTheme()

  const location = useLocation();
  const currentPath = location.pathname;

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

  // Theme classes
  const borderColor = isDark ? 'border-b border-zinc-700' : 'border-b border-gray-200'
  const textColor = isDark ? 'text-zinc-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-600'
  const btnBorder = isDark ? 'border-zinc-600' : 'border-gray-200'
  const btnBgSecondary = isDark ? 'bg-zinc-700' : 'bg-gray-200'
  const btnHover = isDark ? 'hover:bg-zinc-600' : 'hover:bg-gray-300'
  const profileBg = isDark ? 'bg-[#2c2d2f]' : 'bg-gray-200'
  const iconColor = isDark ? 'text-zinc-400' : 'text-gray-600'

  return (
    <>
      <div className={`w-full h-13 p-4 flex justify-between items-center ${borderColor} lg:h-17 lg:px-6 xl:px-10`}>
        <div className='searchBar'>
          <span onClick={() => setNavActive(true)} className={`lg:hidden cursor-pointer ${iconColor}`}><RiMenuLine /></span>
          <span className={`hidden lg:flex ${textColor}`}>Flow Board <RiArrowRightSLine className={iconColor}/> <strong>{currentPath == '/'? 'Overview':currentPath == '/tasks'? 'Tasks':'Projects'}</strong> </span>
        </div>

        <div className={`${user? 'hidden':'flex'} items-center gap-2 text-xs lg:text-sm lg:gap-4`}>
          <button onClick={() => navigate('/login')} className={`border ${btnBorder} py-1 px-2 rounded-sm cursor-pointer ${btnHover} lg:py-2 lg:px-3 lg:rounded-md ${textColor}`}>Sgin in</button>
          <button onClick={() => navigate('/register')} className={`${btnBgSecondary} py-1 px-2 rounded-sm cursor-pointer ${btnHover} lg:py-2 lg:px-3 lg:rounded-md ${textColor}`}>Sgin up</button>
        </div>

        <div className={`${user? 'flex':'hidden'} gap-3 items-center`}>
          <div className={`py-1.5 px-3.5 font-bold rounded-sm ${profileBg} ${textColor} md:py-2 md:px-4`}>{profileName()}</div>
          <div className='hidden flex-col md:flex'>
            <span className={`text-sm ${textSecondary}`}>{user? user.email: 'mail not found'}</span>
            <span className={`text-sm -mt-1 ${textSecondary}`}>{user? user.username: 'username not found'}</span>
          </div>
          <RiArrowDropDownLine className={`cursor-pointer hidden md:block ${iconColor}`} />
        </div>
      </div>
    </>
  )
}

export default Topbar