import { createContext, useContext, useState, useEffect } from 'react'
import { themes } from '../theme'

const ThemeContext = createContext({})

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        // Get theme from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light'
    })

    // Apply theme to document when theme changes
    useEffect(() => {
        localStorage.setItem('theme', theme)
        document.documentElement.setAttribute('data-theme', theme)

        // Update scrollbar colors
        const scrollbarThumb = theme === 'dark' ? '#52525b' : '#cbd5e1'
        const scrollbarTrack = theme === 'dark' ? '#27272a' : '#f1f5f9'

        // Create or update style element for scrollbar
        let styleEl = document.getElementById('theme-scrollbar-style')
        if (!styleEl) {
            styleEl = document.createElement('style')
            styleEl.id = 'theme-scrollbar-style'
            document.head.appendChild(styleEl)
        }

        styleEl.textContent = `
            ::-webkit-scrollbar {
                width: 8px;
                height: 8px;
            }
            ::-webkit-scrollbar-track {
                background: ${scrollbarTrack};
            }
            ::-webkit-scrollbar-thumb {
                background: ${scrollbarThumb};
                border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: ${theme === 'dark' ? '#6b7280' : '#94a3b8'};
            }
        `
    }, [theme])

    // Helper function to get theme class
    const getClass = (colorKey) => {
        return themes[theme]?.[colorKey] || themes.light[colorKey]
    }

    // Helper to get both light and dark classes (for conditional rendering)
    const getClasses = (lightClass, darkClass) => {
        return theme === 'dark' ? darkClass : lightClass
    }

    // Toggle theme
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }

    // Set specific theme
    const setThemeMode = (mode) => {
        if (mode === 'light' || mode === 'dark') {
            setTheme(mode)
        }
    }

    return (
        <ThemeContext.Provider value={{
            theme,
            setTheme: setThemeMode,
            toggleTheme,
            getClass,
            getClasses,
            isDark: theme === 'dark'
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Custom hook for easy theme access
const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export { ThemeContext, ThemeProvider, useTheme }