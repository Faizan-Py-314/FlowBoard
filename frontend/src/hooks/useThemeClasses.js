import { useTheme } from '../contexts/ThemeContext'

/**
 * Dark Mode Component Helper
 * Use this hook in any component to easily apply theme classes
 *
 * Example usage:
 * const tc = useThemeClasses()
 * <div className={tc.cardBg + ' ' + tc.borderMedium}>
 */

export const useThemeClasses = () => {
    const { isDark } = useTheme()

    return {
        // Backgrounds
        bgPrimary: isDark ? 'bg-zinc-900' : 'bg-white',
        bgSecondary: isDark ? 'bg-zinc-800' : 'bg-gray-50',
        bgTertiary: isDark ? 'bg-zinc-700' : 'bg-gray-100',

        // Text
        textPrimary: isDark ? 'text-zinc-100' : 'text-gray-900',
        textSecondary: isDark ? 'text-zinc-300' : 'text-gray-700',
        textTertiary: isDark ? 'text-zinc-400' : 'text-gray-500',
        textMuted: isDark ? 'text-zinc-500' : 'text-gray-400',

        // Borders
        borderDefault: isDark ? 'border-zinc-600' : 'border-gray-200',
        borderMedium: isDark ? 'border-zinc-500' : 'border-gray-300',
        borderDark: isDark ? 'border-zinc-400' : 'border-gray-400',

        // Buttons
        btnPrimary: isDark ? 'bg-zinc-100 text-zinc-900' : 'bg-black text-white',
        btnSecondary: isDark ? 'bg-zinc-700 text-zinc-100' : 'bg-gray-200 text-gray-900',
        btnHover: isDark ? 'hover:bg-zinc-600' : 'hover:bg-gray-100',

        // States
        hoverBg: isDark ? 'hover:bg-zinc-700' : 'hover:bg-gray-100',
        activeBg: isDark ? 'bg-zinc-700' : 'bg-gray-100',

        // Cards & Modals
        cardBg: isDark ? 'bg-zinc-800' : 'bg-white',
        modalBg: isDark ? 'bg-zinc-800' : 'bg-white',
        inputBg: isDark ? 'bg-zinc-700' : 'bg-white',
        inputBorder: isDark ? 'border-zinc-600' : 'border-gray-300',

        // Icons
        iconDefault: isDark ? 'text-zinc-400' : 'text-gray-600',

        // Dividers
        divider: isDark ? 'text-zinc-600' : 'text-gray-200',
    }
}