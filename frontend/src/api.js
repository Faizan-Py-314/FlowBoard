import axios from 'axios'

const BASE_URL = "http://192.168.100.31:8000";
// const BASE_URL = 'http://0.0.0.0:8000'

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

export {loginUser, registerUser, getUserInfo, fetchProjectsData, createProject, fetchProject}