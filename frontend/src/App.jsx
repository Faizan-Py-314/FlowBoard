import React, { useState }  from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Search from './components/Search'
import TaskPage from './pages/TaskPage'
import ProjectsPage from './pages/ProjectsPage'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path='/' element={<Home/>} />
            <Route path='/tasks' element={<TaskPage />} />
            <Route path='/projects' element={<ProjectsPage />} />
          </Route>

          <Route path='/login' element={ <LoginPage/> }/>
          <Route path='/register' element={ <RegisterPage/> }/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
