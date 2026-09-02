import { useState, useEffect, useContext } from 'react'
import { RiAddLine } from '@remixicon/react'
import { ProjectContext } from '../contexts/ProjectContext'

const ProjectRequirements = ({ isOpen = true, setIsOpen }) => {
  const [isMounted, setIsMounted] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(false)
  const [addNewReq, setAddNewReq] = useState(false)

  const { project } = useContext(ProjectContext)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      const timer = setTimeout(() => setIsVisible(true), 10)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsVisible(false)
    setIsOpen(false)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleTransitionEnd = () => {
    if (!isVisible) setIsMounted(false)
  }

  if (!isMounted) return null;


  return (
    <div onClick={handleBackdropClick} className={`fixed inset-0 h-svh flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div onTransitionEnd={handleTransitionEnd} className={`mx-auto relative h-110 bg-white p-4 rounded-md flex flex-col gap-2 text-sm w-82 border md:text-base md:w-120 md:p-6 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} >
        <h2 className='text-xl font-bold'>Requirements for this Project</h2>
        <hr className='mb-1 mx-1 text-gray-300' />
        <div className='flex flex-col gap-2 h-[48svh] pb-2 mb-10 overflow-auto no_scrollbar'>
          {project.requirements.map((requirement, index) => {
          return <div key={index} className='p-2 w-full flex items-center border border-gray-300 rounded-md gap-2'>
            <img className='w-5' src="requirements/python.png" alt="Python png" />
            <span>{requirement}</span>
          </div>
          })}
        </div>
        <div className='absolute bottom-3 w-[90%]'>
          <button onClick={() => setAddNewReq(true)} className={`${addNewReq ? 'hidden' : 'block'} cursor-pointer bg-black text-white p-2 w-full rounded-md`}>Add New Requirment</button>
          <div className={`w-full p-2 border border-gray-300 rounded-md items-center md:px-2.5 ${addNewReq ? 'flex' : 'hidden'}`}>
            <input className='w-full text-xs focus:outline-none md:text-sm' type="text" name="requirment" placeholder='New Requirement' />
            <button onClick={() => setAddNewReq(false)} className='cursor-pointer bg-black text-white p-1 rounded-sm'><RiAddLine className='w-3 h-3 md:w-4 md:h-4' /></button>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProjectRequirements