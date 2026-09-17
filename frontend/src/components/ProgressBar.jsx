import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ProgressBar = ({ completedTasks = 0, totalTasks = 0, totalSegments = 15 }) => {
    const { isDark } = useTheme()

    const greenDivsCount = Math.round((completedTasks / totalTasks) * totalSegments);

    // Theme classes
    const filledColor = isDark ? 'bg-green-500' : 'bg-green-400'
    const emptyColor = isDark ? 'bg-zinc-700' : 'bg-gray-300'
    const textColor = isDark ? 'text-zinc-400' : 'text-gray-600'

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1 items-center">
        {Array.from({ length: totalSegments }).map((_, index) => {
          const isFilled = index < greenDivsCount;
          return (
            <div
              key={index}
              style={{ transitionDelay: `${index * 30}ms` }}
              className={`w-0.5 h-4 rounded-sm transition-all duration-300 ease-out ${
                isFilled
                  ? `${filledColor} scale-y-100 opacity-100`
                  : `${emptyColor} scale-y-75 opacity-50`
              }`}
            />
          );
        })}
      </div>
      <span className={`text-sm font-medium ${textColor}`}>
        {completedTasks} of {totalTasks}
      </span>
    </div>
  )
}

export default ProgressBar