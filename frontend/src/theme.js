/**
 * Theme Configuration
 *
 * To change colors, simply modify the values below.
 * All components will automatically use these colors.
 */

export const themes = {
    light: {
        // Background colors
        bgPrimary: 'bg-white',
        bgSecondary: 'bg-gray-50',
        bgTertiary: 'bg-gray-100',

        // Text colors
        textPrimary: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-500',
        textMuted: 'text-gray-400',

        // Border colors
        borderDefault: 'border-gray-200',
        borderMedium: 'border-gray-300',
        borderDark: 'border-gray-400',

        // Button colors
        btnPrimary: 'bg-black',
        btnPrimaryHover: 'hover:bg-gray-800',
        btnSecondary: 'bg-gray-200',
        btnSecondaryHover: 'hover:bg-gray-300',

        // Accent colors
        accentBlue: 'bg-blue-500',
        accentBlueText: 'text-blue-500',
        accentBlueBg: 'bg-blue-100',

        // Status colors
        successText: 'text-emerald-500',
        successBg: 'bg-emerald-100',
        warningText: 'text-amber-500',
        warningBg: 'bg-amber-100',
        errorText: 'text-red-500',
        errorBg: 'bg-red-100',

        // Hover states
        hoverBg: 'hover:bg-gray-100',
        hoverBgLight: 'hover:bg-gray-50',

        // Active state
        activeBg: 'bg-gray-100',

        // Icon colors
        iconDefault: 'text-gray-600',
        iconMuted: 'text-gray-400',

        // Scrollbar
        scrollbarThumb: '#cbd5e1',
        scrollbarTrack: '#f1f5f9',

        // Special elements
        modalBg: 'bg-white',
        cardBg: 'bg-white',
        inputBg: 'bg-white',
        inputBorder: 'border-gray-300',
        inputFocus: 'focus:ring-gray-300',

        // Navbar specific
        navbarBg: 'bg-white',

        // Divider
        divider: 'text-gray-200',
        dividerBorder: 'border-gray-200',
    },

    dark: {
        // Background colors
        bgPrimary: 'bg-zinc-900',
        bgSecondary: 'bg-zinc-800',
        bgTertiary: 'bg-zinc-700',

        // Text colors
        textPrimary: 'text-zinc-100',
        textSecondary: 'text-zinc-300',
        textTertiary: 'text-zinc-400',
        textMuted: 'text-zinc-500',

        // Border colors
        borderDefault: 'border-zinc-600',
        borderMedium: 'border-zinc-500',
        borderDark: 'border-zinc-400',

        // Button colors
        btnPrimary: 'bg-zinc-100',
        btnPrimaryHover: 'hover:bg-zinc-200',
        btnSecondary: 'bg-zinc-700',
        btnSecondaryHover: 'hover:bg-zinc-600',

        // Accent colors
        accentBlue: 'bg-blue-600',
        accentBlueText: 'text-blue-400',
        accentBlueBg: 'bg-blue-900/30',

        // Status colors
        successText: 'text-emerald-400',
        successBg: 'bg-emerald-900/30',
        warningText: 'text-amber-400',
        warningBg: 'bg-amber-900/30',
        errorText: 'text-red-400',
        errorBg: 'bg-red-900/30',

        // Hover states
        hoverBg: 'hover:bg-zinc-700',
        hoverBgLight: 'hover:bg-zinc-800',

        // Active state
        activeBg: 'bg-zinc-700',

        // Icon colors
        iconDefault: 'text-zinc-400',
        iconMuted: 'text-zinc-500',

        // Scrollbar
        scrollbarThumb: '#52525b',
        scrollbarTrack: '#27272a',

        // Special elements
        modalBg: 'bg-zinc-800',
        cardBg: 'bg-zinc-800',
        inputBg: 'bg-zinc-700',
        inputBorder: 'border-zinc-600',
        inputFocus: 'focus:ring-zinc-500',

        // Navbar specific
        navbarBg: 'bg-zinc-800',

        // Divider
        divider: 'text-zinc-600',
        dividerBorder: 'border-zinc-600',
    }
}

// Function to get theme class based on current theme
export const getThemeClass = (theme, colorKey) => {
    return themes[theme]?.[colorKey] || themes.light[colorKey]
}

// All keys for easy iteration
export const themeKeys = Object.keys(themes.light)