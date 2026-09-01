import React, { useContext, useEffect, useState } from 'react'
import Search from '../components/Search'
import ProjectCard from '../components/ProjectCard'
import { fetchProjectsData } from '../api'
import { AuthContext } from '../contexts/AuthContext'
import { RiAddLine } from '@remixicon/react'
import AddProject from '../components/AddProject'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const { token } = useContext(AuthContext)

  useEffect(() => {
    const projectData = async () => {
      try {
        const data = await fetchProjectsData(token)
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }
    if (token) {projectData()}
  }, [token]);
  
  
  return (
    <>
      <div className='w-full relative'>
        <AddProject isOpen={isOpen} setIsOpen={setIsOpen} projects={projects} setProjects={setProjects} />
        <div className='w-full relative px-5'>
          <Search/>
          <button onClick={() => setIsOpen(true)} className='absolute right-6 bottom-0 bg-black py-2 px-3 md:py-2.5 md:px-4 lg:py-3 2xl:right-10  rounded-md cursor-pointer'><RiAddLine className='w-4 h-4 text-white md:w-4.5 md:h-4.5 lg:hidden' /><span className='hidden lg:block text-white text-sm'>New Project</span></button>
        </div>
        <div className='p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-8xl mx-auto'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectsPage