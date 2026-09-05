import { useState } from 'react'
import { RiSettings3Line, RiListCheck2 } from '@remixicon/react'
import CircularProgressBar from './CircularProgressBar'

const Features = ({ isOpen = true }) => {
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(true)

  return (
    <div
      className={`fixed inset-0 h-svh flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`mx-auto bg-white p-4 rounded-md flex flex-col gap-2 text-sm w-82 border md:text-base md:w-120 md:p-4 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
        <div className='flex items-end justify-between'>
          <h2 className='text-2xl font-bold'>Features</h2>
          <button className='py-2 px-3 text-sm cursor-pointer rounded-md bg-black text-white'>Add Feature</button>
        </div>
        <hr />
        <div>
          <div className='border border-gray-300 p-2 rounded-md'>
            <div>
              <span className='font-bold'>Create Dropdown component in frontend</span>
            </div>
            <span className='text-sm'>Total Task: 8, Completed: 4</span>
            <div className='mt-1 flex items-end justify-between'>
              <div className=' flex gap-2'>
                <span className='flex items-center text-sm gap-1 border py-1  px-2 border-gray-300 rounded-sm w-fit cursor-pointer'><RiSettings3Line className='w-4 h-4 -ml-1' /> Settings</span>
                <span className='py-1 px-2 rounded-sm border border-gray-300 cursor-pointer'><RiListCheck2 className='w-5 h-5'/></span>
              </div>
              <div className='mr-1'>
                <CircularProgressBar TotalTasks={8} testCompleted={3} size={20} strokeWidth={3}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Features