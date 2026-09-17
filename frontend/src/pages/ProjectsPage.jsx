import { useContext, useState } from 'react'
import Search from '../components/Search'
import ProjectCard from '../components/ProjectCard'
import { ProjectContext } from '../contexts/ProjectContext'
import { useTheme } from '../contexts/ThemeContext'
import { RiAddLine } from '@remixicon/react'
import AddProject from '../components/AddProject'
import ProjectRequirements from '../components/ProjectRequirements'
import Features from '../components/Features'

const ProjectsPage = () => {
  const [addProjectisOpen, setAddProjectisOpen] = useState(false)
  const [requirmentIsOpen, setRequirmentIsOpen] = useState(false)
  const [FeatureIsOpen, setFeatureIsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const { projects } = useContext(ProjectContext)
  const { isDark } = useTheme()

  if (!projects) return null;

  // Theme classes
  const btnPrimary = isDark ? 'bg-[#2c2d2f]' : 'bg-black'
  const pageBg = isDark ? 'bg-[#1b1b1d]' : 'bg-white'
  const textOnBtn = isDark ? 'text-zinc-200' : 'text-white'

  return (
    <>
      <div className={` ${pageBg} w-full relative`}>
        {addProjectisOpen && <AddProject isOpen={addProjectisOpen} setIsOpen={setAddProjectisOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />}
        {requirmentIsOpen && <ProjectRequirements isOpen={requirmentIsOpen} setIsOpen={setRequirmentIsOpen} />}
        {FeatureIsOpen && <Features isOpen={FeatureIsOpen} setIsOpen={setFeatureIsOpen}/>}
        <div className='w-full relative px-5'>
          <Search/>
          <button onClick={() => {setAddProjectisOpen(true)}} className={`absolute right-6 bottom-0 ${btnPrimary} py-2 px-3 md:py-2.5 md:px-4 lg:py-3 2xl:right-10 rounded-md cursor-pointer`}>
            <RiAddLine className={`w-4 h-4 ${textOnBtn} md:w-4.5 md:h-4.5 lg:hidden`} />
            <span className={`hidden lg:block ${textOnBtn} text-sm`}>New Project</span>
          </button>
        </div>
        <div className='p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-8xl mx-auto'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} setRequirmentIsOpen={setRequirmentIsOpen} setAddProjectisOpen={setAddProjectisOpen} setIsEditMode={setIsEditMode} setFeatureIsOpen={setFeatureIsOpen} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage