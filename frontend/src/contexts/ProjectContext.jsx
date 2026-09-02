import { createContext, useContext, useEffect, useState } from 'react'
import { fetchProjectsData, createProject } from '../api'
import { AuthContext } from './AuthContext'

const ProjectContext = createContext({})

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([])

    const { token } = useContext(AuthContext)

    useEffect(() => {
        const projectData = async () => {
            try{
                if (token){
                    const data = await fetchProjectsData(token)
                    setProjects(data)
                }
            } catch (error) {
                console.error("Fetch Projects Error", error);
                throw error
            }
        }
        projectData()
    }, [token])


    const addProject = async (name, description, requirements, tags, levelTag) => {
        const tagsList = []
        if (tags.length != 0) {
            for (const item of tags.split(', ')) {tagsList.push(item)}
        }
        tagsList.unshift(levelTag, 'Future')
        if (token) {
            const newProject = await createProject(name, description, requirements, tagsList, token);
            setProjects([...projects, newProject])
      }
    }


  return (
    <ProjectContext.Provider value={{projects, addProject}}>
        {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider, ProjectContext}