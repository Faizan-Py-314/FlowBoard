import React from 'react'
import { RiSearchLine } from "@remixicon/react";
import Dropdown from './Dropdown'


const Search = () => {

    const levelOptions = [
    { label: "Beginner", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
    { label: "Intermediate", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
    { label: "Advanced", action: (item, isChecked) => console.log(`${item.label} is now ${isChecked}`) },
  ];

  return (
    <div className='flex'>
        <div className='flex items-center gap-2 border border-gray-300 rounded-md px-2 py-1 text-sm'>
            <RiSearchLine className='w-5.5 h-5.5 text-gray-500' />
            <input className='[&::-webkit-search-cancel-button]:appearance-none focus:outline-none w-full' type="search" placeholder='Search' />
        </div>
        <div>
            <Dropdown title="Level" items={levelOptions} />
        </div>
    </div>
  )
}

export default Search