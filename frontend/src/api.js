import axios from 'axios'

// const BASE_URL = "http://192.168.100.31:8000";
const BASE_URL = 'http://0.0.0.0:8000'

const loginUser = async (credentials) => {
    try{
        const params = new URLSearchParams()
        for (const key in credentials) {
            params.append(key, credentials[key])
        }

        const response = await axios.post(`${BASE_URL}/api/users/token`,
            params,
            {
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }
        ); return response.data
    } catch (error) {
        console.error('Login error', error);
        throw error
    }
}

const registerUser = async (userData) => {
    try{
        const response = await axios.post(`${BASE_URL}/api/users`, userData)
    } catch (error) {
        console.error('Registeration error', error);
        throw error
    }
}

const getUserInfo = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/users/me`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        ); return response.data
    } catch {error} {
        console.error('Failed to fetch user Info', error);
        throw error
    }
}

const fetchProjectsData = async (token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/projects`, 
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('fetch Project data error', error);
        throw error
    }
}

const createProject = async (name, description, requirements, tags, token) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/projects`, 
            {name, description, requirements, tags},
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('Create Project error', error);
        throw error
    }
}

const fetchProject = async (id, token) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/projects/${id}`,
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error("Fetch Project error by id", error);
        throw error
    }
}

const updateProjectData = async (token, id, updatedData) => {
    try{
        const response = await axios.patch(`${BASE_URL}/api/projects/${id}`, updatedData, 
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('Failed Project update', error);
        throw error
    }
}

const createFeature = async (token, featureData, project_id) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/features/${project_id}`, 
            featureData,
            {headers : {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('Feature Creating error', error);
        throw error
    }
}

const fetchAllFeatures = async (token, project_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/features/${project_id}`, 
            { headers: {Authorization: `Bearer ${token}`} }
        ); return response.data;
    } catch (error) {
        console.error('Fetching features error', error);
        throw error
    }
}

const fetchFeature = async (token, project_id, feature_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/features/${project_id}/${feature_id}`, 
            {headers : {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('Fetching single feature error', error);
        throw error
    }
}

const updateFeature = async (token, data, project_id, feature_id) => {
    try {
        const respones = await axios.patch(`${BASE_URL}/api/feature/${project_id}/${feature_id}`, 
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        ); return respones.data
    } catch {
        console.error('Updating Feature Data error', error);
        throw error
    }
}

const createTask = async (token, data, project_id, feature_id) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/tasks/${project_id}/${feature_id}`,
            data, 
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('Creating Task Error', error);
        throw error
    }
}

const fetchTask = async (token, project_id, feature_id, task_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/tasks/${project_id}/${feature_id}/${task_id}`, 
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('geting single task error', error);
        throw error
    }
}

const fetchAllTasks = async (token, project_id, feature_id) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/tasks/${project_id}/${feature_id}`, 
            {headers: {Authorization: `Bearer ${token}`}}
        ); return response.data
    } catch (error) {
        console.error('Geting all tasks Error', error);
        throw error
    }
}

const updateTask = async (token, data, project_id, feature_id, task_id) => {
    try {
        const respones = await axios.patch(`${BASE_URL}/api/tasks/${project_id}/${feature_id}/${task_id}`, 
            data,
            {headers: {Authorization: `Bearer ${token}`}}
        ); return respones.data
    } catch (error) {
        console.error('Updating Task error', error);
        throw error
    }
}

export {loginUser, registerUser, getUserInfo, fetchProjectsData, createProject, fetchProject, updateProjectData, createFeature, fetchAllFeatures, fetchFeature, updateFeature, createTask, fetchTask, fetchAllTasks, updateTask}

