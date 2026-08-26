import React from 'react'

const ProgressBar = ({ completedTasks = 0, totalTasks = 0, totalSegments = 15 }) => {

    const greenDivsCount = Math.round((completedTasks / totalTasks) * totalSegments);

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
                  ? 'bg-green-400 scale-y-100 opacity-100'
                  : 'bg-gray-300 scale-y-75 opacity-50'
              }`}
            />
          );
        })}
      </div>
      <span className="text-sm font-medium text-gray-600">
        {completedTasks} of {totalTasks}
      </span>
    </div>
  )
}

export default ProgressBar