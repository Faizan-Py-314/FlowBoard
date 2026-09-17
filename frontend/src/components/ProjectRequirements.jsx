import { useState, useEffect, useContext } from 'react'
import { ProjectContext } from '../contexts/ProjectContext'
import { useTheme } from '../contexts/ThemeContext'
import { RiAddLine, RiDeleteBin6Line, RiArticleLine } from '@remixicon/react'

const ProjectRequirements = ({ isOpen = true, setIsOpen }) => {
  const [isMounted, setIsMounted] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(false)
  const [addNewReq, setAddNewReq] = useState(false)
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false)
  const [newData, setNewData] = useState({requirements: ''})
  const { isDark } = useTheme()

  const { project, updateProject  } = useContext(ProjectContext)

  // Theme classes
  const modalBg = isDark ? 'bg-[#262628]' : 'bg-white'
  const borderColor = isDark ? 'border-zinc-700' : 'border-gray-300'
  const textPrimary = isDark ? 'text-zinc-100' : 'text-gray-900'
  const textSecondary = isDark ? 'text-zinc-400' : 'text-gray-600'
  const dividerColor = isDark ? 'text-zinc-700' : 'text-gray-300'
  const inputBg = isDark ? 'bg-[#262628]' : 'bg-white'
  const inputText = isDark ? 'text-zinc-100' : 'text-gray-900'
  const btnPrimary = isDark ? 'bg-[#464648] text-zinc-200' : 'bg-black text-white'
  const btnHover = isDark ? 'hover:bg-zinc-700' : 'hover:bg-gray-800'
  const deleteIconColor = isDark ? 'text-red-400' : 'text-red-400'
  const iconColor = isDark ? 'text-zinc-400' : 'text-gray-600'
  const linkBg = isDark ? 'hover:bg-zinc-700' : 'hover:bg-gray-100'

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
    const timer2 = setTimeout(() => setIsOpen(false), 30)
    return () => clearTimeout(timer2)
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  const handleTransitionEnd = () => {
    if (!isVisible) setIsMounted(false)
  }

  const handleChange = (e) => {
      setNewData({...newData, [e.target.name]: e.target.value})
    }

  const handleUpdate = () => {
    const currentRequirements = project.requirements || [];
    const updatedRequirements = [...currentRequirements, newData.requirements];
    updateProject(project.id, { requirements: updatedRequirements });
    setNewData({requirements: ''})
  }

  const DeleteRequirement = (indexToDelete) => {
    if (!project.requirements) return;
    const updatedRequirements = project.requirements.filter(
        (_, index) => index !== indexToDelete
    );
    updateProject(project.id, { requirements: updatedRequirements })
  };

  const requirementsDetails = {
    python: ['python.png', 'https://www.python.org/'],
    javascript: ['javascript.png', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
    fastapi: ['fastapi.png', 'https://fastapi.tiangolo.com/'],
    react: ['react.png', 'https://react.dev/'],
    tailwind: ['tailwind.png', 'https://tailwindcss.com/'],
    remixicons: ['remixicon.png', 'https://remixicon.com/'],
    no_image: ['no_image.png', '/'],
  }

  if (!isMounted) return null;


  return (
    <div onClick={handleBackdropClick} className={`fixed inset-0 h-svh flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div onTransitionEnd={handleTransitionEnd} className={`mx-auto relative h-112 ${modalBg} p-4 rounded-md flex flex-col gap-2 text-sm w-82 border ${borderColor} md:text-base md:w-120 md:p-6 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} >
        <div className='flex items-center justify-between mx-2'>
          <h2 className={`text-xl font-bold ${textPrimary}`}>{isDescriptionOpen?'Description':'Requirements'}</h2>
          <RiArticleLine onClick={() => setIsDescriptionOpen(!isDescriptionOpen)} className={`cursor-pointer ${iconColor}`} title='Description' />
        </div>
        <hr className={`mb-1 mx-1 ${dividerColor}`} />
        <div className='grid grid-cols-1 grid-rows-1 flex-1 relative h-full overflow-hidden'>
          <div className={`col-start-1 row-start-1 flex flex-col justify-between h-full w-full transition-all duration-300 ease-in-out ${
            isDescriptionOpen ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'
            }`}>
            <div className='flex flex-col gap-2 h-[50svh] pb-2 mb-10 overflow-auto no_scrollbar'>
              {(project?.requirements || []).map((requirement, index) => {
                const lowerCaseRequirement = requirement.toLowerCase()
                const keys = Object.keys(requirementsDetails)
              return <div key={`${requirement}-${index}`} className={`group py-2 px-3 flex items-center justify-between w-full border ${borderColor} rounded-md ${linkBg}`}>
                <a href={`${keys.includes(lowerCaseRequirement)? requirementsDetails[lowerCaseRequirement][1]: `https://google.com/search?q=${lowerCaseRequirement}`}`} target="_blank" className='flex items-center gap-2 cursor-pointer'>
                <img className='w-5' src={`requirements/${keys.includes(lowerCaseRequirement)? requirementsDetails[lowerCaseRequirement][0]:requirementsDetails['no_image'][0]}`} alt="Python png" />
                <span className={textPrimary}>{requirement}</span>
              </a>
              <RiDeleteBin6Line onClick={() => DeleteRequirement(index)} className={`cursor-pointer lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${deleteIconColor} w-4 h-5 md:w-5 md:h-6`} />
              </div>
              })}
            </div>
            <div className='absolute bottom-0 grid grid-cols-1 grid-rows-1 w-full'>
              <button onClick={() => setAddNewReq(true)} className={`${addNewReq ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100 pointer-events-auto'} col-start-1 row-start-1 cursor-pointer ${btnPrimary} ${btnHover} p-2 w-full rounded-md transition-all duration-300 ease-in-out`}>Add New Requirement</button>
              <div className={`col-start-1 row-start-1 flex w-full p-2 border ${borderColor} rounded-md items-center md:px-2.5 transition-all duration-300 ease-in-out ${inputBg} ${addNewReq ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
                <input onChange={handleChange} value={newData.requirements} className={`w-full text-xs focus:outline-none md:text-sm ${inputBg} ${inputText}`} type="text" name="requirements" placeholder='New Requirement' />
                <button onClick={() => {setAddNewReq(false); handleUpdate()}} className={`cursor-pointer ${btnPrimary} ${btnHover} p-1 rounded-sm`}><RiAddLine className={`w-3 h-3 md:w-4 md:h-4 ${isDark ? 'text-zinc-900' : 'text-white'}`} /></button>
              </div>
            </div>
          </div>
          <div className={`col-start-1 row-start-1 h-full w-full border ${borderColor} rounded-md overflow-auto no_scrollbar px-3 py-2 transition-all duration-300 ease-in-out ${inputBg} ${
        isDescriptionOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
      }`}>
              <p className={textSecondary}>{project?.description}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProjectRequirements