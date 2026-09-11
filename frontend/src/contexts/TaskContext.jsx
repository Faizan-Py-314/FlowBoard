import React, { createContext, useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { createTask, fetchTask, fetchAllTasks, updateTask } from '../api'

const TaskContext = createContext({})

const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])
    const [task, setTask] = useState({})

    const { token } = useContext(AuthContext)

    const addTask = async (task_data, project_id, feature_id) => {
        if (!token) {throw new Error('Not authenticated')}
        try {
            const newTask = await createTask(token, task_data, project_id, feature_id)
            setTasks(prevTasks => [...prevTasks, newTask])
            return newTask
        } catch (error) {
            console.error('Failed to add Task', error);
            throw error
        }
    }

    const getTasks = async (project_id, feature_id) => {
        try {
            const tasksResponse = await fetchAllTasks(token, project_id, feature_id)
            setTasks(tasksResponse)
            return tasksResponse
        } catch (error) {
            console.error('Failed to get all tasks', error);
            throw error
        }
    }

    const getTask = async (project_id, feature_id, task_id) => {
        try {
            const taskResponse = await fetchTask(token, project_id, feature_id, task_id)
            setTask(taskResponse)
            return taskResponse
        } catch (error) {
            console.error('Failed to get single task', error);
            throw error
        }
    }

    const editTask = async (task_updated_data, project_id, feature_id, task_id) => {
        try {
            const newTaskData = await updateTask(token, task_updated_data, project_id, feature_id, task_id)
            setTasks(prevTasks => prevTasks.map(task => (task.id == task_id ? newTaskData:task)))
            return newTaskData
        } catch (error) {
            console.error('Failed to update Task', error);
            throw error
        }
    }


  return (
    <TaskContext.project_id value={{addTask, getTasks, editTask, tasks, task}}>
        { children }
    </TaskContext.project_id>
  )
}

export {TaskContext, TaskProvider}