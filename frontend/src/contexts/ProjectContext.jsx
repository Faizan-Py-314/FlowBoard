import { createContext, useContext, useEffect, useState } from 'react'
import { fetchProjectsData, createProject, fetchProject, updateProjectData } from '../api'
import { AuthContext } from './AuthContext'

const ProjectContext = createContext({})

const ProjectProvider = ({ children }) => {
    const [projects, setProjects] = useState([])
    const [project, setProject] = useState({})

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

    const getProject = async (id) => {
        try{
            if (token) {
                const data = await fetchProject(id, token)
                setProject(data)
            }
        } catch (error) {console.error("Fetch projct error by id", error)}
    }

    const updateProject = async (id, updatedData) => {
        try{
            if (token) {
                const updatedProject = await updateProjectData(token, id, updatedData)
                setProjects(prevProjects => 
                    prevProjects.map(proj => (proj.id === id || proj._id === id ? updatedProject : proj))
                )
                setProject(updatedProject)
                return updatedProject
            }
        } catch (error) {console.error('Project Update Error', error)}
    }


  return (
    <ProjectContext.Provider value={{projects, addProject, getProject, project, updateProject}}>
        {children}
    </ProjectContext.Provider>
  )
}

export {ProjectProvider, ProjectContext}