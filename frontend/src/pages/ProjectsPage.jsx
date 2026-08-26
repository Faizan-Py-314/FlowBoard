import React from 'react'
import Search from '../components/Search'
import ProjectCard from '../components/ProjectCard'

const ProjectsPage = () => {
  return (
    <>
      <div className='w-full'>
        <Search/>
        <div className='p-5 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 max-w-8xl mx-auto'>
          <ProjectCard/>
          <ProjectCard/>
          <ProjectCard/>
        </div>
      </div>
    </>
  )
}

export default ProjectsPage