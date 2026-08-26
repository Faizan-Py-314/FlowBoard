import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RiSwap3Fill, RiCloseFill, RiHome9Fill, RiTodoLine, RiTrelloLine, RiCalendarTodoLine, RiSettings5Line } from "@remixicon/react";


const Navbar = ({navActive, setNavActive}) => {
    const [activeOption, setActiveOption] = useState('Home')

    const location = useLocation();
    const currentPath = location.pathname;
    

  return (
    <>
      <div className={`p-4 w-screen h-svh brs ${navActive? 'block':'hidden'} fixed inset-0 z-50 lg:w-1/4 lg:px-3 lg:relative lg:block 2xl:w-1/5 bg-white`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <RiSwap3Fill size={40} />
            <h2 className='font-bold text-2xl'>Flow Board</h2>
          </div>
          <span onClick={() => setNavActive(false)} className='lg:hidden'><RiCloseFill size={30}/></span>
        </div>
          <hr className='my-5 text-gray-300'/>
        <ul className='px-2 flex flex-col gap-1 lg:p-0 xl:gap-2 2xl:px-2'>

          <Link onClick={() => setNavActive(false)} to='/' className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${currentPath == '/'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <RiHome9Fill size={20}/>
            <li>Dashboard</li>
          </Link>

          <Link onClick={() => setNavActive(false)} to='/tasks' className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${currentPath == '/tasks'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <span className='flex gap-3 items-center'>
              <RiTodoLine size={20}/>
              <li>Today Tasks</li>
            </span>
            <span className='text-sm mr-2'>4</span>
          </Link>

          <Link onClick={() => setNavActive(false)} to='/projects' className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${currentPath == '/projects'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <span className='flex gap-3 items-center'>
              <RiTrelloLine size={20}/>
              <li>All Projects</li>
            </span>
            <span className='text-sm mr-2'>9</span>
          </Link>

          <Link onClick={() => setActiveOption('Schedule')} to='#' className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Schedule'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <RiCalendarTodoLine size={20}/>
            <li>Study Schedule</li>
          </Link>

          <span onClick={() => setActiveOption('Schedule')} className={`flex gap-3 items-center p-3 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Schedule'? 'active':''} hover:bg-[#F3F3F3] absolute bottom-11 bg-[#F3F3F3] w-[86%] lg:px-2 xl:px-3`}>
            <RiSettings5Line size={20}/>
            <li><a href="#">Settings</a></li>
          </span>
          
        </ul>
      </div>
      
    </>
  )
}

export default Navbar