import React, { useEffect, useState, useContext } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const Settings = ({ isOpen = true, setIsOpen }) => {
    const { theme, setTheme, isDark } = useTheme()
    const [isMounted, setIsMounted] = useState(isOpen)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true)
            const timer = setTimeout(() => setIsVisible(true), 10)
            return () => clearTimeout(timer)
        } else {
            setIsVisible(false)
        }
    }, [isOpen])

    const handleClose = () => {
        setIsVisible(false)
        const timer2 = setTimeout(() => setIsOpen(false), 30)
        return () => clearTimeout(timer2)
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose()
        }
    }

    const handleTransitionEnd = () => {
        if (!isVisible) setIsMounted(false)
    }

    // Theme classes
    const modalBg = isDark ? 'bg-zinc-800' : 'bg-white'
    const textPrimary = isDark ? 'text-zinc-100' : 'text-gray-900'
    const textSecondary = isDark ? 'text-zinc-300' : 'text-gray-700'
    const borderColor = isDark ? 'border-zinc-600' : 'border-gray-300'
    const btnLightActive = theme === 'light' ? 'ring-2 ring-offset-2 ring-gray-400' : ''
    const btnDarkActive = theme === 'dark' ? 'ring-2 ring-offset-2 ring-zinc-500' : ''

    if (!isMounted) return null;

  return (
     <div onClick={handleBackdropClick} className={`fixed inset-0 h-full flex items-center justify-between z-30 transition-opacity duration-150 ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div onTransitionEnd={handleTransitionEnd} className={`mx-auto relative ${modalBg} p-2 rounded-md flex flex-col gap-2 text-sm w-75 border ${borderColor} md:text-base md:w-100 md:p-3 md:gap-3 transition-all duration-150 ease-out origin-center ${isVisible ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`} >
            <h2 className={`text-xl font-bold ${textPrimary}`}>Settings</h2>
            <div>
                <span className={textSecondary}>Theme</span>
                <div className='flex gap-2 items-center mt-2'>
                    <button
                        onClick={() => setTheme('light')}
                        className={`p-2 text-sm md:text-base cursor-pointer border ${borderColor} rounded-md w-full transition-all ${btnLightActive} ${isDark ? 'text-zinc-300 hover:bg-zinc-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        Light
                    </button>
                    <button
                        onClick={() => setTheme('dark')}
                        className={`p-2 text-sm md:text-base cursor-pointer border ${borderColor} rounded-md w-full transition-all ${btnDarkActive} ${isDark ? 'text-zinc-300 hover:bg-zinc-700' : 'text-gray-700 hover:bg-gray-100'}`}
                    >
                        Dark
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings