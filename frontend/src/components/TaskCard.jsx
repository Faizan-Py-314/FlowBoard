import React from 'react'
import { RiIndeterminateCircleFill, RiReactjsFill, RiFlagLine, RiCornerDownRightLine } from "@remixicon/react";


const TaskCard = () => {
  return (
    <div className='card w-full p-4 border border-gray-300 rounded-md'>
        <div className='flex items-center gap-2 text-xs'>
            <span className='py-1 px-2 bg-gray-200 rounded-sm'>To do</span>
            <span className='py-1 px-2 rounded-sm flex gap-1 items-center text-red-500 bg-red-100'><RiFlagLine size={13}/> High</span>
            <span className='py-1 px-2  rounded-sm flex gap-1 items-center text-cyan-500 bg-cyan-100'><RiReactjsFill size={13} /> React</span>
        </div>
        <div className='mt-2'>
            <h2 className='font-bold text-2xl'>Create Task Webpage</h2>
            <span className='text-gray-600 text-sm flex'><RiCornerDownRightLine size={20} /> Responsive Webpage with react for pr...</span>
        </div>
        <hr className='my-2'/>
        <div className='flex justify-between items-center mt-3 w-[97%] mx-auto'>
            <div className='flex items-center gap-2'>
                <div className='flex gap-1 items-center'>
                    <div className='w-0.5 h-4 rounded-sm bg-green-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-green-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-green-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-green-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-green-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-green-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                    <div className='w-0.5 h-4 rounded-sm bg-gray-400'></div>
                </div>
                <span className='text-sm text-gray-600'>3 of 5</span>
            </div>
            <RiIndeterminateCircleFill className='text-red-400' />
        </div>
        </div>
  )
}

export default TaskCard