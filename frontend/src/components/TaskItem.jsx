import { useState } from 'react'
import { RiFileTextLine, RiListCheck, RiAddLine } from '@remixicon/react'


const TaskItem = () => {
    const [isSubTasksOpen, setIsSubTasksOpen] = useState(false)
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)

    return (
        <div className='border border-gray-300 py-1.5 px-2 rounded-sm md:p-2'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1.5 text-xs md:text-sm md:gap-2'>
                    <input className='w-3 md:w-4 cursor-pointer' type="checkbox" />
                    <span>This is Title</span>
                </div>
                <div className='flex items-center gap-1 md:gap-2'>
                    <RiFileTextLine onClick={() => { setIsDescriptionOpen(!isDescriptionOpen); setIsSubTasksOpen(false) }} className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                    <RiListCheck onClick={() => { setIsSubTasksOpen(!isSubTasksOpen); setIsDescriptionOpen(false) }} className='cursor-pointer w-3 h-3 md:w-4 md:h-4' />
                </div>
            </div>

            <div className={`grid transition-all duration-300 ease-in-out ${isSubTasksOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}>
                <div className="overflow-hidden" >
                    <hr className='my-1.5 mx-1 text-gray-300 md:my-2' />
                    <div className='flex justify-between mx-2 md:mb-1'>
                        <h3 className='font-bold text-sm'>SubTasks</h3>
                        <RiAddLine className='w-4 h-4 cursor-pointer md:w-5 md:h-5' />
                    </div>
                    <div className='flex flex-col gap-2 md:mt-1'>
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
            <div className={`border border-gray-300 rounded-sm text-xs md:text-sm grid transition-all duration-300 ease-in-out ${isDescriptionOpen ? 'grid-rows-[1fr] opacity-100 mt-2 p-2 md:mt-3' : 'grid-rows-[0fr] opacity-0'
                }`}>
                <div className='overflow-hidden'>
                    <p>Lorem ipsum dolor </p>
                </div>
            </div>

        </div>
    )
}

export default TaskItem