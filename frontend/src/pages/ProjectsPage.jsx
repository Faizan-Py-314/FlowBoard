import { useContext, useState } from 'react'
import Search from '../components/Search'
import ProjectCard from '../components/ProjectCard'
import { ProjectContext } from '../contexts/ProjectContext'
import { RiAddLine } from '@remixicon/react'
import AddProject from '../components/AddProject'
import ProjectRequirements from '../components/ProjectRequirements'
import Features from '../components/Features'

const ProjectsPage = () => {
  const [addProjectisOpen, setAddProjectisOpen] = useState(false)
  const [requirmentIsOpen, setRequirmentIsOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)

  const { projects } = useContext(ProjectContext)

  if (!projects) return null;
  
  return (
    <>
      <div className='w-full relative'>
        {addProjectisOpen && <AddProject isOpen={addProjectisOpen} setIsOpen={setAddProjectisOpen} isEditMode={isEditMode} setIsEditMode={setIsEditMode} />}
        {requirmentIsOpen && <ProjectRequirements isOpen={requirmentIsOpen} setIsOpen={setRequirmentIsOpen} />}
        <Features/>
        <div className='w-full relative px-5'>
          <Search/>
          <button onClick={() => {setAddProjectisOpen(true)}} className='absolute right-6 bottom-0 bg-black py-2 px-3 md:py-2.5 md:px-4 lg:py-3 2xl:right-10  rounded-md cursor-pointer'><RiAddLine className='w-4 h-4 text-white md:w-4.5 md:h-4.5 lg:hidden' /><span className='hidden lg:block text-white text-sm'>New Project</span></button>
        </div>
        <div className='p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-8xl mx-auto'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} setRequirmentIsOpen={setRequirmentIsOpen} setAddProjectisOpen={setAddProjectisOpen} setIsEditMode={setIsEditMode} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage