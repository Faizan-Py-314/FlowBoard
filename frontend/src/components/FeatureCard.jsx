import { useState } from 'react'
import { RiSettings3Line, RiListCheck2, RiListCheck3, RiFileTextLine, RiAddCircleFill, RiIndeterminateCircleFill } from '@remixicon/react'
import CircularProgressBar from './CircularProgressBar'
import TaskItem from './TaskItem'
import AddTask from './AddTask'

const FeatureCard = () => {
    const [isTasksOpen, setIsTasksOpen] = useState(false)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
    const [isAddTaskOpen, setIsAddTaskOpen] = useState(false)

    return (
        <div>
            <div className='border border-gray-300 p-2 rounded-md md:p-2.5'>
                <div className='flex items-center justify-between'>
                    <span className='font-bold'>Create Dropdown</span>
                    <div className='flex items-center gap-2 mr-1 -md:mt-1'>
                        <RiFileTextLine onClick={() => {setIsDescriptionOpen(!isDescriptionOpen); setIsTasksOpen(false)}} className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                        <RiListCheck3 onClick={() => { setIsTasksOpen(!isTasksOpen); setIsSubTasksOpen(false); setIsDescriptionOpen(false) }} className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
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

                <div className={`grid transition-all duration-300 ease-in-out ${isTasksOpen ? 'grid-rows-[1fr] opacity-100 mt-2 md:mt-3' : 'grid-rows-[0fr] opacity-0 my-0'
                    }`}>
                    <div className='overflow-hidden'>
                        <hr className='text-gray-300 mb-2 mx-2' />
                        <div className='flex justify-between mx-2 md:mb-1'>
                            <h3 className='font-bold'>Tasks</h3>
                            {!isAddTaskOpen ?<RiAddCircleFill onClick={() => setIsAddTaskOpen(true)} className='w-4 h-4 cursor-pointer md:w-5 md:h-5' />
                            :<RiIndeterminateCircleFill onClick={() => setIsAddTaskOpen(false)} className='w-4 h-4 cursor-pointer md:w-5 md:h-5' />}
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isAddTaskOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                            <AddTask/>
                        </div>
                        <div className={`grid transition-all duration-300 ease-in-out ${isAddTaskOpen ? 'grid-rows-[0fr] opacity-0':'grid-rows-[1fr] opacity-100'}`}>
                            <div className='overflow-hidden flex flex-col gap-2'>
                                <TaskItem/>
                                <TaskItem/>
                                <TaskItem/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`border border-gray-300 rounded-sm text-xs md:text-sm grid transition-all duration-300 ease-in-out ${isDescriptionOpen ? 'grid-rows-[1fr] opacity-100 mt-2 p-2 md:mt-3' : 'grid-rows-[0fr] opacity-0'
                    }`}>
                    <div className='overflow-hidden'>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum ducimus quasi id doloremque. Magnam vitae voluptates molestiae, distinctio veritatis, voluptatum aliquam minus culpa excepturi nam beatae velit nihil amet eum.</p>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default FeatureCard