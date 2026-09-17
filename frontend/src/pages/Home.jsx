import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Home = () => {
  const { isDark } = useTheme()

  const pageBg = isDark ? 'bg-[#1b1b1d]' : 'bg-white'
  const textColor = isDark ? 'text-zinc-100' : 'text-gray-900'

  return (
    <div className={`min-h-screen ${pageBg} ${textColor} p-6`}>
      <h1 className='text-2xl font-bold'>Home</h1>
    </div>
  )
}

export default Home