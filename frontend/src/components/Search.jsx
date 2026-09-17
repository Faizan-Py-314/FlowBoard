import { useTheme } from '../contexts/ThemeContext'
import { RiSearchLine } from "@remixicon/react";
import Dropdown from './Dropdown'


const Search = () => {
    const { isDark } = useTheme()

    const levelOptions = [
        { label: "Beginner", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
        { label: "Intermediate", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
        { label: "Advanced", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
    ];

    const statusOptions = [
        { label: "Future", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
        { label: "InProgress", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
        { label: "Completed", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
    ];

    // Theme classes
    const borderColor = isDark ? 'border-zinc-700' : 'border-gray-300'
    const iconColor = isDark ? 'text-zinc-300' : 'text-gray-500'
    const inputBg = isDark ? 'bg-[#2d2d2f]' : 'bg-white'
    const inputText = isDark ? 'text-zinc-100' : 'text-gray-900'

  return (
    <div className=' mt-3 md:flex md:items-center w-full md:w-[90%] md:mt-4 md:mr-0 md:gap-2'>
        <div className={`flex items-center gap-2 border ${borderColor} rounded-md px-2 py-2 text-sm w-full md:w-[60%] md:text-base ${inputBg}`}>
            <RiSearchLine className={`w-5.5 h-5.5 ${iconColor}`} />
            <input className={`[&::-webkit-search-cancel-button]:appearance-none focus:outline-none w-full ${inputBg} ${inputText}`} type="search" placeholder='Search' />
        </div>
        <div className='flex gap-2 mt-2 md:mt-0'>
            <Dropdown className='text-xs h-8 md:text-sm md:h-10 ' postion='left-0' title="Level" items={levelOptions} />
            <Dropdown className='text-xs h-8 md:text-sm md:h-10' title="Status" items={statusOptions} />
        </div>
    </div>
  )
}

export default Search