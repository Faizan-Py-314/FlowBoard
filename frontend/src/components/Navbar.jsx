import React, { useState, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiSwap3Fill, RiCloseFill, RiHome9Fill, RiTodoLine, RiTrelloLine, RiCalendarTodoLine, RiSettings5Line } from "@remixicon/react";
import { useTheme } from '../contexts/ThemeContext';


const Navbar = ({navActive, setNavActive, settingsIsOpen, setSettingsIsOpen}) => {
    const [activeOption, setActiveOption] = useState('Home')
    const { isDark } = useTheme()

    const location = useLocation();
    const currentPath = location.pathname;

    // Theme classes
    const bgColor = isDark ? 'bg-[#151517]' : 'bg-white'
    const textColor = isDark ? 'text-zinc-400' : 'text-gray-900'
    const textMuted = isDark ? 'text-zinc-400' : 'text-gray-600'
    const hoverBg = isDark ? 'hover:bg-[#272729]' : 'hover:bg-gray-100'
    const activeBg = isDark ? 'text-white bg-[#272729]' : 'bg-gray-100'
    const dividerColor = isDark ? 'text-zinc-600' : 'text-gray-300'
    const borderColor = isDark ? 'border-r border-zinc-700' : 'border-r border-gray-200'
    const iconColor = isDark ? 'text-zinc-400' : 'text-gray-600'

  return (
    <>
      <div className={`p-4 w-screen h-svh ${borderColor} ${navActive? 'block':'hidden'} fixed inset-0 z-50 lg:w-1/4 lg:px-3 lg:relative lg:block 2xl:w-1/5 ${bgColor}`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <RiSwap3Fill size={40} className={iconColor} />
            <h2 className={`font-bold text-2xl ${textColor}`}>Flow Board</h2>
          </div>
          <span onClick={() => setNavActive(false)} className='lg:hidden cursor-pointer'><RiCloseFill size={30} className={iconColor}/></span>
        </div>
          <hr className={`my-5 ${dividerColor}`}/>
        <ul className='px-2 flex flex-col gap-1 lg:p-0 xl:gap-2 2xl:px-2'>

          <Link onClick={() => setNavActive(false)} to='/' className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${currentPath == '/'? activeBg:''} ${hoverBg} lg:px-2 xl:px-3`}>
            <RiHome9Fill size={20} className={iconColor}/>
            <li className={textColor}>Dashboard</li>
          </Link>

          <Link onClick={() => setNavActive(false)} to='/tasks' className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${currentPath == '/tasks'? activeBg:''} ${hoverBg} lg:px-2 xl:px-3`}>
            <span className='flex gap-3 items-center'>
              <RiTodoLine size={20} className={iconColor}/>
              <li className={textColor}>Today Tasks</li>
            </span>
            <span className={`text-sm mr-2 ${textMuted}`}>4</span>
          </Link>

          <Link onClick={() => setNavActive(false)} to='/projects' className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${currentPath == '/projects'? activeBg:''} ${hoverBg} lg:px-2 xl:px-3`}>
            <span className='flex gap-3 items-center'>
              <RiTrelloLine size={20} className={iconColor}/>
              <li className={textColor}>All Projects</li>
            </span>
            <span className={`text-sm mr-2 ${textMuted}`}>9</span>
          </Link>

          <Link onClick={() => setActiveOption('Schedule')} to='#' className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Schedule'? activeBg:''} ${hoverBg} lg:px-2 xl:px-3`}>
            <RiCalendarTodoLine size={20} className={iconColor}/>
            <li className={textColor}>Study Schedule</li>
          </Link>

          <span onClick={() => setSettingsIsOpen(!settingsIsOpen)} className={`flex gap-3 items-center p-3 rounded-md cursor-pointer xl:py-3 ${activeBg} ${hoverBg} absolute bottom-11 w-[86%] lg:px-2 xl:px-3`}>
            <RiSettings5Line size={20} className={iconColor}/>
            <li className={textColor}><a href="#">Settings</a></li>
          </span>

        </ul>
      </div>

    </>
  )
}

export default Navbar