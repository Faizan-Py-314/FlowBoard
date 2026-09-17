import React from 'react'
import { RiIndeterminateCircleFill, RiReactjsFill, RiFlagLine, RiCornerDownRightLine } from "@remixicon/react";
import ProgressBar from './ProgressBar';
import { useTheme } from '../contexts/ThemeContext'


const TaskCard = () => {
  const { isDark } = useTheme()

  // Theme classes
  const cardBg = isDark ? 'bg-zinc-800' : 'bg-white'
  const borderColor = isDark ? 'border-zinc-600' : 'border-gray-300'
  const titleColor = isDark ? 'text-zinc-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-600'
  const dividerColor = isDark ? 'text-zinc-600' : 'text-gray-300'

  return (
    <div className={`card w-full p-4 border ${borderColor} ${cardBg} rounded-md cursor-pointer`}>
        <div className='flex items-center gap-2 text-xs'>
            <span className={`py-1 px-2 ${isDark ? 'bg-zinc-700 text-zinc-300' : 'bg-gray-200 text-gray-900'} rounded-sm`}>To do</span>
            <span className={`py-1 px-2 rounded-sm flex gap-1 items-center ${isDark ? 'text-red-400 bg-red-900/30' : 'text-red-500 bg-red-100'}`}><RiFlagLine size={13}/> High</span>
            <span className={`py-1 px-2 rounded-sm flex gap-1 items-center ${isDark ? 'text-cyan-400 bg-cyan-900/30' : 'text-cyan-500 bg-cyan-100'}`}><RiReactjsFill size={13} /> React</span>
        </div>
        <div className='mt-2'>
            <h2 className={`font-bold text-2xl ${titleColor}`}>Create Task Webpage</h2>
            <span className={`${textSecondary} text-sm flex`}><RiCornerDownRightLine size={20} /> Responsive Webpage with react for pr...</span>
        </div>
        <hr className={`my-2 ${dividerColor}`}/>
        <div className='flex justify-between items-center mt-3 w-[97%] mx-auto'>
            <ProgressBar completedTasks={3} totalTasks={5}/>
            <RiIndeterminateCircleFill className={isDark ? 'text-red-400' : 'text-red-400'} />
        </div>
    </div>
  )
}

export default TaskCard