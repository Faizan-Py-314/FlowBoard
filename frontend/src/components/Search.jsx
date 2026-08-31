import React from 'react'
import { RiSearchLine } from "@remixicon/react";
import Dropdown from './Dropdown'


const Search = () => {

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

  return (
    <div className=' mt-3 md:flex md:items-center w-full md:w-[90%] md:mt-4 md:mr-0 md:gap-2'>
        <div className='flex items-center gap-2 border border-gray-300 rounded-md px-2 py-2 text-sm w-full md:w-[60%] md:text-base'>
            <RiSearchLine className='w-5.5 h-5.5 text-gray-500' />
            <input className='[&::-webkit-search-cancel-button]:appearance-none focus:outline-none w-full' type="search" placeholder='Search' />
        </div>
        <div className='flex gap-2 mt-2 md:mt-0'>
            <Dropdown className='text-xs h-8 md:text-sm md:h-10 ' postion='left-0' title="Level" items={levelOptions} />
            <Dropdown className='text-xs h-8 md:text-sm md:h-10' title="Status" items={statusOptions} />
        </div>
    </div>
  )
}

export default Search