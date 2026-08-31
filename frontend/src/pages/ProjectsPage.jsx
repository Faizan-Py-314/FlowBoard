import React, { useContext, useEffect, useState } from 'react'
import Search from '../components/Search'
import ProjectCard from '../components/ProjectCard'
import { fetchProjectsData } from '../api'
import { AuthContext } from '../contexts/AuthContext'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])

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
      <div className='w-full'>
        <Search/>
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