import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiMenuLine, RiArrowRightSLine } from "@remixicon/react";


const Topbar = ({setNavActive}) => {
  const navigate = useNavigate()

  return (
    <>
      <div className='w-full h-13 p-4 flex justify-between items-center bbs lg:h-17 lg:px-6 xl:px-10'>
        <div className='searchBar'>
          <span onClick={() => setNavActive(true)} className='lg:hidden'><RiMenuLine /></span>
          <span className='hidden lg:flex'>Flow Board <RiArrowRightSLine /> <strong>Overview</strong> </span>
        </div>

        <div className='flex items-center gap-2 text-xs lg:text-sm lg:gap-4'>
          <button onClick={() => navigate('login')} className='border border-gray-200 py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-300 lg:py-2 lg:px-3 lg:rounded-md'>Sgin in</button>
          <button onClick={() => navigate('login')} className='bg-gray-200 py-1 px-2 rounded-sm cursor-pointer hover:bg-gray-300 lg:py-2 lg:px-3 lg:rounded-md'>Sgin up</button>
        </div>
      </div>
    </>
  )
}

export default Topbar