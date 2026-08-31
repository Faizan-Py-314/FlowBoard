import React, { useState, useRef, useEffect } from 'react'

const AddProject = () => {
    const [requirements, setRequirements] = useState(['', ''])

    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        };
    }, [requirements])

  return (
    <div className='absolute w-full h-[80svh] flex items-center z-30 justify-between'>
      <div className='mx-auto bg-white p-4 rounded-md flex flex-col gap-2 text-sm w-82 border md:text-base md:w-120 md:p-6 md:gap-3'>
      <h2 className='text-2xl font-bold ml-2'>Add New Project</h2>
        <input className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' type="text" placeholder='Project Name' />
        <textarea className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' rows='4' type="text" placeholder='Project Description'></textarea>

        <div className='p-3 border border-gray-400 rounded-md flex flex-col gap-1 pb-2 md:gap-2'>
          <span className='ml-2 font-bold text-sm md:-mb-1'>Requirements for project</span>
          <div ref={containerRef} className='flex flex-col gap-2 h-21.5 overflow-auto no_scrollbar md:h-23'>
            {requirements.map((requirement, index) => {
                return <input key={index} className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' type="text" placeholder={`Requirement ${index+1}`} />
            })}
          </div>
        <button onClick={() => {setRequirements([...requirements, ''])}} className='w-full p-2 bg-black text-white rounded-md my-1 cursor-pointer'>Add Requirement</button>

        </div>
        <input className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' type="text" placeholder='Tag1, Tag2, Tag3...' />
        <button className='w-full p-2 bg-black text-white rounded-md cursor-pointer'>Create Project</button>
      </div>
    </div>
  )
}

export default AddProject