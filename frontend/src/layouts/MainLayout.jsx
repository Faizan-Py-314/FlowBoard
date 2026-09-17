import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import Navbar from '../components/Navbar'
import Topbar from '../components/Topbar'
import Settings from '../components/Settings'

const MainLayout = () => {
    const [navActive, setNavActive] = useState(false)
    const [settingsIsOpen, setSettingsIsOpen] = useState(false)
    const { isDark } = useTheme()

    const pageBg = isDark ? 'bg-[#1b1b1d]' : 'bg-white'

  return (
    <div className={`flex min-h-screen ${pageBg}`}>
      <Settings isOpen={settingsIsOpen} setIsOpen={setSettingsIsOpen}/>
        <Navbar navActive={navActive} setNavActive={setNavActive} settingsIsOpen={settingsIsOpen} setSettingsIsOpen={setSettingsIsOpen} />
        <div className='w-full'>
            <Topbar setNavActive={setNavActive} />
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout