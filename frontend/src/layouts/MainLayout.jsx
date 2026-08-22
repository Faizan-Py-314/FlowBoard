import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'

const MainLayout = () => {
    const [navActive, setNavActive] = useState(false)

  return (
    <div className='flex'>
        <Navbar navActive={navActive} setNavActive={setNavActive} />
        <div className='w-full'>
            <Topbar setNavActive={setNavActive} />
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout