import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser, getUserInfo } from '../api'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                const user = await getUserInfo(token)
                setUser(user)
            }
            getUser();
        }
    }, [token])

    const login = async (username, password) => {
        const response = await loginUser({username, password});
        if (response?.access_token) {
            setToken(response.access_token)
            localStorage.setItem('token', response.access_token)
            const userProfile = await getUserInfo(response.access_token)
            setUser(userProfile)
            navigate('/')
        }
    }

    const register = async (name, username, email, password) => {
        const response = await registerUser({name, username, email, password})
        navigate('/login')
    }

    const logout = () => {
        setToken(null)
        setUser(null)
        localStorage.removeItem('token')
    }

  return (
    <AuthContext.Provider value={{token, user, login, register, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export {AuthProvider, AuthContext}
