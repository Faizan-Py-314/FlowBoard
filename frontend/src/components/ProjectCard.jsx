import React from 'react'
import { RiTimeLine } from "@remixicon/react";

const ProjectCard = () => {
  return (
    <div className='border border-gray-400 p-4 rounded-lg w-full'>
        <div className='flex gap-2 items-cente text-xs'>
            <span className='py-1 px-2 bg-purple-100 rounded-sm text-purple-500'>Future</span>
            <span className='py-1 px-2 bg-blue-100 rounded-sm text-blue-500'>Beginner</span>
        </div>

        <div className='flex flex-col gap-1 mt-2'>
            <h2 className='text-2xl font-bold'>Pollo</h2>
            <div className='-mt-1 text-gray-600'>
                <span className=''>Last Changes: 1 month ago</span>
                <br />
                <span>10 Features, </span><span>2 Referance Images</span>
                
            </div>
            <hr className='text-gray-200' />
            <span className='text-sm text-gray-600 cursor-pointer hover:underline w-fit'>Details and Requirements</span>
            <div className='flex gap-2 items-center mt-2'>
                <button className='py-2 px-3 bg-black text-white rounded-md text-sm cursor-pointer'>View Details</button>
                <button className='py-2 px-3 bg-black text-white rounded-md text-sm cursor-pointer'>Add Details</button>
            </div>
        </div>
    </div>
  )
}

export default ProjectCard