import { useState, useRef, useEffect, useContext } from 'react'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import { ProjectContext } from '../contexts/ProjectContext'

const AddProject = ({ isOpen = true, setIsOpen}) => {
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(false)
    const [requirements, setRequirements] = useState(['', ''])
    const [levelTag, setLevelTag] = useState('Beginner')
    const [levelCount, setLevelCount] = useState(0)
    const [formData, setFormData] = useState({name: '', description: '', tags: ''})

    const containerRef = useRef(null);
    const { addProject } = useContext(ProjectContext)

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

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        };
    }, [requirements])
    
    const levels = ['Beginner', 'Intermediate', 'Advanced']

    useEffect(() => {
      setLevelTag(levels[levelCount])
    }, [levelCount])

    const handleChangeRequirements = (e, index) => {
      const newValue = e.target.value
      const newRequirements = [...requirements]
      newRequirements[index] = newValue
      setRequirements(newRequirements)
    }

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      addProject(formData.name, formData.description, requirements, formData.tags, levelTag)
      handleClose()
    }

    if (!isMounted) return null;

  return (
    <div 
      onClick={handleBackdropClick} className={`fixed inset-0 h-svh flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <form onSubmit={handleSubmit} onTransitionEnd={handleTransitionEnd} className={`mx-auto bg-white p-4 rounded-md flex flex-col gap-2 text-sm w-82 border md:text-base md:w-120 md:p-6 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
      <h2 className='text-2xl font-bold ml-2'>Add New Project</h2>
        <div className='flex justify-between items-center  border border-gray-300 rounded-md'>
          <button type='button' onClick={() => setLevelCount(levelCount>=1?levelCount-1:levelCount)} className='border-r border-gray-300 cursor-pointer hover:bg-gray-100 p-2'><RiArrowLeftSLine className='w-4 h-4 md:w-5.5 md:h-5.5' /></button>
          <input className='w-fit text-center caret-transparent focus:outline-none' type='text' value={levelTag} readOnly />
          <button type='button' onClick={() => setLevelCount(levelCount<2?levelCount+1:levelCount)} className='border-l border-gray-300 cursor-pointer hover:bg-gray-100 p-2'><RiArrowRightSLine className='w-4 h-4 md:w-5.5 md:h-5.5' /></button>
        </div>
        <input onChange={handleChange} className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' type="text" name='name' value={formData.name} placeholder='Project Name' />
        <textarea onChange={handleChange} className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' rows='4' type="text" name='description' value={formData.description} placeholder='Project Description'></textarea>

        <div className='p-3 border border-gray-400 rounded-md flex flex-col gap-1 pb-2 md:gap-2'>
          <span className='ml-2 font-bold text-sm md:-mb-1'>Requirements for project</span>
          <div ref={containerRef} className='flex flex-col gap-2 h-21.5 overflow-auto no_scrollbar md:h-23'>
            {requirements.map((requirement, index) => {
                return <input onChange={(e) => {handleChangeRequirements(e, index)}} key={index} value={requirement} className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' type="text" placeholder={`Requirement ${index+1}`} />
            })}
          </div>
        <button type='button' onClick={() => {setRequirements([...requirements, ''])}} className='w-full p-2 bg-black text-white rounded-md my-1 cursor-pointer'>Add Requirement</button>

        </div>
        <input onChange={handleChange} className=' focus:outline-none border border-gray-300 py-2 px-3 w-full rounded-md' type="text" name='tags' value={formData.tags} placeholder='Tag1, Tag2, Tag3...' />
        <button type='submit' className='w-full p-2 bg-black text-white rounded-md cursor-pointer'>Create Project</button>
      </form>
    </div>
  )
}

export default AddProject