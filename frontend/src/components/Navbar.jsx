import React, { useState } from 'react'
import { RiSwap3Fill, RiCloseFill, RiHome9Fill, RiTodoLine, RiTrelloLine, RiCalendarTodoLine, RiSettings5Line } from "@remixicon/react";


const Navbar = ({navActive, setNavActive}) => {
    const [activeOption, setActiveOption] = useState('Home')

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

          <span onClick={() => setActiveOption('Home')} className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Home'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <RiHome9Fill size={20}/>
            <li><a href="#">Dashboard</a></li>
          </span>

          <span onClick={() => setActiveOption('Tasks')} className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Tasks'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <span className='flex gap-3 items-center'>
              <RiTodoLine size={20}/>
              <li><a href="#">Today Tasks</a></li>
            </span>
            <span className='text-sm mr-2'>4</span>
          </span>

          <span onClick={() => setActiveOption('Projects')} className={`flex justify-between items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Projects'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <span className='flex gap-3 items-center'>
              <RiTrelloLine size={20}/>
              <li><a href="#">All Projects</a></li>
            </span>
            <span className='text-sm mr-2'>9</span>
          </span>

          <span onClick={() => setActiveOption('Schedule')} className={`flex gap-3 items-center px-3 py-2 rounded-md cursor-pointer xl:py-3 ${activeOption == 'Schedule'? 'active':''} hover:bg-[#F3F3F3] lg:px-2 xl:px-3`}>
            <RiCalendarTodoLine size={20}/>
            <li><a href="#">Study Schedule</a></li>
          </span>

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