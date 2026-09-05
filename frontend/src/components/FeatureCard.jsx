import { useState } from 'react'
import { RiSettings3Line, RiListCheck2, RiListCheck3, RiFileTextLine, RiListCheck } from '@remixicon/react'
import CircularProgressBar from './CircularProgressBar'

const FeatureCard = () => {
    const [isTasksOpen, setIsTasksOpen] = useState(false)
    const [isSubTasksOpen, setIsSubTasksOpen] = useState(false)

    return (
        <div>
            <div className='border border-gray-300 p-2 rounded-md md:p-2.5'>
                <div className='flex items-center justify-between'>
                    <span className='font-bold'>Create Dropdown</span>
                    <div className='flex items-center gap-2 mr-1 -md:mt-1'>
                        <RiFileTextLine className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                        <RiListCheck3 onClick={() => {setIsTasksOpen(!isTasksOpen); setIsSubTasksOpen(false)}} className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                    </div>
                </div>
                <span className='text-xs md:text-sm'>Total Task: 8, Completed: 4</span>
                <div className='mt-1 flex items-end justify-between'>
                    <div className=' flex gap-2'>
                        <span className='flex items-center text-xs md:text-sm gap-1 border py-1  px-2 border-gray-300 rounded-sm w-fit cursor-pointer'><RiSettings3Line className='w-3 h-3 -ml-1 md:w-4 md:h-4' /> Settings</span>
                        <span className='py-1 px-2 rounded-sm border border-gray-300 cursor-pointer'><RiListCheck2 className='w-4 h-4 md:w-5 md:h-5' /></span>
                    </div>
                    <div className='mr-1'>
                        <CircularProgressBar TotalTasks={8} testCompleted={3} size={20} strokeWidth={3} />
                    </div>
                </div>

                <div className={`${isTasksOpen?'block':'hidden'} my-2 md:mt-3`}>
                    <hr className='text-gray-300 my-2 mx-2' />
                    <h3 className='font-bold'>Tasks</h3>
                    <div>
                        <div className='border border-gray-300 py-1.5 px-2 rounded-sm md:p-2'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-1.5 text-xs md:text-sm md:gap-2'>
                                    <input className='w-3 md:w-4 cursor-pointer' type="checkbox" />
                                    <span>This is Title</span>
                                </div>
                                <div className='flex items-center gap-1 md:gap-2'>
                                    <RiFileTextLine className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                                    <RiListCheck onClick={() => setIsSubTasksOpen(!isSubTasksOpen)} className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                                </div>
                            </div>

                            <div className={`${isSubTasksOpen?'block':'hidden'}`}>
                                <hr className='my-2 mx-2 text-gray-300' />
                                <h3 className='font-bold text-sm'>SubTasks</h3>
                                <div className='flex flex-col gap-2 my-1'>
                                    <div className='border border-gray-300 rounded-sm py-1 px-2 flex items-center gap-1.5 text-xs md:text-sm md:gap-2'>
                                        <input className='w-3 md:w-4 cursor-pointer' type="checkbox" />
                                        <span>This is Title</span>
                                    </div>
                                    <div className='border border-gray-300 rounded-sm py-1 px-2 flex items-center gap-1.5 text-xs md:text-sm md:gap-2'>
                                        <input className='w-3 md:w-4 cursor-pointer' type="checkbox" />
                                        <span>This is Title</span>
                                    </div>
                                    <div className='border border-gray-300 rounded-sm py-1 px-2 flex items-center gap-1.5 text-xs md:text-sm md:gap-2'>
                                        <input className='w-3 md:w-4 cursor-pointer' type="checkbox" />
                                        <span>This is Title</span>
                                    </div>
                                    <div className='border border-gray-300 rounded-sm py-1 px-2 flex items-center gap-1.5 text-xs md:text-sm md:gap-2'>
                                        <input className='w-3 md:w-4 cursor-pointer' type="checkbox" />
                                        <span>This is Title</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeatureCard